
 

const User = require("../schema/user")
const express = require('express');
const protected = require("../middlewares/protected");
const router = express.Router();

router.get("/follow/:id" , protected , async(req , res)=>{
    const _id = req.params.id;
    
    const result = await User.findByIdAndUpdate({_id : _id}, {
        $push : {followers:req.user._id}
    },{new:true})

     const user = req.user
     console.log(user)
   const a=  await User.findByIdAndUpdate(req.user._id,  {
        $push : {following : _id}
     },{new:true})

    console.log(result);
    res.send(result)

     


 })


module.exports = router