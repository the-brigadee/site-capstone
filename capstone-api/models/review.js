const db= require("../db")
const {BadRequestError } = require("../utils/errors");
const Recipe=require("./recipe")

class Review{

    static async createReview(reviewfact){
        //checking for required fields
        const requiredFields=["user_id","recipe_id","comment"]
        requiredFields.forEach(field =>{
            if(!reviewfact.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        //checking if the recipe being reviewed exist
        const existingRecipe= await Recipe.fetchRecipeById(reviewfact.recipe_id)
        
        if(!existingRecipe){
            throw new BadRequestError(`Recipe does not exist`)
        }

        // if the recipe exist create the review
        const result = await db.query(`
        INSERT INTO reviews (
            user_id,
            recipe_id,
            comment
        )
        VALUES ($1, $2, $3)
        RETURNING id, user_id,recipe_id, comment, created_at, updated_at;
    `,
    [reviewfact.user_id, reviewfact.recipe_id, reviewfact.comment]
    )

        return result.rows[0]
    }

    static async deleteReview(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        await db.query("DELETE FROM reviews WHERE id = $1;", [id])

        return "Successfully deleted review"
    }

    static async editReview(creds) {
        
        if (!creds.review_id) {
            throw new BadRequestError(`Missing review id in request body.`)
        } 
        
        await db.query("UPDATE reviews SET comment = $1 WHERE id = $2;", [creds.comment, creds.review_id])

        return "Successfully edit review"
    }

    static async fetchAllReviewsByRecipeId(recipe_id) {
        // check for the recipe_id 
        if (!recipe_id) {
            throw new BadRequestError("No recipe_id provided")
        }
        //checking if the recipe exist
        const existingRecipe= await Recipe.fetchRecipeById(recipe_id)
        
        if(!existingRecipe){
            throw new BadRequestError(`Recipe does not exist`)
        }

        //if the recipe exist fetch all of the reviews including the reviewer's information
        const query = `SELECT users.username, users.image_url, reviews.user_id, reviews.recipe_id, reviews.comment, reviews.created_at, reviews.id, reviews.updated_at 
        FROM reviews
        JOIN users
        ON reviews.user_id = users.id
        WHERE recipe_id = $1
        ORDER BY reviews.created_at DESC;`
        
        const results = await db.query(query, [recipe_id])
        
        return results.rows
    }
}

module.exports=Review