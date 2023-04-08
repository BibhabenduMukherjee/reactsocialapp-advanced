const express = require("express")
const router = express.Router();

const User = require("../schema/user")
// update user end-point 
router.put("/updateuserinfo/:id" , async(req,res)=>{

 const id = req.params.id;
 const requested_info = req.body.requested_update_data
 console.log(requested_info)
 const userInfo = await User.findOneAndUpdate({_id : id}, {
    $set : {user_name :requested_info.user_name , job : requested_info.job, education : requested_info.education , location : requested_info.location, profileImg :requested_info.profileImg }
 } , {
    new : true
 })
 res.send(userInfo)

})




module.exports  = router