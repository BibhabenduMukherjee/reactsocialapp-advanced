const express= require("express")
const router = express.Router();




const User = require("../schema/user")
const bcrypt = require('bcrypt');
const { body }  =  require("express-validator");
const {validationResult } =  require("express-validator");
router.post("/register" , [
    
        body("user_email").isEmail().withMessage("Email must be valid"),
        body("password")
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage("Password must be between 4 and 20 characters"),
      ],
async (req , res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
         res.status(400).json({error : "Please check all fields are correct or should not empty"})
      }else{
        const {user_name , user_email , password} = req.body;
        // check provided email has already the database
       const findUser =await User.exists({ user_email})
      
        if(findUser){
         return res.status(400).json({error : "Email already exist"})
        }else{
        const hashedPassword = await bcrypt.hash(password,10)
        const userData = {
            user_name,
            user_email,
          userjoin:Date.now(),
          password : hashedPassword
        }
        console.log(userData)

        const user = new User(userData)
        await user.save()
        res.status(201).json({result : "user saved"})
        }
       
      }
   
    // check for validation 


 
})


module.exports = router


