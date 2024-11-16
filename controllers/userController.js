const bcrypt = require('bcryptjs');
const db = require('../db/db');

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
