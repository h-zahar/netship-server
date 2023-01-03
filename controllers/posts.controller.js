const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
    try {
        const { 
            userId, 
            content, 
            picturePath 
        } = req.body;
    
        const user = await User.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                error: "User not found"
            });
        }

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            content,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });

        const savedPost = await newPost.save();

        res.json({
            success: true,
            data: savedPost
        })
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
};

const reactPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(id);

        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await post.findByIdAndUpdate(
            id,
            {
                likes: post.likes
            },
            {
                new: true
            }
        );

        res.json({
            success: true,
            data: updatedPost
        })
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.json({
            success: true,
            data: posts
        })
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        const userPosts = await Post.findOne({ userId });

        res.json({
            success: true,
            data: userPosts
        })
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
};

module.exports = {
    createPost,
    getPosts,
    getUserPosts
}