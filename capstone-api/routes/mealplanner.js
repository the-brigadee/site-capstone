const express=require("express");
const {createUserJwt}=require("../utils/tokens")
const security=require("../middleware/security")
const router=express.Router();
const MealPlanner = require("../models/mealplanner");
const { route } = require("./auth");
const { BadRequestError } = require("../utils/errors");


router.post("/create",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const mealplanner = await MealPlanner.createMealPlanner(req.body);
    
    return res.status(200).json({ mealplanner });
  } catch (err) {
    next(err);
  }
});

router.get("/",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user_id}=res.locals?.user
    const mealplanner = await MealPlanner.fetchAllMealPlannersByUserId(user_id);
    return res.status(200).json({ mealplanner });
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:mealplannerId",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const mealplannerId = req.params.mealplannerId
    const mealplanner = await MealPlanner.deleteMealPlanner(mealplannerId)
    return res.status(201).json({ mealplanner })
} catch (err) {
    next(err)
}
});

router.delete("/deleteall",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user_id}=res.locals?.user
    const mealplanner = await MealPlanner.deleteAllMealPlanner(user_id)
    return res.status(201).json({ mealplanner })
} catch (err) {
    next(err)
}
});


router.get("/:mealplannerId", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
      const mealplannerId = req.params.mealplannerId
      const mealplanner = await MealPlanner.fetchMealPlannerById(mealplannerId)
      return res.status(201).json({ mealplanner })
  } catch (err) {
      next(err)
  }
})


router.get("/suggestion/:word", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
      const word = req.params.word
      const suggestions = await MealPlanner.suggestion(word)
      return res.status(200).json({suggestions})
  } catch (err) {
      next(err)
  }
})

router.get("/getid/:word", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
      const word = req.params.word
      const recipe_id = await MealPlanner.getRecipeIdByName(word)
      if(!recipe_id){
        throw new BadRequestError("Recipe Does not exist")
      }
      return res.status(200).json({recipe_id})
  } catch (err) {
      next(err)
  }
})



module.exports=router;