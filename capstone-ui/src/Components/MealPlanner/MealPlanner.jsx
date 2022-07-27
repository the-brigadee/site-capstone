import * as React from 'react'
import './MealPlanner.css'
import { Link } from 'react-router-dom'
import {useAuthNavContext} from "../../Contexts/authNav"
import Overlay from '../Overlay/Overlay'


export default function MealPlanner({imageUrl}) {
  const {error, setError, isLoading, setIsLoading, user, showMealPlannerForm, mealPlan, setMealPlan, getMealPlan} = useAuthNavContext()

  //Imported getMealPlan from authNav to get Meal Plan for the current user
  React.useEffect(()=>{
      getMealPlan();
 }, [])


return (
<div className="MealPlannerPage">
   <div className="content">
         <div className="main">
            <div className="day">
               <div className="background">
                  <p><b>Sunday</b></p>
                  <div className="recipes">
                     {mealPlan?.map((idx) =>{
                        if(idx?.weekday==="Sunday"){
                           return <li key={idx?.id}>{idx?.name}</li>
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
                           return <li key={idx?.id}>{idx?.name}</li>
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
                           return <li key={idx?.id}>{idx?.name}</li>
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
                           return <li key={idx?.id}>{idx?.name}</li>
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
                           return <li key={idx?.id}>{idx?.name}</li>
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
                           return <li key={idx?.id}>{idx?.name}</li>
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
                           return <li key={idx?.id}>{idx?.name}</li>
                        }
                     })}
                  </div>
               </div>
            </div>
         </div>
         <div className="button">
               <button className="footer-btn recipeadd" disabled={isLoading} onClick={()=>{showMealPlannerForm();getMealPlan();}}>
                  {isLoading ? "Loading..." : "Add Recipe"}
               </button>
            <Overlay />
         </div>

   </div>
</div>
  )
}