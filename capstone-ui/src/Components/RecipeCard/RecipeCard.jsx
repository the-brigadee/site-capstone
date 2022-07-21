import * as React from 'react'
import './RecipeCard.css'
import { Link } from 'react-router-dom'

export default function RecipeCard({imageUrl, name, category, calories, id}) {
  return ( 
    <div className='recipe-card'>
        {/* Load the main image here */}
        <Link to={`/recipe/${id}`}>
          <img src={imageUrl} alt="Recipe img"/>
        </Link>
        {/* Background div. Do not delete */}
        <div className='recipe-border-top'>

        </div>

        {/* Background div do not delete */}
        <div className='recipe-border-left'>

        </div>

        {/* Border div do not delete */}
        <div className="recipe-border-container">

        </div>

        {/* The text that goes over the image */}
        <div className="recipe-img-text">
          {/* Food name  */}
          <h2>{name}</h2>
          {/* Food calories */}
          <p> {calories} Calories </p>
          {/* Meal Type */}
          <p> {category} </p>
        </div>
  </div>
  )
}