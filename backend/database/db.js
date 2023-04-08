const mongoose = require("mongoose")
mongoose.set('strictQuery', true)

function dbConnection(){

    try{
        mongoose.connect('mongodb://127.0.0.1:27017/socialalkido');
    
        const db = mongoose.connection
       
        db.on("error" , console.error.bind(console , "Connection error"))
        db.once("open" , function(){
            console.log("connected successfully")
        })
    
    }catch(err){
        console.log(err)
    }
  
}

module.exports=dbConnection