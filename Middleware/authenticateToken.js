const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.session.token;
        //const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            console.error('No token provided. Redirecting to login.');
            return res.redirect('/login'); // Redirect if no token found
        }

        const user = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject(err); // Reject promise if verification fails
                } else {
                    resolve(decoded); // Resolve promise with decoded user info
                }
            });
        });

        req.user = user; // Attach user info to the request object
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error('Error authenticating token:', error.message);
        res.redirect('/login'); // Redirect to login if token is invalid or an error occurs
    }
};

module.exports = authenticateToken;
