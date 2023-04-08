const User = require("../schema/user")
const express = require('express');
const protected = require("../middlewares/protected");
const router = express.Router();


router.get("/unfollow/:id" , protected , async(req , res)=>{
    const _id = req.params.id;
    
    const result = await User.findByIdAndUpdate(_id , {
        $pull : {followers:req.user._id}
    },{new:true})

     await User.findByIdAndUpdate(req.user._id,  {
        $pull : {following : _id}
     },{new:true})

    console.log(result);
    res.send(result)

     


 })


module.exports = router