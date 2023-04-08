
const jwt= require("jsonwebtoken");
const  SECRET_KEY  = process.env.SECRET_KEY
const User = require("../schema/user")


module.exports = (req , res , next) =>{
 const {authorization} = req.headers;
 if(!authorization){
    res.status(400).json({error : "Access not granted"})
 }else{
    const token = authorization.replace("Bearer " , "")
    console.log(token)
  jwt.verify(token , SECRET_KEY, (error, payload)=>{
    if(error){
      console.log("invalid")
        res.status(400).json({error : "Invalid Token Please Log in"})
    }else{
        const {_id} = payload
        //console.log(_id);
        User.findById({_id}).then((dbUser) =>{
            req.user = dbUser
            //console.log(dbUser)
            next()
             })
    }
  })
    

   
  
 }
}