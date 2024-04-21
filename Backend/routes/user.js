const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require('../models/user')


router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password,10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
    
    user.save().then(() => {
        res.status(201).json({message:"User Created"});
    }).catch(err => {
        res.status(500).json(err)
    })
})
})
router.get("/signup",(req,res,next)=>{
    User.find().then(documents => {
        res.status(200).json({
            message: "Users fetched successfully!",
            users: documents
        });
    });
})

// router.post("/login",(res,req,next)=>{
//     let fetchedUser;
//     User.find({email:req.body.email}).then((user)=>{
//         console.log(user)
//         fetchedUser=user
//         if(!user){
//            return res.status(401).json({message:"Auth Failed"})
//         }
//         return bcrypt.compare(req.body.password,user.password)
        
//     })
//     .catch(err=>{
//         res.status(500).json({message:err})
//     })
//     .then(result=>{
//         if(!result){
//             res.status(401).json({message:"Auth Failed"})
//         }
//         const token=jwt.sign({email:fetchedUser.email,userid:fetchedUser._id},"secret_should_be_Anonymous",
//         {expiresIn:"1h"})
//     })
//     .catch(()=>{   
//         res.status(401).json({message:"Auth Failed"})
//     })
// })
router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router