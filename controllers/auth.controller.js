const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    try {  
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            views
        } = req.body;

        const sault = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, sault);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            views
        });

        const savedUser = await newUser.save();

        res.json({
            success: true,
            data: savedUser
        });
    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.json({
                success: false,
                error: "User not found!"
            });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            res.json({
                success: false,
                error: "Wrong password!"
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        delete user.password;

        res.json({
            success: true,
            data: {
                token,
                user
            }
        });
    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
};


module.exports = {
    register,
    login
};