const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        required: true,
        min: 1,
        max: 1000
    },
    picturePath: {
        type: String,
        default: ""
    },
    userPicturePath: {
        type: String,
        default: ""
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;