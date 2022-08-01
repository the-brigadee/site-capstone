const express=require("express");
const {createUserJwt}=require("../utils/tokens")
const security=require("../middleware/security")
const router=express.Router();
const Review = require("../models/review")

router.get("/", async (req, res, next) => {
  try {
    const {recipe_id} = req.body
    const reviews = await Review.fetchAllReviewsByRecipeId(recipe_id);
    return res.status(200).json({ reviews });
  } catch (err) {
    next(err);
  }
});

router.post("/create",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const review = await Review.createReview(req.body);
    
    return res.status(200).json({ review });
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:reviewId",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId
    const review = await Review.deleteReview(reviewId)
    return res.status(201).json({ review })
} catch (err) {
    next(err)
}
});

module.exports=router;