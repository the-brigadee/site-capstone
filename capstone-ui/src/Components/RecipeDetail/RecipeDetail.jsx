import * as React from 'react'
import { useParams, Link } from 'react-router-dom'
import {useAuthNavContext} from "../../Contexts/authNav"
import apiClient from "../../Services/ApiClient"
import './RecipeDetail.css'
import Overlay from '../Overlay/Overlay'
import { stripHtml } from "string-strip-html"


export default function RecipeDetail() {
  
  //get the recipe parameter from the url
  const {recipeId} = useParams()

  /**
   * Use React useEffect to get more details of the recipe from the API backend.
   */
  const {setError} = useAuthNavContext()

  const [recipe, setRecipe] = React.useState([])
  
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
  const {setError, user, showLoginForm, showMealPlannerAddForm, setPopupType, setDeleteAction, showPopup} = useAuthNavContext()

    const saveRecipe = async () => {
      if(!user?.email){
        showLoginForm();
        setError((e) => ({ ...e, form:"You need to be logged in!" }))}
      
      if(user?.email){
        const {data, error} = await apiClient.savedRecipe({
          user_id:user.id,
          recipe_id:recipeId
        })
        if (error) setError((e) => ({ ...e, recommended: error }))

        if(data?.savedrecipe==='Successfully Unsaved Recipe!'){
          setIsSaved(false);
        }}
    }
    

    // handle when user wants to delete a recipe
    const deleteRecipe = () => { 
      setPopupType("Confirm")
      setDeleteAction("recipe")
      showPopup()
    }


// handle when user want to add a recipe to their mealplan, logged in or not logged in
  const addPlan = async () => {
    if(!user?.email){
      showLoginForm();
      setError((e) => ({ ...e, form:"You need to be logged in!" }))}
    
    if(user?.email){
      showMealPlannerAddForm();
    }
  }

    //run everytime the component is mounted

    const presentableDescription = () => {
        // function to cut description string
        if(!recipe?.recipe?.description?.length){
            return "This recipe has no description"
        }
        else{
            return stripHtml(recipe.recipe.description).result
        }

    }

  // useEffect to fetch the user's saved recipes
    React.useEffect(()=>{
      const getSavedRecipes = async () => {
        const {data, error} = await apiClient.getUsersSavedRecipes()
              if (error) setError((e) => ({ ...e, savedRecipe: error }))
              if (data?.savedrecipe) {
                setSavedRecipe(data.savedrecipe)
              }
              data?.savedrecipe?.map((idx)=> {
                if(parseInt(idx.recipe_id)===parseInt(recipeId)){
                  setIsSaved(true);
                }
              })
      }

      if(user?.email){
      getSavedRecipes()}
    }, [isSaved, setError,recipeId])

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
            <h3> Recipe by <Link style={{textDecoration: 'none'}} to={`/profile/${recipe?.recipe?.user_id}`}>{recipe.recipe.username}</Link></h3>
            <h4> Categories : {recipe.recipe.category?.charAt(0).toUpperCase()+ recipe.recipe.category?.slice(1)} </h4>
            <h4> Calories: {recipe.recipe.calories} kcal</h4>
            <h4> {presentableDescription()} </h4>
          </div>
        </div>
          

        {/* Recipe Edit buttons */}
        <div className="recipe-edit-buttons">
          <button onClick={()=>{addPlan();}}> Add Plan </button>
          {isSaved && user?.email ? <button onClick={()=>{saveRecipe(); setIsSaved(false)}}> Unsave </button> :<button onClick={()=>{saveRecipe();setIsSaved(true)}}> Save </button>}
          <button> Review </button>
          {/* Recipe Delete button */}
          {recipe.recipe.user_id===user.id && <button onClick={deleteRecipe}> Delete </button>}      
        </div>
        <Overlay />
      </div>
  )
}

function RecipeStep(recipe){
  const ingredients=[]

  //Maps through recipe.ingredients and pushes them into ingredients array created above
  recipe?.recipe?.ingredients?.split(', '||',').map((element,idx) => {
    ingredients.push(element)})
    
  //Remove all duplicate ingredients from the ingredients array
  const uniqueIngredients = [...new Set(ingredients)];

  return(
    <div className="recipe-detail-step">

      {/* recipe Ingredients */}
      <div className="recipe-detail-ingredients">
        <p className="ingredients-header"> Ingredients </p>
        <hr />
        <ul className='ingredients-list'>
          {uniqueIngredients?.map((element,idx) => {
            if (element !== "" && element !== " ") {
              return <li key={idx}>{element}</li>;
            }
              })}
        </ul>
      </div>


      {/* Recipe directions */}
      <div className="recipe-detail-directions">
        <p className="directions-header"> Directions </p>
        <hr />
        <ol className='directions-list'>
        {recipe?.recipe?.instructions?.split('. '||'! ').map((element,idx) => {
          if(element!==""){
              return <li key={idx}>{element}</li>;
          }
        })}
              
        </ol>
      </div>
    </div>
  )
}