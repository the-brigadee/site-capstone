const express=require("express");
const {createUserJwt}=require("../utils/tokens")
const security=require("../middleware/security")
const router=express.Router();
const Follow = require("../models/follow")


router.post("/create",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const follow = await Follow.createFollow(req.body);
    return res.status(201).json({ follow });
  } catch (err) {
    next(err);
  }
});

router.get("/",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user_id}=res.locals?.user
    const follow = await Follow.fetchAllFollowsByUserId(user_id);
    return res.status(200).json({ follow });
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:followId",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user_id}=res.locals?.user
    const followId = req.params.followId
    const follow = await Follow.deleteFollow(user_id, followId)
    return res.status(201).json({ follow })
} catch (err) {
    next(err)
}
});

router.get("/:followId", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
      const {user_id}=res.locals?.user
      const followId = req.params.followId
      const follow = await Follow.fetchFollowById(user_id, followId)
      return res.status(201).json({ follow })
  } catch (err) {
      next(err)
  }
})

module.exports=router;