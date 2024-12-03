//const bcrypt = require('bcryptjs');
const db = require('../db/db');
//const upload = require('../Middleware/upload');

/*
INSERT INTO `members` (`id`, `f_name`, `l_name`, `email`, 
`phone_no`, `nin`, `issued_card`, `gender`, `occupation`, 
`floor_type`, `shop_no`, `create_by`, `create_date`, `update_by`, `update_date`) 
VALUES (NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '')
*/
// Render suppliers page
exports.ninMember = async (req, res) => {
    try {
        const members = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM members', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
        res.render('ninMember', { members });
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).send('Error fetching members');
    }
};

// Render add members page
exports.addMemberPage = (req, res) => res.render('addMember');

//add member
exports.addMember = async (req, res) => {
    try {
        // File uploads
        //const photo = req.files && req.files.photo ? '../public/upload/${req.files.photo[0].filename}' : null;
        //const qr = req.files && req.files.qr ? '../public/upload/${req.files.qr[0].filename}' : null;

        // Extract other fields
        const {
            f_name, l_name, email,
            phone_no, nin, issued_card,
            gender, occupation, floor_type, shop_no
        } = req.body;

        // Insert into the database
        await new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO members SET ?',
                {
                    f_name,
                    l_name,
                    email,
                    phone_no,
                    nin,
                    issued_card,
                    gender,
                    occupation,
                    floor_type,
                    shop_no,
                    //photo,
                    //qr,
                },
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });

        res.redirect('/ninMember');
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).send('Error adding member');
    }
};


/*
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