const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    
    body: {
        type: String,
        required: true 
    },

    author: {
        type: String,
        required: true
    },   

    post: {
        type: Schema.Types.ObjectId,
        ref: 'post' 
    },

    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'user' 
    },

    createdDate: {
        type: Date,
        default: Date.now,
    }

})

const Comment = mongoose.model("comment", CommentSchema)
module.exports = Comment