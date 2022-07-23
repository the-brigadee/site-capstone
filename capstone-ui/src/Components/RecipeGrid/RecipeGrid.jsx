import * as React from 'react'
import './RecipeGrid.css'
import RecipeCard from '../RecipeCard/RecipeCard'
import apiClient from "../../Services/ApiClient"
import {useAuthNavContext} from "../../Contexts/authNav"


export default function RecipeGrid(){
    const [recipes, setRecipes] = React.useState([])
    const {setError} = useAuthNavContext()
    React.useEffect(() => {
        const getRandomRecipes = async () => {
            const {data, error} = await apiClient.getRecommended()
            if (error) setError((e) => ({ ...e, recommended: error }))
            if (data?.recipes) {
                setRecipes(data.recipes)
            }
        }
        getRandomRecipes()
    }, [setRecipes])
    return(
        <div className='recipe-over'>
            <div className="recipe-container"> 
                <h1 className="grid-title">Recommended</h1>
                <hr />
                <div className="recipe-grid">
                    {recipes?.map((recipe, idx) => (
                        <RecipeCard title={recipe.title}
                        recipe_url={recipe.recipe_url}
                        recipe_id={recipe.recipe_id}
                        ownername={recipe.ownername}
                        owner_url={recipe.owner_url}
                        owner_id={recipe.owner_id}
                        category={recipe.category}
                        calories={recipe.calories}
                        key={idx}
                        />
                    ))}
                </div>
            </div>
        </div>
        
    )
}