import * as React from 'react'
import './RecipeAdd.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {useAuthNavContext} from "../../Contexts/authNav"
import apiClient from "../../Services/ApiClient"
import items from '../../Data/categoryItem.json'

export default function RecipeAdd({imageUrl}) {
  const {error, setError, isLoading, setIsLoading, user} = useAuthNavContext()
  const navigate = useNavigate()
  const [form, setForm] = React.useState({
    name: '',
    category: 'Main course',
    description: '',
    instructions: '',
    ingredients: '',
    calories: 0,
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
        instructions: form.instructions,
        ingredients: form.ingredients,
        calories: form.calories,
        image_url: form.image_url,
        
    })
    errorUse = error
    if (errorUse) setError((e) => ({ ...e, form: errorUse }))

    if(data){
        navigate("/")
    }

    setIsLoading(false)
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
                <label htmlFor="Ingredients">Ingredients (separated by comma)</label>
                <input type="text" name="ingredients" value={form.ingredients} onChange={handleOnInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="Description">Description</label>
                <textarea type="text" name="description" rows="4" value={form.description} onChange={handleOnInputChange}></textarea>
            </div>
            <div className="input-field">
                <label htmlFor="Instructions">Instructions (separated by period)</label>
                <textarea type="text" name="instructions" rows="6" value={form.instructions} onChange={handleOnInputChange}></textarea>
            </div>
            <div className="footer">
                <button className="footer-btn recipeadd" disabled={isLoading} onClick={handleOnSubmit}>
                    {isLoading ? "Loading..." : "Add Recipe"}
                </button>
            </div>
        </div>
    </div>
    </div>
  )
}