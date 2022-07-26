import * as React from 'react'
import './RecipeCard.css'
import { Link } from 'react-router-dom'

export default function RecipeCard({title, recipe_url, recipe_id, ownername, owner_url, owner_id,category,calories}) {
  const categoryDisplay = () => {
    const categoryList = category.split(",")

    var categories = ''

    if(categoryList?.length > 0){
      categoryList.map((categor) => {
        categories += categor
        categories += " "
      })
    }

    if(categories.trim()?.length > 22) categories = categories.trim().substring(0,18) + "..."
    return categories.trim()
  }

  const titleDisplay = () =>{
    var word = title;
    if(word?.length > 40){
      word = word.substring(0,36) + "..."
    }
    return word
  }

  return ( 
    <div className='recipe-card'>
      {/* Food's profile picture here */}
      <div className="recipe-card-img">
        <Link to={`/recipe/${recipe_id}`}>
            <img src={recipe_url} alt="Recipe img"/>
        </Link>
      </div>

      {/* food name and stuff name, calories, category, owner url */} 
      <div className="recipe-card-info">

        {/* display the image of the owner of the recipe */}
        <div className="recipe-card-owner-img">        
          {owner_url ? 
            <Link to={`/profile/${owner_id}`}>
              <img src={owner_url} alt="Recipe owner image"/> 
            </Link> 
            : 
            <Link to={`/profile/${owner_id}`}>
              <img src="https://cdn.icon-icons.com/icons2/933/PNG/512/round-account-button-with-user-inside_icon-icons.com_72596.png" alt="Recipe owner image" className='default'/>
            </Link>
              }
        </div>

        <div className="recipe-card-text">

          {/* Name of recipe owner */}
          <div className="recipe-card-owner">
          <Link to={`/profile/${owner_id}`}>
              <h3> By {ownername} </h3>
            </Link>
          </div>


          {/* name of the recipe */}
          <div className="recipe-card-title">
          <Link to={`/recipe/${recipe_id}`}>
              <h3>{titleDisplay()}</h3>
            </Link>
          </div>
          

          {/* calories in recipe */}
          <div className="recipe-card-calories">
            <h3>{calories} Kcal</h3>
          </div>

          {/* displays the list of categories for recipe */}
          <div className="recipe-card-category-list">
            <p>Categories: {categoryDisplay()}</p>
          </div>
        </div>
      </div>
  </div>
  )
}