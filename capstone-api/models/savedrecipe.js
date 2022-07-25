const db= require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError,UnauthorizedError } = require("../utils/errors");
const Recipe=require("./recipe")

class SavedRecipe{
    static async showSavedRecipe(savedrecipe){
        return{
            id:savedrecipe.id,
            name:savedrecipe.name,
            created_at:savedrecipe.created_at

        }
    }
    static async createSavedRecipe(savedrecipefact){
        const requiredFields=["user_id","recipe_id"]
        requiredFields.forEach(field =>{
            if(!savedrecipefact.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        
        const existingRecipe= await Recipe.fetchRecipeById(savedrecipefact.recipe_id)
        if(!existingRecipe){
            throw new BadRequestError(`Recipe does not exist`)
        }

        const existingSavedRecipe= await SavedRecipe.fetchSavedRecipeById(savedrecipefact.recipe_id)

        if(existingSavedRecipe){
            const result = await db.query("DELETE FROM saved_recipes WHERE user_id = $1 and recipe_id=$2;", [savedrecipefact.user_id, savedrecipefact.recipe_id])
            return("Successfully Unsaved Recipe!")
        }



        const result = await db.query(`
        INSERT INTO saved_recipes (
            user_id,
            recipe_id
        )
        VALUES ($1, $2)
        RETURNING user_id, recipe_id, created_at;
    `,
    [savedrecipefact.user_id, savedrecipefact.recipe_id]
    )
    
    
    return result.rows[0]

        

        
        


    }

    static async fetchSavedRecipeById(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("SELECT * FROM saved_recipes WHERE recipe_id = $1;", [id])
    
        return result.rows[0]
    }

    static async fetchAllSavedRecipesByUserId(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const results = await db.query(`
        SELECT saved_recipes.user_id,
        recipe.user_id as owner_id, 
        recipe.id as recipe_id, 
        recipe.name, recipe.category,
        recipe.calories, 
        recipe.image_url, 
        recipe.created_at,
        users.username as ownername, 
        users.image_url as owner_url 
        FROM saved_recipes
        INNER JOIN recipe 
        ON saved_recipes.recipe_id=recipe.id 
        JOIN users ON recipe.user_id=users.id
        WHERE saved_recipes.user_id = $1;`, [user_id])
        return results.rows
    }
}

module.exports=SavedRecipe