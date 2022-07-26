const db= require("../db")
const {BadRequestError,UnauthorizedError } = require("../utils/errors");
const User=require("./user");

/**
 * A utility class for retrieving profile information from the database
 */
class Profile{
    static async getProfileInformation(profileId, userId){

        //Check if profile is undefined or null
        if(!profileId){
            throw new BadRequestError('User does not exist')
        }

        // query the db
        const result = await db.query(`
        SELECT username, description, id as profile_id, image_url,
            (SELECT COUNT(*) 
                FROM recipe 
                WHERE user_id=$1) as total_recipes,
            (SELECT COUNT(*) 
                FROM follower_to_following 
                WHERE following_id=$2 ) as num_following, 
            (SELECT COUNT(*) 
                FROM follower_to_following 
                WHERE followed_Id=$3 ) as num_followers,
            (SELECT following_id 
                FROM 
                    (SELECT ftf.following_id, ftf.followed_id 
                        FROM follower_to_following ftf 
                        WHERE ftf.followed_id=users.id ) as user_follow 
                WHERE following_id=$4) as is_following 
            FROM users
            WHERE id=$5
            ;
        `, [profileId, profileId, profileId, userId, profileId])

        // return the result

        return result.rows[0]
    }

    /**
     * 
     * @param {Integer } profileId 
     * @param {Integer} my_id 
     * @returns {an Array} the array of all users followed by profileId
     */
    static async getProfileFollowing(profileId, my_id){

        /**  Check if profileId is null and throw an error
         *  
         * */ 

        if(!profileId){
            throw new BadRequestError("profile id is invalid")
        }
        
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
            WHERE users.id IN (
                SELECT followed_id 
                FROM follower_to_following
                WHERE following_id=$2
            );
         `,[my_id, profileId])
 
         //return the result    
         return result.rows
    }

     /**
     * 
     * @param {Integer } profileId 
     * @param {Integer} my_id 
     * @returns {an Array} the array of all users that are following a profile
     */
      static async getProfileFollowed(profileId, my_id){

        /**  Check if profileId is null and throw an error
         *  
         * */ 

        if(!profileId){
            throw new BadRequestError("profile id is invalid")
        }
        
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
            WHERE users.id IN (
                SELECT following_id 
                FROM follower_to_following
                WHERE followed_id=$2
            );
         `,[my_id, profileId])
 
         //return the result    
         return result.rows
    }
}

module.exports=Profile