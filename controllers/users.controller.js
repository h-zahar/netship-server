const User = require("../models/User");

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.json({
                success: false,
                error: "User not found!"
            });
        }
        res.json({
            success: true,
            data: user
        });

    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
};

const getFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.json({
                success: false,
                error: "User not found!"
            });
        }
        const friends = friends.map(id => User.findById(id));

        await Promise.all(friends);

        res.json({
            success: true,
            data: friends
        });
    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
};
const updateFriendship = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);

        if (!user) {
            res.json({
                success: false,
                error: "User not found!"
            });
        }

        const friend = await User.findById(friendId);

        if (!friend) {
            res.json({
                success: false,
                error: "Friend not found!"
            });
        }

        const isFriend = user.friends.includes(friendId);

        if (isFriend) {
            user.friends = user.friends.filter(id => id !== friendId);

            friend.friends = friend.friends.filter(userId => userId !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        res.json({
            success: true,
            data: user.friends
        });

    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
};

module.exports = {
    getUser,
    getFriends,
    updateFriendship
};