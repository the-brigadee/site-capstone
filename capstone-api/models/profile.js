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
}

module.exports=Profile