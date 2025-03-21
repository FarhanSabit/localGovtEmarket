const bcrypt = require('bcryptjs');
const db = require('../db/db');
const jwt = require('jsonwebtoken');

// Render users page
exports.usersPage = async (req, res) => {

    const { city_id, user_role } = req.user;
    const marketIds = req.session.marketIds;
    // console.log("Received marketId:", marketIds);
    
    try {

        const token = req.session.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const marketId = decoded.market_id;

        let users, query, params;
        
        if (user_role === 'admin') {

            if (marketIds) {
                query = 'SELECT * FROM users WHERE market_id = ?';
                params = [marketIds];
            } else {
                query = 'SELECT * FROM users WHERE city_id = ?';
                params = [city_id];
            }

    } else {
        query = 'SELECT * FROM users WHERE market_id = ?';
        params = [marketId];
    
    }
    users = await new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
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
        const token = req.session.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const marketId = decoded.market_id;

        const { first_name, last_name, user_name, email, phone, user_role, is_active } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        await new Promise((resolve, reject) => {
            db.query('INSERT INTO users SET ?', { first_name, last_name, user_name, email, phone, user_role, is_active, photo, password, market_id: marketId }, (err) => {
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
        const token = req.session.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const marketId = decoded.market_id;

        const { id } = req.params;
        const user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ? AND market_id = ?', [id, marketId], (err, results) => {
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
        const token = req.session.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const marketId = decoded.market_id;

        const { id } = req.params;
        const { first_name, last_name, user_name, email, phone, user_role, is_active } = req.body;

        await new Promise((resolve, reject) => {
            db.query('UPDATE users SET ? WHERE id = ? AND market_id = ?', [{ first_name, last_name, user_name, email, phone, user_role, is_active }, id, marketId], (err) => {
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
        const token = req.session.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const marketId = decoded.market_id;

        const { id } = req.params;

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM users WHERE id = ? AND market_id = ?', [id, marketId], (err) => {
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
        const token = req.session.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const marketId = decoded.market_id;

        const userId = req.params.id;
        const user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ? AND market_id = ?', [userId, marketId], (err, results) => {
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

/*
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
*/