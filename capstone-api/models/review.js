const db= require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError,UnauthorizedError } = require("../utils/errors");
const Recipe=require("./recipe")

class Review{
    static async showReview(review){
        return{
            id:review.id,
            name:review.name,
            created_at:review.created_at

        }
    }
    static async createReview(reviewfact){
        const requiredFields=["rating","user_id","recipe_id","comment"]
        requiredFields.forEach(field =>{
            if(!reviewfact.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const existingRecipe= await Recipe.fetchRecipeById(reviewfact.recipe_id)
        console.log(existingRecipe);
        if(!existingRecipe){
            throw new BadRequestError(`Recipe does not exist`)
        }

        const result = await db.query(`
        INSERT INTO reviews (
            rating,
            user_id,
            recipe_id,
            comment
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id, rating, user_id,recipe_id, comment, created_at, updated_at;
    `,
    [reviewfact.rating, reviewfact.user_id, reviewfact.recipe_id, reviewfact.comment]
    )

        return result.rows[0]

        


    }

    static async deleteReview(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("DELETE FROM reviews WHERE id = $1;", [id])

        return "Successfully deleted review"
    }


    static async fetchReviewById(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("SELECT * FROM reviews WHERE id = $1;", [id])
    
        return result.rows[0]
    }

    static async fetchAllReviewsByUserId(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT * FROM reviews WHERE user_id = $1`

        const results = await db.query(query, [user_id])
        console.log(results.rows)
        return results.rows
    }
}

module.exports=Review