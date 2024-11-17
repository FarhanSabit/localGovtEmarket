//const bcrypt = require('bcryptjs');
const db = require('../db/db');

// Render suppliers page
exports.suppliersPage = async (req, res) => {
    try {
        const suppliers = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM customer', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
        res.render('SupplieReportPage', { suppliers });
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).send('Error fetching suppliers');
    }
};

// Render add suppliers page
exports.addSuppliersPage = (req, res) => res.render('AddSuppliers');

// Add a new Suppliers
exports.addSuppliers = async (req, res) => {
    try {
        const { name, nin, phone_no, category, fc_no, mth_pay } = req.body;
        //const password = await bcrypt.hash(req.body.password, 10);
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        await new Promise((resolve, reject) => {
            db.query('INSERT INTO customer SET ?', { name, nin, phone_no, category, fc_no, mth_pay }, (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        res.redirect('/SupplieReportPage');
    } catch (error) {
        console.error('Error adding Suppliers:', error);
        res.status(500).send('Error adding Suppliers');
    }
};
/*
// Render edit user page
exports.editSuppliersPage = async (req, res) => {
    try {
        const { id } = req.params;
        const Suppliers = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
        res.render('edit-user', { Suppliers });
    } catch (error) {
        console.error('Error fetching Suppliers for edit:', error);
        res.status(500).send('Error fetching Suppliers');
    }
};

// Update an existing Suppliers
exports.updateSuppliers = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, user_name, email, phone, user_role, is_active } = req.body;

        await new Promise((resolve, reject) => {
            db.query('UPDATE customer SET ? WHERE id = ?', [{ first_name, last_name, user_name, email, phone, user_role, is_active }, id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        res.redirect('/SupplieReportPage');
    } catch (error) {
        console.error('Error updating Suppliers:', error);
        res.status(500).send('Error updating Suppliers');
    }
};

// Delete a user
exports.deleteSuppliers = async (req, res) => {
    try {
        const { id } = req.params;

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM customer WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        res.redirect('/SupplieReportPage');
    } catch (error) {
        console.error('Error deleting Suppliers:', error);
        res.status(500).send('Error deleting Suppliers');
    }
};

// Render user profile
exports.SuppliersProfile = async (req, res) => {
    try {
        const SuppliersId = req.params.id;
        const Suppliers = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM customer WHERE id = ?', [SuppliersId], (err, results) => {
                if (err) reject(err);
                if (results.length === 0) reject(new Error('Suppliers not found'));
                resolve(results[0]);
            });
        });

        res.render('profile', { Suppliers });
    } catch (error) {
        console.error('Error fetching Suppliers profile:', error);
        res.status(500).send(error.message || 'Error fetching Suppliers profile');
    }
};*/
