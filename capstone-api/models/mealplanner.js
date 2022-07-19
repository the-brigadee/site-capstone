const db= require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError,UnauthorizedError } = require("../utils/errors");
const Recipe=require("./recipe")

class MealPlanner{
    static async showMealPlanner(mealplanner){
        return{
            id:mealplanner.id,
            name:mealplanner.name,
            created_at:mealplanner.created_at

        }
    }
    static async createMealPlanner(mealplannerfact){
        const requiredFields=["user_id","weekday","recipe_id"]
        requiredFields.forEach(field =>{
            if(!mealplannerfact.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const existingRecipe= await Recipe.fetchRecipeById(mealplannerfact.recipe_id)
        console.log(existingRecipe);
        if(!existingRecipe){
            throw new BadRequestError(`Recipe does not exist`)
        }

        const result = await db.query(`
        INSERT INTO meal_planner (
            user_id,
            weekday,
            recipe_id
        )
        VALUES ($1, $2, $3)
        RETURNING id, user_id,weekday,recipe_id;
    `,
    [mealplannerfact.user_id, mealplannerfact.weekday, mealplannerfact.recipe_id]
    )

        return result.rows[0]

        


    }

    static async deleteMealPlanner(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("DELETE FROM meal_planner WHERE id = $1;", [id])

        return "Successfully deleted Meal Plan"
    }

    static async deleteAllMealPlanner(user_id) {
        
        if (!user_id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("DELETE FROM meal_planner WHERE user_id = $1;", [user_id])

        return "Successfully deleted Entire Meal Plan"
    }


    static async fetchMealPlannerById(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("SELECT * FROM meal_planner WHERE id = $1;", [id])
    
        return result.rows[0]
    }

    static async fetchAllMealPlannersByUserId(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const results = await db.query(`
        SELECT meal_planner.id, meal_planner.user_id,meal_planner.weekday, recipe.id as recipe_id, recipe.name
        FROM meal_planner
        INNER JOIN recipe 
        ON meal_planner.recipe_id=recipe.id
        WHERE meal_planner.user_id = $1`, [user_id])
        console.log(results.rows)
        return results.rows
    }
}

module.exports=MealPlanner