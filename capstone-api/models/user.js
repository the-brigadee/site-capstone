const db= require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError,UnauthorizedError } = require("../utils/errors");

class User{
    static async makePublicUser(user){
        return{
            id:user.id,
            email:user.email,
            first_name:user.first_name,
            last_name:user.last_name,
            username:user.username,
            dob:user.dob,
            bio: user.description,
            imageUrl: user.image_url,
            created_at:user.created_at

        }
    }
    static async login(credentials){
        //user should submit their email and password
        //if any of these fields are missing, throw an error
        const requiredFields=["email","password"]
        requiredFields.forEach(field =>{
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        //lookup the user in the db by email
        const user= await User.fetchUserByEmail(credentials.email)
        //if a user is found, compare the submitted password
        //with the password in the db
        //if there is a match, return the user
        if(user){
            const isValid= await bcrypt.compare(credentials.password,user.password)
            if(isValid){
                return User.makePublicUser(user)
            }
        }

        //if any of this goes wrong, throw an error





        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async delete(credentials){
        //user should submit their email and password
        //if any of these fields are missing, throw an error
        const requiredFields=["email","password"]
        requiredFields.forEach(field =>{
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        //lookup the user in the db by email
        const user= await User.fetchUserByEmail(credentials.email)
        //if a user is found, compare the submitted password
        //with the password in the db
        //if there is a match, return the user
        if(user){
            const isValid= await bcrypt.compare(credentials.password,user.password)
            if(isValid){
                const query=`DELETE FROM users WHERE email=$1`
                const result= await db.query(query, [credentials.email.toLowerCase()])
                return "Successfully deleted account"
            }
        }

        //if any of this goes wrong, throw an error
        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async update(credentials){

        const requiredFields=["email","password","firstName","lastName","userName", "dob"]
        requiredFields.forEach(field =>{
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email");
          }

        const existingUserEmail= await User.fetchUserByEmail(credentials.email)
        //make sure no user already exists in the system with that username
        //if one does, throw an error
        const existingUserName= await User.fetchUserByUserName(credentials.userName)
        if(existingUserName){
            throw new BadRequestError(`Duplicate username: ${credentials.userName}`)
        }



        //take the users password, and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);
        //take the users email, and lowercase it
        const lowercasedEmail=credentials.email.toLowerCase()

        //lookup the user in the db by email
        const user= await User.fetchUserByEmail(credentials.email)
        //if a user is found, compare the submitted password
        //with the password in the db
        //if there is a match, return the user
        if(user){
            const isValid= await bcrypt.compare(credentials.password,user.password)
            if(isValid){
                const result = await db.query(`
                UPDATE users
                SET email=$1,
                    password=$2,
                    first_name=$3,
                    last_name=$4,
                    username=$5,
                    dob=$6
                WHERE email=$1
                RETURNING id, email, password, first_name, last_name, username, dob, updated_at;
            `,
            [lowercasedEmail, hashedPassword, credentials.firstName, credentials.lastName, credentials.userName, credentials.dob]
            )
                return "Successfully updated user"
            }
        }

        //if any of this goes wrong, throw an error
        throw new UnauthorizedError("Invalid email/password combo")
    }


    static async register(credentials){
        //user should submit their email and password
        //if any of these fields are missing, throw an error
        const requiredFields=["email","password","firstName","lastName","userName", "dob"]
        requiredFields.forEach(field =>{
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email");
          }

        //make sure no user already exists in the system with that email
        //if one does, throw an error
        const existingUserEmail= await User.fetchUserByEmail(credentials.email)
        if(existingUserEmail){
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }
        //make sure no user already exists in the system with that username
        //if one does, throw an error
        const existingUserName= await User.fetchUserByUserName(credentials.userName)
        if(existingUserName){
            throw new BadRequestError(`Duplicate username: ${credentials.userName}`)
        }



        //take the users password, and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);
        //take the users email, and lowercase it
        const lowercasedEmail=credentials.email.toLowerCase()

        //create a new user in the db with all their info
        const result = await db.query(`
        INSERT INTO users (
            email,
            password,
            first_name,
            last_name,
            username,
            dob
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, password, first_name, last_name, username, dob, created_at;
    `,
    [lowercasedEmail, hashedPassword, credentials.firstName, credentials.lastName, credentials.userName, credentials.dob]
    )

        //return the user
        const user=result.rows[0]
        return User.makePublicUser(user)

        


    }


        static async register(credentials){
        //user should submit their email and password
        //if any of these fields are missing, throw an error
        const requiredFields=["email","password","firstName","lastName","userName", "dob"]
        requiredFields.forEach(field =>{
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email");
          }

        //make sure no user already exists in the system with that email
        //if one does, throw an error
        const existingUserEmail= await User.fetchUserByEmail(credentials.email)
        if(existingUserEmail){
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }
        //make sure no user already exists in the system with that username
        //if one does, throw an error
        const existingUserName= await User.fetchUserByUserName(credentials.userName)
        if(existingUserName){
            throw new BadRequestError(`Duplicate username: ${credentials.userName}`)
        }



        //take the users password, and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);
        //take the users email, and lowercase it
        const lowercasedEmail=credentials.email.toLowerCase()

        //create a new user in the db with all their info
        const result = await db.query(`
        INSERT INTO users (
            email,
            password,
            first_name,
            last_name,
            username,
            dob
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, password, first_name, last_name, username, dob, created_at;
    `,
    [lowercasedEmail, hashedPassword, credentials.firstName, credentials.lastName, credentials.userName, credentials.dob]
    )

        //return the user
        const user=result.rows[0]
        return User.makePublicUser(user)

        


    }
    
    static async fetchUserByEmail(email){
        if(!email){
            throw new BadRequestError("No email provided")
        }
        const query=`SELECT * FROM users WHERE email=$1`

        const result= await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }

    static async fetchUserByUserName(userName){
        if(!userName){
            throw new BadRequestError("No username provided")
        }
        const query=`SELECT * FROM users WHERE username=$1`

        const result= await db.query(query, [userName.toLowerCase()])

        const user = result.rows[0]

        return user
    }

    static async fetchUserByID(id){
        if(!id){
            throw new BadRequestError("No username provided")
        }
        const query=`SELECT * FROM users WHERE id=$1`

        const result= await db.query(query, [id])

        const user = result.rows[0]

        return user
    }
}

module.exports=User