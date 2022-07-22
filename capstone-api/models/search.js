const db= require("../db")
const {BadRequestError,UnauthorizedError } = require("../utils/errors");
const User=require("./user");

/**
 * A utility class for searching both Recipes and User's from the database
 */
class Search{

    /**
     * 
     * @param {String} searchWord 
     * @param {String} searchfilter 
     * @returns {Array} [] 
     */
    static async searchRecipe(searchWord, searchfilter){

        /**  make a new search word by adding (%) to the front and end of the word
         *  and changing the word to lowercase
         * */ 

        const word = `%${searchWord.toLowerCase()}%`
        

        /**  make the search filter by 
         *  (1) create a new string "%%" if searchfilter is null or
         * 
         *  (2) add (%) to both the front and the back of the string
         * */ 
        var filter = "%%"
        if(searchfilter !== null && searchfilter != "") {
            filter = `%${searchfilter.toLowerCase()}%`
        }

        const result = await db.query(`
        SELECT name,
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
        WHERE LOWER(name) LIKE $1
        AND LOWER(category) LIKE $2
        ;
        `,[word, filter])

        //return the result
        return result.rows
    }

    static async searchUser(searchWord){

        /**  make a new search word by adding (%) to the front and end of the word
         *  and changing the word to lowercase
         * */ 

         const word = `%${searchWord.toLowerCase()}%`
        
         const result = await db.query(`
         SELECT username, 
             id, 
             created_at, 
             image_url,
             description
         FROM users
         WHERE LOWER(username) LIKE $1
         ;
         `,[word])
 
         //return the result
         return result.rows
    }

    static async getRecipeByCategory(searchCategory){
        /**  make a new search category by adding (%) to the front and end of the word
         *  and changing the word to lowercase
         * */ 

         const category = `%${searchCategory.toLowerCase()}%`
         const result = await db.query(`
         SELECT name,
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
        WHERE LOWER(category) LIKE $1
        AND random() > 0.27
        LIMIT 100
        ;
         `,[category])
 
         //return the result
         return result.rows
    }
}

module.exports=Search