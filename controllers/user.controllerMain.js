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
            //req.cookies.token = token;
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

// Render index page with logged-in user
exports.indexPage = async (req, res) => {
    try {
        const token = req.session.token;
        //const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) return res.redirect('/login');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;

        const userQuery = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });

        const totalUsersQuery = await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total_users FROM users', (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_users);
            });
        });

        res.render('index', { user: userQuery, totalUsers: totalUsersQuery });
    } catch (error) {
        console.error('Error rendering index page:', error);
        res.status(500).send('Error rendering index page');
    }
};

// Render users page
exports.usersPage = async (req, res) => {
    try {
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
        res.render('users', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
};

// Render add user page
exports.addUserPage = (req, res) => res.render('add-user');

// Add a new user
exports.addUser = async (req, res) => {
    try {
        const { first_name, last_name, user_name, email, phone, user_role, is_active } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        await new Promise((resolve, reject) => {
            db.query('INSERT INTO users SET ?', { first_name, last_name, user_name, email, phone, user_role, is_active, photo, password }, (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        res.redirect('/users');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Error adding user');
    }
};

// Render edit user page
exports.editUserPage = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
        res.render('edit-user', { user });
    } catch (error) {
        console.error('Error fetching user for edit:', error);
        res.status(500).send('Error fetching user');
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, user_name, email, phone, user_role, is_active } = req.body;

        await new Promise((resolve, reject) => {
            db.query('UPDATE users SET ? WHERE id = ?', [{ first_name, last_name, user_name, email, phone, user_role, is_active }, id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        res.redirect('/users');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        res.redirect('/users');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
};

// Render user profile
exports.userProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
                if (err) reject(err);
                if (results.length === 0) reject(new Error('User not found'));
                resolve(results[0]);
            });
        });

        res.render('profile', { user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send(error.message || 'Error fetching user profile');
    }
};

// Dummy pages
exports.dummy1Page = (req, res) => res.render('SupplieReportPage', { message: 'Welcome to Dummy Page 1!' });
exports.dummy2Page = (req, res) => res.render('AddSuppliers', { message: 'Welcome to Dummy Page 2!' });
