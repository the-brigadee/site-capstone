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

  return (
    <div className='recipe-detail-container'>

      {/* Main Information */}
      <RecipeMain recipe={recipe} />

      {/* Detailed Step Information */}
      <RecipeStep recipe={recipe}/>
        
    </div>
  )
}
 

function RecipeMain(recipe){
  const [savedrecipe, setSavedRecipe] = React.useState([])
  const [isSaved, setIsSaved] = React.useState(false)
  const {recipeId} = useParams()
  const {setError, user} = useAuthNavContext()

    const saveRecipe = async () => {
        const {data, error} = await apiClient.savedRecipe({
          user_id:user.id,
          recipe_id:recipeId
        })
        if (error) setError((e) => ({ ...e, recommended: error }))

        if(data.savedrecipe==='Successfully Unsaved Recipe!'){
          setIsSaved(false);
        }
    }


    React.useEffect(()=>{
      const getSavedRecipes = async () => {
        const {data, error} = await apiClient.getUsersSavedRecipes()
              if (error) setError((e) => ({ ...e, savedRecipe: error }))
              if (data?.savedrecipe) {
                setSavedRecipe(data.savedrecipe)
              }
      }
      getSavedRecipes()
    }, [isSaved, setError])


    React.useEffect(()=>{
      const ifSaved= async () =>{
        savedrecipe.map((idx)=> {
          if(parseInt(idx.recipe_id)===parseInt(recipeId)){
            setIsSaved(true);
          }
        })
      }
      ifSaved();
      })

  const date= new Date(recipe?.recipe?.recipeadd_date?.split("T")[0]).toDateString().split(" ")
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
            <img src={recipe.recipe.recipe_url} alt="" />
          </div>
          {/* Recipe Text */}
          <div className="recipe-detail-text">
            <h1> {recipe.recipe.name} </h1>
            <h3> Created on {date[1]} {parseInt(date[2])}<sup>{nth(parseInt(date[2]))}</sup> {date[3]}</h3>
            <h3> Recipe by {recipe.recipe.username} </h3>
            <h4> Categories : {recipe.recipe.category?.charAt(0).toUpperCase()+ recipe.recipe.category?.slice(1)} </h4>
            <h4> Calories: {recipe.recipe.calories} kcal</h4>
          </div>
        </div>
          

        {/* Recipe Edit buttons */}
        <div className="recipe-edit-buttons">
          <button> Add Plan </button>
          {isSaved ? <button onClick={()=>{saveRecipe(); setIsSaved(false)}}> Unsave </button> :<button onClick={()=>{saveRecipe();setIsSaved(true)}}> Save </button>}
          <button> Review </button>
          {recipe.recipe.user_id===user.id && <button> Delete </button>}
          
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
          {recipe?.recipe?.ingredients?.split(',').map((element,idx) => {
              return <li key={idx}>{element}</li>;})}
        </ul>
      </div>


      {/* Recipe directions */}
      <div className="recipe-detail-directions">
        <p className="directions-header"> Directions </p>
        <hr />
        <ol className='directions-list'>
        {recipe?.recipe?.instructions?.split('.'||'!').map((element,idx) => {
          if(element!==""){
              return <li key={idx}>{element}</li>;
          }
        })}
              
        </ol>
      </div>
    </div>
  )
}