const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema ( {

    body: {
        type: String,
        required: true 
    },

    title: { 
        type: String,
        required: true 
    },

    user: { 
        type: Schema.Types.ObjectId,
        ref: 'user' 
    },
    
    createdDate: {
        type: Date,
        default: Date.now,
    },

} )

const Post = mongoose.model("post", PostSchema)
module.exports = Post