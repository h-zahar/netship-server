const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        let token = req.header('authorization');
        if (!token) {
            res.json({
                success: false,
                error: "Access denied!"
            });
        };
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.JWT_SECRET, (error, verified) => {
            if (error) {
                res.json({
                    success: false,
                    error: "Invalid token!"
                });
            }
            req.user = verified;
            next();
        });
    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
}

module.exports = verifyToken;