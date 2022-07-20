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
    <div className='recipe-detail'>
        RecipeDetail
    </div>
  )
}
 