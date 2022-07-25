/**
 * This file (Profile.js) handles information for the user profile functionality.
 * 
 *  
 */



//  All major imports here
const { yellow } = require("colors");
const express=require("express");
const { BadRequestError } = require("../utils/errors");
const router=express.Router();
const Profile = require('../models/profile')
const Recipe = require('../models/recipe')


/**
 *  GEt all recipes created by said user
 */
router.get("/owned/:profileId", async (req, res, next) => {
  try {
    //extract the profile Id from the url 
    const {profileId} = req.params

    // call the correct function
    const result = await Recipe.fetchAllRecipesByUserId(profileId);
    return res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
});


/**
 *  GEt all recipes saved by said user
 */
 router.get("/saved/:profileId", async (req, res, next) => {
  try {
    //extract the profile Id from the url 
    const {profileId} = req.params

    // call the correct function
    const result = await Recipe.fetchAllSavedRecipesByUserId(profileId);
    return res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
});

/**
 *  Get the profile basic information
 */
router.get("/:profileId", async (req, res, next) => {
  try{
    //extract the profile Id from the url 
    const {profileId} = req.params
    //get the user id from res.locals if they are logged in if not set user_id to null 
    const user_id = res.locals?.user ? res.locals?.user.user_id : null

    
    //call the required function
    const result = await Profile.getProfileInformation(profileId, user_id)

    //  return the answer
    res.status(200).json({result})
  }
  catch(err){
    next(err)
  }
  
})

module.exports=router