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
        if(searchfilter !== null && searchfilter != "" && searchfilter !== undefined) {
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

    static async searchUser(searchWord, my_id){

        /**  make a new search word by adding (%) to the front and end of the word
         *  and changing the word to lowercase
         * */ 

         const word = `%${searchWord.toLowerCase()}%`
        
         const result = await db.query(`
            SELECT users.id as user_id, 
                users.username as username,
                users.image_url as image_url,
                users.description as description,
                (SELECT count(*) 
                    FROM recipe r 
                    WHERE r.user_id = users.id
                    ) as total_recipe,
                ( SELECT count(*) 
                    FROM follower_to_following ftf  
                    WHERE ftf.following_id = users.id
                    ) as num_following, 
                (SELECT following_id 
                    FROM 
                    (SELECT ftf.following_id, 
                            ftf.followed_id 
                            FROM follower_to_following ftf 
                            WHERE ftf.followed_id=users.id
                    ) as user_follow WHERE following_id=$1
                ) as is_following
            FROM users 
            WHERE LOWER(username) 
            LIKE $2
         `,[my_id, word])
 
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