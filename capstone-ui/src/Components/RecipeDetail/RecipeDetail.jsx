import * as React from 'react'
import { useParams } from 'react-router-dom'
import {useAuthNavContext} from "../../Contexts/authNav"
import apiClient from "../../Services/ApiClient"
import './RecipeDetail.css'
import Overlay from '../Overlay/Overlay'


export default function RecipeDetail() {
  
  //get the recipe parameter from the url
  const {recipeId} = useParams()

  /**
   * Use React useEffect to get more details of the recipe from the API backend.
   */
   const [recipe, setRecipe] = React.useState([])
   const {setError, user} = useAuthNavContext()
   React.useEffect(() => {
       const getRecipeById = async () => {
           const {data, error} = await apiClient.recipeById(recipeId)
           if (error) setError((e) => ({ ...e, recommended: error }))
           if (data?.recipe) {
            setRecipe(data.recipe);
           }
       }
       getRecipeById()
   }, [setRecipe, setError, recipeId])

  React.useEffect( () => { 
    console.log("DELETE this LINE and the LINE BENEATH it")
    console.log("------------------------------------------------------------")
  })
  

  return (
    <div className='recipe-detail-container'>

      {/* Main Information */}
      <RecipeMain recipe={recipe} user={user} />

      {/* Detailed Step Information */}
      <RecipeStep recipe={recipe}/>
        
    </div>
  )
}
 

function RecipeMain(recipe, user){
  const date= new Date(recipe?.recipe?.created_at?.split("T")[0]).toDateString().split(" ")
  const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}
  return(
      <div className="recipe-detail-main">

        {/* Recipe detail info */}
        <div className="recipe-detail-info">
          {/* Recipe image  */}
          <div className="recipe-detail-img">
            <img src={recipe.recipe.image_url} alt="" />
          </div>
          {/* Recipe Text */}
          <div className="recipe-detail-text">
            <h1> {recipe.recipe.name} </h1>
            <h3> Created on {date[1]} {parseInt(date[2])}<sup>{nth(parseInt(date[2]))}</sup> {date[3]}</h3>
            <h3> Recipe by {user?.name} </h3>
            <h4> Categories : {recipe.recipe.category?.charAt(0).toUpperCase()+ recipe.recipe.category?.slice(1)} </h4>
            <h4> Calories: {recipe.recipe.calories} kcal</h4>
          </div>
        </div>
          

        {/* Recipe Edit buttons */}
        <div className="recipe-edit-buttons">
          <button> Add Plan </button>
          <button> Save </button>
          <button> Review </button>
          <button> Delete </button>
        </div>
        <Overlay />
      </div>
  )
}

function RecipeStep(recipe){
  return(
    <div className="recipe-detail-step">

      {/* recipe Ingredients */}
      <div className="recipe-detail-ingredients">
        <p className="ingredients-header"> Ingredients </p>
        <hr />
        <ul className='ingredients-list'>
          {recipe?.recipe?.ingredients?.split(',').map(element => {
              return <li>{element}</li>;})}
        </ul>
      </div>


      {/* Recipe directions */}
      <div className="recipe-detail-directions">
        <p className="directions-header"> Directions </p>
        <hr />
        <ol className='directions-list'>
        {recipe?.recipe?.instructions?.split('.'||'!').map(element => {
              return <li>{element}</li>;})}
        </ol>
      </div>
    </div>
  )
}