const express=require("express");
const {createUserJwt}=require("../utils/tokens")
const security=require("../middleware/security")
const router=express.Router();
const MealPlanner = require("../models/mealplanner")


router.post("/create",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const mealplanner = await MealPlanner.createMealPlanner(req.body);
    console.log(mealplanner);
    return res.status(200).json({ mealplanner });
  } catch (err) {
    next(err);
  }
});

router.post("/",security.requireAuthenticatedUser, async (req, res, next) => {
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

module.exports=router;