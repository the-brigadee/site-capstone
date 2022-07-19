const db= require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError,UnauthorizedError } = require("../utils/errors");
const User=require("./user");

class Follow{
    static async showFollow(follow){
        return{
            id:follow.id,
            name:follow.name,
            created_at:follow.created_at

        }
    }
    static async createFollow(followfact){
        const requiredFields=["followed_id","following_id"]
        requiredFields.forEach(field =>{
            if(!followfact.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const existingfollowed= await User.fetchUserByID(followfact.followed_id)
        console.log(existingfollowed);
        if(!existingfollowed){
            throw new BadRequestError(`User does not exist`)
        }

        const existingfollowing= await User.fetchUserByID(followfact.following_id)
        console.log(existingfollowing);
        if(!existingfollowing){
            throw new BadRequestError(`User does not exist`)
        }

        const alreadyfollowing= await User.fetchFollowById(followfact.following_id)
        console.log(existingfollowing);
        if(!existingfollowing){
            throw new BadRequestError(`User does not exist`)
        }





        const result = await db.query(`
        INSERT INTO follower_to_following (
            followed_id,
            following_id
        )
        VALUES ($1, $2)
        RETURNING followed_id,following_id;
    `,
    [followfact.followed_id, followfact.following_id]
    )

        return result.rows[0]

        


    }

    static async deleteFollow(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("DELETE FROM follower_to_following WHERE id = $1;", [id])

        return "Successfully deleted Meal Plan"
    }


    static async fetchFollowById(user_id, followId) {
        
        const result = await db.query("SELECT * FROM follower_to_following WHERE following_id=$1 AND followed_id = $2;", [user_id,followId])
    
        return result.rows[0]
    }

    static async fetchAllFollowsByUserId(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const results = await db.query(`
        SELECT follower_to_following.following_id, follower_to_following.followed_id, users.username as followed_username 
        FROM follower_to_following
        INNER JOIN users 
        ON follower_to_following.followed_id=users.id
        WHERE following_id = $1;`, [user_id])
        console.log(results.rows)
        return results.rows
    }
}

module.exports=Follow