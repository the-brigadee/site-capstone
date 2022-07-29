import * as React from 'react'
import './MealPlanner.css'
import { Link } from 'react-router-dom'
import {useAuthNavContext} from "../../Contexts/authNav"
import Overlay from '../Overlay/Overlay'


export default function MealPlanner({imageUrl}) {
  const {isLoading, showMealPlannerForm, mealPlan, getMealPlan, deleteMealPlan, setPopupType, setDeleteAction, showPopup, setDisplaySuggestion, deleteallgetMealPlan} = useAuthNavContext()
  
  // ingredient array containing all of the ingredients needed
  const ingredientList = []

  //Imported getMealPlan from authNav to get Meal Plan for the current user
  React.useEffect(()=>{
      getMealPlan();
 }, [])

 // handle when the user wants to reset their meal planner, should show the popup and confirmation messages
 const handleOnDelete = () => {
   setPopupType("Confirm")
   setDeleteAction("mealPlan")
   showPopup()
 }

 const presentableName = (name) => {

   if(!name)
   return ""
   if(name.length > 20){
      return name.substring(0,17) + "..."
   }
   return name
 }

return (
<div className="MealPlannerPage">
   <div className="content">
         <div className="main">
            <div className="day">
               <div className="background">
                  <p><b>Sunday</b></p>
                  <div className="recipes">
                        {mealPlan?.map((idx) =>{
                           const ingredientArr = idx?.ingredients.split(',')
                           ingredientArr?.map((ingr) => {
                              if (ingr !== "" && ingr !== " " && ingredientList.indexOf(ingr.trim()) === -1 ) {
                                 ingredientList.push(ingr.trim())
                              }
                           })
                        if(idx?.weekday==="Sunday"){
                           return <div className="recipe" key={idx?.id}><Link style={{textDecoration: 'none'}} to={`/recipe/${idx.recipe_id}`}><p>{presentableName(idx?.name)}</p></Link><button onClick={()=>{deleteMealPlan(idx.id);}}><b>X</b></button></div>
                        }
                        })}
                  </div>
               </div>
            </div>
            <div className="day">
               <div className="background">
                  <p><b>Monday</b></p>
                  <div className="recipes">
                  {mealPlan?.map((idx) =>{
                        if(idx?.weekday==="Monday"){
                           return <div className="recipe" key={idx?.id}><Link style={{textDecoration: 'none'}} to={`/recipe/${idx.recipe_id}`}><p>{presentableName(idx?.name)}</p></Link><button onClick={()=>{deleteMealPlan(idx.id);}}><b>X</b></button></div>
                        }
                     })}
                  </div>
               </div>
            </div>
            <div className="day">
               <div className="background">
                  <p><b>Tuesday</b></p>
                  <div className="recipes">
                  {mealPlan?.map((idx) =>{
                        if(idx?.weekday==="Tuesday"){
                           return <div className="recipe" key={idx?.id}><Link style={{textDecoration: 'none'}} to={`/recipe/${idx.recipe_id}`}><p>{presentableName(idx?.name)}</p></Link><button onClick={()=>{deleteMealPlan(idx.id);}}><b>X</b></button></div>
                        }
                     })}
                  </div>
               </div>
            </div>
            <div className="day">
               <div className="background">
                  <p><b>Wednesday</b></p>
                  <div className="recipes">
                  {mealPlan?.map((idx) =>{
                        if(idx?.weekday==="Wednesday"){
                           return <div className="recipe" key={idx?.id}><Link style={{textDecoration: 'none'}} to={`/recipe/${idx.recipe_id}`}><p>{presentableName(idx?.name)}</p></Link><button onClick={()=>{deleteMealPlan(idx.id);}}><b>X</b></button></div>
                        }
                     })}
                  </div>
               </div>
            </div>
            <div className="day">
               <div className="background">
                  <p><b>Thursday</b></p>
                  <div className="recipes">
                  {mealPlan?.map((idx) =>{
                        if(idx?.weekday==="Thursday"){
                           return <div className="recipe" key={idx?.id}><Link style={{textDecoration: 'none'}} to={`/recipe/${idx.recipe_id}`}><p>{presentableName(idx?.name)}</p></Link><button onClick={()=>{deleteMealPlan(idx.id);}}><b>X</b></button></div>
                        }
                     })}
                  </div>
               </div>
            </div>
            <div className="day">
               <div className="background">
                  <p><b>Friday</b></p>
                  <div className="recipes">
                  {mealPlan?.map((idx) =>{
                        if(idx?.weekday==="Friday"){
                           return <div className="recipe" key={idx?.id}><Link style={{textDecoration: 'none'}} to={`/recipe/${idx.recipe_id}`}><p>{presentableName(idx?.name)}</p></Link><button onClick={()=>{deleteMealPlan(idx.id);}}><b>X</b></button></div>
                        }
                     })}
                  </div>
               </div>
            </div>
            <div className="day">
               <div className="background">
                  <p><b>Saturday</b></p>
                  <div className="recipes">
                  {mealPlan?.map((idx) =>{
                        if(idx?.weekday==="Saturday"){
                           return <div className="recipe" key={idx?.id}><Link style={{textDecoration: 'none'}} to={`/recipe/${idx.recipe_id}`}><p>{presentableName(idx?.name)}</p></Link><button onClick={()=>{deleteMealPlan(idx.id);}}><b>X</b></button></div>
                        }
                     })}
                  </div>
               </div>
            </div>
         </div>
         <div className="button">
               <button className="footer-btn recipeadd" disabled={isLoading} onClick={()=>{showMealPlannerForm();}}>
                  {isLoading ? "Loading..." : "Add Recipe"}
               </button>
               <button className="footer-btn deletemealplan" disabled={isLoading} onClick={handleOnDelete}>
                  {isLoading ? "Loading..." : "Reset Mealplan"}
               </button>
            <Overlay />
         </div>
   </div>
   <div className="shopping-list">
            <h2>Shopping List</h2>
            <div className="list">
               {ingredientList?.map((ingr, idx) => {
                  return <div className="list-item">
                        <input type="checkbox" id={`idx-${idx}`}key={idx} value={ingr} />
                        <label for={`idx-${idx}`}> {ingr}</label><br></br>
                  </div>
               })}
            </div>
            <div className="shopping-list-footer">
               <button>Send Shopping List</button>
            </div>
   </div>
</div>
  )
}
