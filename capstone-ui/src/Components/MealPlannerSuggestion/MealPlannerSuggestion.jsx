import * as React from 'react'
import './MealPlannerSuggestion.css'

export default function MealPlannerSuggestion({suggestionList, setFormPlan, setDisplaySuggestion, inputRef}) {

    const handleSuggestionOnClick = (name) => {
        setFormPlan((f) => ({ ...f, recipe_name : name }))

        // set input ref
        inputRef.current.value = name
        // set the suggestion list to false
        setDisplaySuggestion(false)
    }
  return (
    <div className='suggestion-grid'>
        {suggestionList.map((recipe, idx) => {
        return(
            <button key={idx} onClick={() => {handleSuggestionOnClick(recipe.name)}}>
                {recipe.name}
            </button>
        )
        })}
    </div>
  )
}