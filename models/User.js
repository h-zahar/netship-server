const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    location: {
        type: String,
        default: ""
    },
    occupation: {
        type: String,
        default: ""
    },
    views: {
        type: Number,
        default: 0
    },
    impressions: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;