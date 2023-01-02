const { getUser, getFriends, updateFriendship } = require("../controllers/users.controller");
const verifyToken = require("../middleware/auth");

const router = require("express").Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getFriends);

router.patch("/:id/:friendId", verifyToken, updateFriendship);

module.exports = router;