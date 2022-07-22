/**
 * This file (Search.js) handles all search functionality.
 * 
 *  It does not require user authentication and therefore will be placed above  { app.use(security.extractUserFromJwt) within the app.js file}
 */



//  All major imports here
const { yellow } = require("colors");
const express=require("express");
const { BadRequestError } = require("../utils/errors");
const router=express.Router();
const Search = require('../models/search')

/**
 *  A route that handles search results from the search bar
 * 
 *  This routes accepts requests in the form [localhost:3001/search?searchtype=recipe&searchword=Chocolate%20pancake] where 
 * 
 * searchtype is either "recipe" or "users" ONLY (we can search for both recipe and users) 
 * 
 * searchword is the word searched e.g "searchword=panckake" or "searchword=chocolate%20pancake" (%20 is space)
 */
router.get("/", async function (req, res, next) {
  try {
    // extract the queries from url object from the url 
      const query =  req.query

    //   define the required request parameters 
      const requiredParameters = ["searchword", "searchtype"]
    //   Check if the required parameters are present or throw error
    requiredParameters.forEach(param => {
        if(query[param] === undefined || query[param] === null) {
            throw new BadRequestError(`${param} is needed to search`)
        }
    }
    )
    // Depending on the searchtype call the correct function

    var result = [];
    // If the searchtype is "recipe" search for recipe
    if(query["searchtype"] === "recipe"){
        // call the search function here
        result = await Search.searchRecipe(query["searchword"], query["filter"])
    } 
    // If the searchtype is "user" search for users
    else if (query["searchtype"] === "users"){
      //get the user id from res.locals if they are logged in if not set user_id to null 
      const user_id = res.locals?.user ? res.locals?.user.user_id : null
        // call the search function here
        result = await Search.searchUser(query["searchword"], user_id)
    }
    // the searchtype is invalid
    else{
        throw new BadRequestError("Searchtype is invalid!")
    }

        return res.status(200).json({result})
  } catch (err) {
      next(err)
  }
})

router.get("/recipes", async function (req, res, next) {
  try {
    // extract the queries from url object from the url 
    const query =  req.query

    //   define the required request parameters 
    const requiredParameters = ["category"]
    //   Check if the required parameters are present or throw error
    requiredParameters.forEach(param => {
        if(query[param] === undefined || query[param] === null) {
            throw new BadRequestError(`${param} is needed to retrieve`)
        }
    }
    )

    const result = await Search.getRecipeByCategory(query["category"])

    res.status(200).json({result})
  } catch (err) {
      next(err)
  }
})

module.exports=router;