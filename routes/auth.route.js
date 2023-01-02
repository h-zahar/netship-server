const { register, login } = require('../controllers/auth.controller');

const { upload } = require("../multer/multer.config");

const router = require("express").Router();

router.post("/register", upload.single("picture"), register);
router.post("/login", login);

module.exports = router;