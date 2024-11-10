const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
//const db = require('../app.js');
const db = require('../models/db');

// Multer setup for file uploads
const upload = multer({ dest: 'public/uploads/' });

// Register route
router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
    const { first_name, last_name, user_name, email, phone, user_role, is_active, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { first_name, last_name, user_name, email, phone, user_role, is_active, password: hashedPassword };

    db.query('INSERT INTO users SET ?', user, (err, results) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

// Login route
router.get('/login', (req, res) => res.render('login'));
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0 || !await bcrypt.compare(password, results[0].password)) {
            return res.send('Invalid credentials');
        }
        const user = results[0];
        const token = jwt.sign({ id: user.id, role: user.user_role }, 'jwt_secret_key', { expiresIn: '1h' });
        req.session.token = token;
        res.redirect('/dashboard');
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Dashboard route
router.get('/dashboard', /*authenticateToken,*/ (req, res) => {
    db.query('SELECT * FROM users', (err, users) => {
        if (err) throw err;
        res.render('dashboard', { users });
    });
});

// Add user route
router.get('/add-user', /*authenticateToken,*/ (req, res) => res.render('add-user'));
router.post('/add-user', /*authenticateToken, upload.single('photo'),*/ (req, res) => {
    const { first_name, last_name, user_name, email, phone, user_role, is_active } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    db.query('INSERT INTO users SET ?', { first_name, last_name, user_name, email, phone, user_role, is_active, photo, password }, (err, results) => {
        if (err) throw err;
        res.redirect('/dashboard');
    });
});

// Edit user route
router.get('/edit-user/:id', /*authenticateToken,*/ (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, users) => {
        if (err) throw err;
        res.render('edit-user', { user: users[0] });
    });
});

router.post('/edit-user/:id', /*authenticateToken,*/ (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, user_name, email, phone, user_role, is_active } = req.body;
    db.query('UPDATE users SET ? WHERE id = ?', [{ first_name, last_name, user_name, email, phone, user_role, is_active }, id], (err) => {
        if (err) throw err;
        res.redirect('/dashboard');
    });
});

// Delete user route
router.get('/delete-user/:id', /*authenticateToken,*/ (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/dashboard');
    });
});

module.exports = router;
