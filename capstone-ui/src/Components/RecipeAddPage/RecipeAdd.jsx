import * as React from 'react'
import './RecipeAdd.css'
import { Link } from 'react-router-dom'
import {useAuthNavContext} from "../../Contexts/authNav"
import apiClient from "../../Services/ApiClient"
import items from '../../Data/categoryItem.json'

export default function RecipeAdd({imageUrl}) {
  const {popupType, closePopup, showRegisterForm, showLoginForm, error, setError, setUser, isLoading, setIsLoading, user} = useAuthNavContext()
  const [form, setForm] = React.useState({
    name: "",
    category: "",
    description: "",
    instructions: "",
    ingredients: "",
    calories: "",
    image_url: ""

})
  const handleOnSubmit = async () => {
    setIsLoading(true)
    setError((e) => ({ ...e, form: null }))

    var dataUse, errorUse
    if (popupType === "Register") {
        const {data, error} = await apiClient.signupUser({
            firstName: form.first_name,
            lastName: form.last_name,
            email: form.email,
            dob: form.dob,
            password: form.password,
            userName: form.username
        })
        dataUse = data
        errorUse = error
    }
            
    if (errorUse) setError((e) => ({ ...e, form: errorUse }))
    if (dataUse?.user) {
        apiClient.setToken(dataUse.token)
        setUser(dataUse?.user)
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
                <input type="text" name="name"/>
            </div>
            <div className="input-field">
                <label htmlFor="Category">Category</label>
                <select id="category" name="category">
                  {items.map((item,idx) => {
                    return <option key={idx} value={item.name.toLowerCase()}>{item.name}</option>
                  })}
                </select>
            </div>
            <div className="input-field">
                <label htmlFor="Calories">Calories</label>
                <input type="number" name="calories"/>
            </div>
            <div className="input-field">
                <label htmlFor="Image_url">Image URL</label>
                <input type="url" name="image_url"/>
            </div>
            <div className="input-field">
                <label htmlFor="Ingredients">Ingredients (separated by comma)</label>
                <input type="text" name="ingredients"/>
            </div>
            <div className="input-field">
                <label htmlFor="Description">Description</label>
                <textarea type="text" name="description" rows="4"></textarea>
            </div>
            <div className="input-field">
                <label htmlFor="Instructions">Instructions (separated by period)</label>
                <textarea type="text" name="instructions" rows="6"></textarea>
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