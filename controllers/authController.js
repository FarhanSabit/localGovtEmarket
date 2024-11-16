const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

// Render registration page
exports.registerPage = (req, res) => res.render('register');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { first_name, last_name, user_name, email, phone, user_role, is_active, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { first_name, last_name, user_name, email, phone, user_role, is_active, password: hashedPassword };

        db.query('INSERT INTO users SET ?', user, (err) => {
            if (err) throw err;
            res.redirect('/login');
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
};

// Render login page
exports.loginPage = (req, res) => res.render('login');

// Handle user login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err || results.length === 0 || !await bcrypt.compare(password, results[0].password)) {
                return res.status(401).send('Invalid credentials');
            }
            const user = results[0];
            const token = jwt.sign({ id: user.id, role: user.user_role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            req.session.token = token;
            res.redirect('/index');
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
};

// Handle user logout
exports.logoutUser = (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).send('Error logging out user');
    }
};
