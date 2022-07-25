const express=require("express");
const {createUserJwt}=require("../utils/tokens")
const security=require("../middleware/security")
const router=express.Router();
const User = require("../models/user")

router.post("/login", async(req,res,next)=>{
    try{
        const user=await User.login(req.body)
        const token=createUserJwt(user)
        return res.status(200).json({ user,token })

    }catch(err){
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
      // take the users email and password and create a new user in our database
      const user = await User.register(req.body);
      const token=createUserJwt(user)
      return res.status(201).json({ user,token });
    } catch (err) {
      next(err);
    }
  });

router.delete("/delete", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    // take the users email and password and create a new user in our database
    const user = await User.delete(req.body);
    return res.status(200).json({ user});
  } catch (err) {
    next(err);
  }
});

router.put("/update", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    // take the users email and password and create a new user in our database
    const user = await User.updateProfile(req.body);
    return res.status(200).json({user});
  } catch (err) {
    next(err);
  }
});

router.put("/update/password", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    // take the users email and password and create a new user in our database
    const user = await User.updatePassword(req.body);
    return res.status(200).json({user});
  } catch (err) {
    next(err);
  }
});

router.get("/me",security.requireAuthenticatedUser, async(req,res,next)=>{
  try{
    const{email}=res.locals.user
    const user=await User.fetchUserByEmail(email)
    const publicUser= await User.makePublicUser(user)
    const details = await User.getUserSideProfileDetails(user.id)
    return res.status(200).json({user:publicUser, details: details});
  }catch(err){
    next(err)
  }
})

module.exports=router;