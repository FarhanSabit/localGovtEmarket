const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

// Render registration page with markets
exports.registerPage = (req, res) => {
    // Fetch markets from the database
    db.query('SELECT id, name FROM markets WHERE is_active = 1', (err, markets) => {
        if (err) {
            console.error('Error fetching markets:', err);
            return res.status(500).send('Error fetching markets');
        }

        // Render the registration page with markets data
        res.render('register', { markets, error: '' });
        //res.render('login', { markets, email: '', market_id: '', error: '' });
    });
};

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { first_name, last_name, user_name, email, phone, user_role, is_active, password, market_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        // Check if email already exists
        const existingUser = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });

        if (existingUser) {
            //return res.status(400).send('Email is already in use.');
            return res.status(401).render('register', { error: 'Email is already in use.', markets: [] });
        }

        const user = { first_name, last_name, user_name, email, phone, user_role, is_active, password: hashedPassword, market_id };

        db.query('INSERT INTO users SET ?', user, (err) => {
            if (err) throw err;
            res.redirect('/login');
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
};


// Render login page with active markets
exports.loginPage = (req, res) => {
    // Fetch markets from the database
    db.query('SELECT id, name FROM markets WHERE is_active = 1', (err, markets) => {
        if (err) {
            console.error('Error fetching markets:', err);
            return res.status(500).send('Error fetching markets');
        }

        // Render the login page with markets data and empty error message
        res.render('login', { markets, email: '', market_id: '', error: '' });
    });
};

// Handle user login
exports.loginUser = async (req, res) => {
    try {
        const { email, password, market_id } = req.body;

        // Query to find user by email
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send('Internal server error');
            }

            // Check if user exists
            if (results.length === 0) {
                return res.status(401).render('login', { error: 'Invalid credentials', email, market_id, markets: [] });
            }

            const user = results[0];

            // Check if the password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).render('login', { error: 'Invalid credentials', email, market_id, markets: [] });
            }

            /*
            // Check if market_id matches the user's assigned market_id
            if (user.market_id !== parseInt(market_id)) {
                return res.status(401).render('login', { error: 'You have selected the wrong market', email, market_id, markets: [] });
            }
            */

            // Generate JWT token
            const token = jwt.sign({ id: user.id, role: user.user_role, market_id: user.market_id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            // Store token in session
            req.session.token = token;
            console.log('Token:', token);

            // Redirect to the index page or any other page after successful login
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
