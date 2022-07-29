import * as React from 'react'
import './RecipeAdd.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {useAuthNavContext} from "../../Contexts/authNav"
import apiClient from "../../Services/ApiClient"
import items from '../../Data/categoryItem.json'
import Overlay from '../Overlay/Overlay'


export default function RecipeAdd({imageUrl}) {
  const {error, setError, isLoading, setIsLoading, user} = useAuthNavContext()
  const navigate = useNavigate()
  const [form, setForm] = React.useState({
    name: '',
    category: 'Main course',
    description: '',
    instructions: [''],
    ingredients: [""],
    calories: '',
    image_url: '',

})

const handleOnInputChange = (event) => {

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
}
  const handleOnSubmit = async () => {
    setIsLoading(true)
    setError((e) => ({ ...e, form: null }))

    var errorUse
    const {data,error} = await apiClient.recipeCreate({
        name: form.name,
        user_id: user.id,
        category: form.category.toLowerCase(),
        description: form.description,
        instructions: form.instructions.join("."),
        ingredients: form.ingredients.join(","),
        calories: form.calories,
        image_url: form.image_url,
        
    })
    errorUse = error
    if (errorUse) setError((e) => ({ ...e, form: errorUse }))

    if(data){
        navigate(`/recipe/${data?.recipe?.id}`)
    }

    setIsLoading(false)
}

const handleIngrendientCount = (event) => {

    // if the add button is clicked add another row
    if(event.target.name === "add"){
        setForm((f) => ({ ...f, ingredients: [...form.ingredients, ""] }))
    }

    // if the subtract is clicked remove the last item
    if(event.target.name === "subtract"){
        // if the number of instructions is 1, do nothing
        if(form.ingredients.length === 1){
            return
        }
        //set the form
        setForm((f) => ({ ...f, ingredients: [...form.ingredients.slice(0,form.ingredients.length-1)] }))
    }
}

const handleInstructionCount = (event) => {

    // if the add button is clicked add another row
    if(event.target.name === "add"){
        setForm((f) => ({ ...f, instructions: [...form.instructions, ""] }))
    }

    // if the subtract is clicked remove the last item
    if(event.target.name === "subtract"){
         // if the number of instructions is 1, do nothing
         if(form.instructions.length === 1){
            return
        }
        //set the form
        setForm((f) => ({ ...f, instructions: [...form.instructions.slice(0,form.instructions.length-1)] }))
    }
}

// handles the ingredients list 
const handleIngredient = (event, index) => {

    // clone the ingredients array
    const ingredientClone = form.ingredients

    // chane the element based on its index
    ingredientClone[index] = event.target.value

    // set the form
    setForm((f) => ({...f, ingredients : ingredientClone}))
}

// handles the instruction list 
const handleInstruction = (event, index) => {

    // clone the ingredients array
    const instructionClone = form.instructions

    // chane the element based on its index
    instructionClone[index] = event.target.value

    // set the form
    setForm((f) => ({...f, instructions : instructionClone}))
}

// function for pressing enter while searching
const handleKeyDownInstruction = (event) => {
    if (event.key === 'Enter') {
        // add another instruction form
        setForm((f) => ({ ...f, instructions: [...form.instructions, ""] }))
    }
}
// function for pressing enter while searching
const handleKeyDownIngredients = (event) => {
    if (event.key === 'Enter') {
        // add another ingredients form
        setForm((f) => ({ ...f, ingredients: [...form.ingredients, ""] }))
    }
}

// remove ingredient from list
const removeIngredient = (index) => {
    // if the number of instructions is 1, do nothing
    if(form.ingredients.length === 1){
        setForm((f) => ({...f, ingredients : [""] }))
        return
    }

    // clone the ingredients array
    const ingredientClone = form.ingredients

    // remove the element based on its index
    ingredientClone.splice(index,1)

    // set the form
    setForm((f) => ({...f, ingredients : ingredientClone}))
}

// remove instructions from list
const removeInstruction = (index) => {
    // if the number of instructions is 1, do nothing
    if(form.instructions.length === 1){
        setForm((f) => ({...f, instructions : [""] }))
        return
    }

    // clone the ingredients array
    const instructionClone = form.instructions

    // remove the element based on its index
    instructionClone.splice(index,1)

    // set the form
    setForm((f) => ({...f, instructions : instructionClone}))
}

  return (
    <div className='recipe-container'> 
    {(error?.form) ? <span className="error">{error?.form}</span> : null}
    <div className='recipe-add'>
      <div className="form">
            <div className="input-field name">
                <label htmlFor="Name">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleOnInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="Category">Category</label>
                <select id="category" name="category" onChange={handleOnInputChange}>
                    <option name="category" disabled={true}>--Select your option--</option>
                  {items.map((item,idx) => {
                    return <option key={idx} name="category">{item.name}</option>
                  })}
                </select>
            </div>
            <div className="input-field">
                <label htmlFor="Calories">Calories</label>
                <input type="number" name="calories" value={form.calories} onChange={handleOnInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="Image_url">Image URL</label>
                <input type="url" name="image_url" value={form.image_url} onChange={handleOnInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="Ingredients">Ingredients (no commas (,))</label>
                <div className="ingredient-list">
                    {
                        form.ingredients.map((ingredient, idx) => {
                            return(
                                <div className='ingredient-cap' key={idx}>
                                    <input type="text" name="ingredients" value={ingredient} onChange={(event) => handleIngredient(event, idx)} onKeyDown={handleKeyDownIngredients}/>
                                    <button onClick={() => removeIngredient(idx)}>X</button>
                                </div>
                                )
                            }
                        )
                    }
                </div>
                <div className='ingredient-btn'>
                    <button name='add' onClick={handleIngrendientCount}>+</button>
                    <button name='subtract' onClick={handleIngrendientCount}>-</button>
                </div>
            </div>
            <div className="input-field">
                <label htmlFor="Description">Description </label>
                <textarea type="text" name="description" rows="4" value={form.description} onChange={handleOnInputChange}></textarea>
            </div>
            <div className="input-field">
                <label htmlFor="Instructions">Instructions  (no periods (.))</label>
                <div className="instruction-list">
                    {
                        form.instructions.map((instruction, idx) => {
                            return(
                                <div className='instruction-cap' key={idx}>
                                    <input type="text" name="instructions" rows="6" value={instruction}  onChange={(event) => handleInstruction(event, idx)} onKeyDown={handleKeyDownInstruction}/>
                                    <button onClick={() => {removeInstruction(idx)}}>X</button>
                                </div>
                            )
                            }
                        )
                    }
                </div>
                <div className='instruction-btn'>
                    <button name='add' onClick={handleInstructionCount}>+</button>
                    <button name='subtract' onClick={handleInstructionCount}>-</button>
                </div>
            </div>
            <div className="footer">
                <button className="footer-btn recipeadd" disabled={isLoading} onClick={handleOnSubmit}>
                    {isLoading ? "Loading..." : "Add Recipe"}
                </button>
            </div>
        </div>
    </div>
    <Overlay />
    </div>
  )
}