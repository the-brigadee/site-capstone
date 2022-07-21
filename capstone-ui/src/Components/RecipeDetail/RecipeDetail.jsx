import * as React from 'react'
import { useParams } from 'react-router-dom'
import './RecipeDetail.css'

export default function RecipeDetail() {
  
  //get the recipe parameter from the url
  const {recipeId} = useParams()

  /**
   * Use React useEffect to get more details of the recipe from the API backend.
   */

  React.useEffect( () => { 
    console.log("DELETE this LINE and the LINE BENEATH it")
    console.log("------------------------------------------------------------")
  })

  return (
    <div className='recipe-detail-container'>

      {/* Main Information */}
      <RecipeMain />

      {/* Detailed Step Information */}
      <RecipeStep />
        
    </div>
  )
}
 

function RecipeMain(){
  return(
      <div className="recipe-detail-main">

        {/* Recipe detail info */}
        <div className="recipe-detail-info">
          {/* Recipe image  */}
          <div className="recipe-detail-img">
            <img src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Chocolate-Lover-s-Pancakes_EXPS_TOHCA19_133776_B03_15_3b_rms.jpg" alt="" />
          </div>
          {/* Recipe Text */}
          <div className="recipe-detail-text">
            <h1> Chocolate Pancake </h1>
            <h3> Created on July 4<sup>th</sup> 1776 </h3>
            <h3> Recipe by Felix Augustus </h3>
            <h4> Categories : </h4>
            <h4> Calories: 350 kcal</h4>
            <h5> <b> placeholder stars </b> 3 stars </h5>
          </div>
        </div>
          

        {/* Recipe Edit buttons */}
        <div className="recipe-edit-buttons">
          <button> Add Plan </button>
          <button> Save </button>
          <button> Review </button>
          <button> Delete </button>
        </div>
      </div>
  )
}

function RecipeStep(){
  return(
    <div className="recipe-detail-step">

      {/* recipe Ingredients */}
      <div className="recipe-detail-ingredients">
        <p className="ingredients-header"> Ingredients </p>
        <hr />
        <ul className='ingredients-list'>
          <li> Pancakes </li>
          <li> Chocolate Syrup </li>
          <li> Butter </li>
        </ul>
      </div>


      {/* Recipe directions */}
      <div className="recipe-detail-directions">
        <p className="directions-header"> Directions </p>
        <hr />
        <ol className='directions-list'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </div>
    </div>
  )
}