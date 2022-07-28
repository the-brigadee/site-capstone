const db= require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError,UnauthorizedError } = require("../utils/errors");

class Recipe{
    static async showRecipe(recipe){
        return{
            id:recipe.id,
            name:recipe.name,
            created_at:recipe.created_at

        }
    }
    static async createRecipe(recipefact){
        const requiredFields=["name","category","ingredients","instructions", "user_id", "calories", "image_url", "description"]

        //checks for missing fields
        requiredFields.forEach(field =>{
            if(!recipefact.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        })

        //checks for empty strings
        //fixed so that error's first letter is capitalized
        requiredFields.forEach(field =>{
            if(recipefact[field]===''||""){
                throw new BadRequestError(`${field.charAt(0).toUpperCase()+ field.slice(1)} cannot be empty.`)
            }
        })
        
        const result = await db.query(`
        INSERT INTO recipe (
            name,
            category,
            description,
            instructions,
            ingredients,
            calories,
            image_url,
            user_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, name, category,description, instructions, ingredients, calories, image_url, user_id,created_at, updated_at;
    `,
    [recipefact.name.trim(), recipefact.category, recipefact.description.trim(), recipefact.instructions.trim(),recipefact.ingredients.trim(), recipefact.calories,recipefact.image_url, recipefact.user_id]
    )
        return result.rows[0]
    }

    static async deleteRecipe(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("DELETE FROM recipe WHERE id = $1;", [id])

        return "Successfully deleted recipe"
    }


    static async fetchRecipeById(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        const result = await db.query(`SELECT recipe.name, 
        recipe.id,
        recipe.category, 
        recipe.calories, 
        recipe.image_url as recipe_url,
        recipe.created_at as recipeadd_date,
        recipe.ingredients,
        recipe.instructions,
        users.id as user_id, 
        users.username
        FROM recipe 
        JOIN users ON recipe.user_id=users.id
        WHERE recipe.id = $1`, [id])
    
        return result.rows[0]
    }

    static async fetchAllRecipesByUserId(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT * FROM recipe WHERE user_id = $1`

        const results = await db.query(query, [user_id])
        console.log(results.rows)
        return results.rows
    }

    static async fetchAllSavedRecipesByUserId(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT name,
                            reci.id, 
                            reci.description,
                            reci.created_at, 
                            reci.updated_at, 
                            reci.image_url as recipe_url, 
                            username as owner, 
                            users.image_url as user_url,
                            users.id as user_id
                        FROM recipe reci 
                        JOIN users ON reci.user_id=users.id 
                        WHERE reci.id IN (
                            SELECT recipe_id 
                            FROM saved_recipes 
                            WHERE user_id=$1);
        `

        const results = await db.query(query, [user_id])
        return results.rows
    }

    static async fetchAllOwnedRecipesByUserId(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT name,
                            reci.id, 
                            reci.description,
                            reci.created_at, 
                            reci.updated_at, 
                            reci.image_url as recipe_url, 
                            username as owner, 
                            users.image_url as user_url,
                            users.id as user_id
                        FROM recipe reci 
                        JOIN users ON reci.user_id=users.id 
                        WHERE user_id = $1;
        `

        const results = await db.query(query, [user_id])
        return results.rows
    }

    static async getRecommendedRecipes() {
        // get recipe array

        const query = `SELECT name as title, 
                        recipe.id as recipe_id,
                        category, 
                        calories, 
                        recipe.image_url as recipe_url, 
                        users.id as owner_id, 
                        users.username as ownername, 
                        users.image_url as owner_url 
                        FROM recipe 
                        JOIN users ON recipe.user_id=users.id 
                        ORDER BY random() LIMIT 6`
        const results = await db.query(query)
        return results.rows
    }
    
}

module.exports=Recipe