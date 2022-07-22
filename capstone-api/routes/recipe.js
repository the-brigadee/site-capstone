const express=require("express");
const security=require("../middleware/security")
const router=express.Router();
const Recipe = require("../models/recipe")



router.get("/random", async function (req, res, next) {
  try {
      const recipes = await Recipe.getRecommendedRecipes()
      return res.status(201).json({ recipes })
  } catch (err) {
      next(err)
  }
})

router.get("/:recipeId", async function (req, res, next) {
  try {
      const recipeId = req.params.recipeId
      const recipe = await Recipe.fetchRecipeById(recipeId)
      return res.status(201).json({ recipe })
  } catch (err) {
      next(err)
  }
})

router.post("/create",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    // take the users email and password and create a new user in our database
    const recipe = await Recipe.createRecipe(req.body);
  
    return res.status(200).json({ recipe });
  } catch (err) {
    next(err);
  }
});

router.get("/",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user_id}=res.locals?.user
    const recipe = await Recipe.fetchAllRecipesByUserId(user_id);
    return res.status(200).json({ recipe });
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:recipeId",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId
    const recipe = await Recipe.deleteRecipe(recipeId)
    return res.status(201).json({ recipe })
} catch (err) {
    next(err)
}
});





module.exports=router;