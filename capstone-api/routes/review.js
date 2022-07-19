const express=require("express");
const {createUserJwt}=require("../utils/tokens")
const security=require("../middleware/security")
const router=express.Router();
const Review = require("../models/review")


router.post("/create",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const review = await Review.createReview(req.body);
    console.log(review);
    return res.status(200).json({ review });
  } catch (err) {
    next(err);
  }
});

router.post("/",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user_id}=res.locals?.user
    const review = await Review.fetchAllReviewsByUserId(user_id);
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


router.get("/:reviewId", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
      const reviewId = req.params.reviewId
      const review = await Review.fetchReviewById(reviewId)
      return res.status(201).json({ review })
  } catch (err) {
      next(err)
  }
})

module.exports=router;