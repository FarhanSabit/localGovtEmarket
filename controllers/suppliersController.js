const db = require('../db/db');

// Render suppliers page
exports.suppliersPage = async (req, res) => {
    try {
        const { market_id } = req.user; // Assuming req.user contains the market_id

        const suppliers = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM customer WHERE market_id = ?', [market_id], (err, results) => {
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
        const { market_id } = req.user; // Assuming req.user contains the market_id

        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        await new Promise((resolve, reject) => {
            db.query('INSERT INTO customer SET ?', { name, nin, phone_no, category, fc_no, mth_pay, market_id }, (err) => {
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

// Render edit suppliers page
exports.editSuppliersPage = async (req, res) => {
    try {
        const { id } = req.params;
        const { market_id } = req.user; // Assuming req.user contains the market_id

        const supplier = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM customer WHERE id = ? AND market_id = ?', [id, market_id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });

        res.render('editSuppliers', { supplier });
    } catch (error) {
        console.error('Error fetching Suppliers for edit:', error);
        res.status(500).send('Error fetching Suppliers');
    }
};

// Update an existing Suppliers
exports.updateSuppliers = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, nin, phone_no, category, fc_no, mth_pay } = req.body;
        const { market_id } = req.user; // Assuming req.user contains the market_id

        await new Promise((resolve, reject) => {
            db.query('UPDATE customer SET ? WHERE id = ? AND market_id = ?', [{ name, nin, phone_no, category, fc_no, mth_pay }, id, market_id], (err) => {
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

// Delete a supplier
exports.deleteSuppliers = async (req, res) => {
    try {
        const { id } = req.params;
        const { market_id } = req.user; // Assuming req.user contains the market_id

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM customer WHERE id = ? AND market_id = ?', [id, market_id], (err) => {
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

// Render supplier profile
exports.SuppliersProfile = async (req, res) => {
    try {
        const supplierId = req.params.id;
        const { market_id } = req.user; // Assuming req.user contains the market_id

        const supplier = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM customer WHERE id = ? AND market_id = ?', [supplierId, market_id], (err, results) => {
                if (err) reject(err);
                if (results.length === 0) reject(new Error('Suppliers not found'));
                resolve(results[0]);
            });
        });

        res.render('suppliersProfile', { supplier });
    } catch (error) {
        console.error('Error fetching Suppliers profile:', error);
        res.status(500).send(error.message || 'Error fetching Suppliers profile');
    }
};

/*
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

// Render edit user page
exports.editSuppliersPage = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM customer WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
        res.render('editSuppliers', { supplier });
    } catch (error) {
        console.error('Error fetching Suppliers for edit:', error);
        res.status(500).send('Error fetching Suppliers');
    }
};

// Update an existing Suppliers
exports.updateSuppliers = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, nin, phone_no, category, fc_no, mth_pay } = req.body;

        await new Promise((resolve, reject) => {
            db.query('UPDATE customer SET ? WHERE id = ?', [{ name, nin, phone_no, category, fc_no, mth_pay }, id], (err) => {
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
        const supplierId = req.params.id;
        const supplier = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM customer WHERE id = ?', [supplierId], (err, results) => {
                if (err) reject(err);
                if (results.length === 0) reject(new Error('Suppliers not found'));
                resolve(results[0]);
            });
        });

        res.render('suppliersProfile', { supplier });
    } catch (error) {
        console.error('Error fetching Suppliers profile:', error);
        res.status(500).send(error.message || 'Error fetching Suppliers profile');
    }
};
*/