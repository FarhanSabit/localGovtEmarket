const jwt = require('jsonwebtoken');

 const authenticateToken = (req, res, next) => {
    const token = req.session.token;
    if (!token) return res.redirect('/login');
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => { //jwt_secret_key
        if (err) return res.redirect('/login');
        req.user = user;
        next();
    });
};

module.exports = authenticateToken; 