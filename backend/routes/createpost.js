
const express = require('express');
const router = express.Router();

const protected = require("../middlewares/protected")
const PostModel = require('../schema/post');
const User = require('../schema/user');

router.post("/createpost", protected, (req, res) => {
    const { description, image } = req.body;
    if (!description) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    req.user.password = undefined;
    const postObj = new PostModel({ description: description, image: image, created_at:Date.now(), postuser: req.user });
    postObj.save()
        .then((newPost) => {
            const u = req.user
            console.log(newPost)
            User.findByIdAndUpdate(u , {
                $push : {posts: newPost._id}
            }, {new:true})
            .then((record)=>{
                console.log("post is saved to users posts")

                res.status(201).json({ user: record , description : newPost.description , image : newPost.image});
               // console.log(record.posts)
            }).catch(err => console.log(err))
           // res.status(201).json({ post: newPost });
        })
        .catch((error) => {
            console.log(error);
        })
});





module.exports = router