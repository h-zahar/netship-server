const router = require("express").Router();

const authRoutes = require("./auth.route");
const userRoutes = require("./users.route");
const postRoutes = require("./posts.route");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;