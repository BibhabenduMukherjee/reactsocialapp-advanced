const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
   
    likes: [
        {
            type: ObjectId,
            ref: "user"
        }
    ],
    comments: [
        {
            commentText: String,
            created_at : {
                type : Date,
                default : Date.now()
            },
            commentedBy: { type: ObjectId, ref: "user" }
        }
    ],
    image: {
        type: String,
        
    },
    created_at : {
        type : Date,
        default : Date.now()
    }
    ,
    postuser: {
        type: ObjectId,
        ref: "user"
    }
});

const PostModel = mongoose.model("PostModel", postSchema);
module.exports = PostModel