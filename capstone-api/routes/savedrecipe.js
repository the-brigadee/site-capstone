const express=require("express");
const {createUserJwt}=require("../utils/tokens")
const security=require("../middleware/security")
const router=express.Router();
const SavedRecipe = require("../models/savedrecipe")


router.post("/create",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const savedrecipe = await SavedRecipe.createSavedRecipe(req.body);
  
    return res.status(200).json({ savedrecipe });
  } catch (err) {
    next(err);
  }
});

router.get("/",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user_id}=res.locals?.user
    const savedrecipe = await SavedRecipe.fetchAllSavedRecipesByUserId(user_id);
    return res.status(200).json({ savedrecipe });
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:savedrecipeId",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const savedrecipeId = req.params.savedrecipeId
    const savedrecipe = await SavedRecipe.deleteSavedRecipe(savedrecipeId)
    return res.status(201).json({ savedrecipe })
} catch (err) {
    next(err)
}
});


router.get("/:savedrecipeId", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    
      const savedrecipeId = req.params.savedrecipeId
      const savedrecipe = await SavedRecipe.fetchSavedRecipeById(savedrecipeId)
      return res.status(201).json({ savedrecipe })
  } catch (err) {
      next(err)
  }
})

module.exports=router;