const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../schema/user")
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY
const { body }  =  require("express-validator");
const {validationResult } =  require("express-validator");
router.post("/login" , [
    
        body("user_email").isEmail().withMessage("Email must be valid"),
        body("password")
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage("Password must be between 4 and 20 characters"),
      ],
async (req , res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       
         res.status(400).json({error : "Please check all fields are correct"})
      }else{
        const { user_email  , password} = req.body;
        // check provided email has already the database
       const findUser =await User.exists({user_email})
      
        if(findUser){
         const user = await User.find({user_email})
       
        const passwordMatchFlg =await bcrypt.compare(password , user[0].password)
         if(passwordMatchFlg){

            const token =  jwt.sign({_id : user[0]._id} , SECRET_KEY)
            res.status(200).json({result : {token,user:user[0]}})
   
         }else{
            res.status(400).json({error : "Wrong Password"})
         }
        
        }else{
      
        res.status(400).json({error : "Email does not exist"})
        }
       
      }
   
    // check for validation 


 
})


module.exports = router