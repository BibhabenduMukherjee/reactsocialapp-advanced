require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express();
const User = require("./schema/user")

const dbConnection = require("./database/db")
app.disable("x-powered-by")
const PostModel = require("./schema/post");
const _protected = require("./middlewares/protected");
app.use(express.json());
app.use(cors())

app.use(require("./routes/register"))
app.use(require("./routes/login"))
app.use(require("./routes/createpost"))
app.use(require("./routes/imageupload"))
app.use(require("./routes/updateprofile"))
app.use(require("./routes/follow"))
app.use(require("./routes/unfollow"))
app.get("/" , (req,res)=>{
    res.send("OK")
})

app.use("/checkfollow/:id" ,  _protected, async(req, res)=>{
   const id = req.params.id;
   const userFollowingList = await User.findById({_id : req.user._id}).select("following")
   const stringList = userFollowingList.following.map((d)=>{
    return d.toString()
   })
   const result = stringList.find(user => user === id) ? stringList.find(user => user === id) : "notfind"
   res.send(result)
})


app.get("/posts" , async(req,res)=>{
  const result = await PostModel.find({}).populate("postuser" , "_id , user_name , profileImg");
  res.send(result)
})

  app.use("/specificuser/:id" , async(req,res)=>{
    const _id = req.params.id
   const result = await User.find({_id : _id});
    

    res.status(200).send(result)
  })



  app.get("/user" , async(req,res)=>{
    const result = await User.find({}).limit(5).sort("user_join")

    res.send(result)
  })

  app.get("/deletealluserandpost" , async(req,res)=>{
    const ur = await User.deleteMany({})
    const pr = await PostModel.deleteMany({})
    res.status(200).json({ur,pr})
  })

  app.get('/searchuser', async (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the URL parameter 'q'
    const items = await User.find({ user_name: { $regex: `^${searchQuery}`, $options: 'i' } }); // Search for items with a name that starts with the search query, case-insensitive
    res.status(200).send(items); // Return the search results as JSON
  });
  
app.post("/finduserposts" ,  async(req,res)=>{
  const postIds  = req.body.postId
  console.log(req.body)
  const result = await PostModel.find({_id : {$in : postIds}})
  //console.log(postIds)
  res.send(result)
})

dbConnection();

app.listen(3002,()=>{
     
    console.log("Server Listening.. 3002");
})