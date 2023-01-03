const { createPost, reactPost, getPosts, getUserPosts } = require("../controllers/posts.controller");

const router = require("express").Router();

router.post("/create", createPost);
router.patch("/react", reactPost);
router.get("/all", getPosts);
router.get("/user/:userId", getUserPosts);

module.exports = router;