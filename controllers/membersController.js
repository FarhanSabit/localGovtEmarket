const db = require('../db/db');

// Render suppliers page
exports.ninMember = async (req, res) => {
    try {
        const {market_id, city_id, user_role} = req.user; // Assuming `req.user.market_id` contains the logged-in user's market ID

        if(user_role === 'admin') {
            const members = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM members WHERE city_id = ?', [city_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.render('ninMember', { members });
        } else {
            const members = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM members WHERE market_id = ?', [market_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.render('ninMember', { members });
        }
        
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).send('Error fetching members');
    }
};

// Render add members page
exports.addMemberPage = (req, res) => res.render('addMember');

// Add member
exports.addMember = async (req, res) => {
    try {
        const {
            f_name, l_name, email,
            phone_no, nin, issued_card,
            gender, occupation, floor_type, shop_no
        } = req.body;

        const loggedInUserId = req.user.id;
        const marketId = req.user.market_id;

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
                    market_id: marketId, // Set market ID
                    create_by: loggedInUserId, // Set logged-in user ID as create_by
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

// Render edit member page
exports.editMembersPage = async (req, res) => {
    try {
        const { id } = req.params;
        const marketId = req.user.market_id;

        const member = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM members WHERE id = ? AND market_id = ?', [id, marketId], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });

        res.render('editMember', { member });
    } catch (error) {
        console.error('Error fetching member for edit:', error);
        res.status(500).send('Error fetching member for edit');
    }
};

// Update an existing member
exports.updateMembers = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            f_name, l_name, email,
            phone_no, nin, issued_card,
            gender, occupation, floor_type, shop_no
        } = req.body;

        const loggedInUserId = req.user.id;
        const marketId = req.user.market_id;

        await new Promise((resolve, reject) => {
            db.query(
                'UPDATE members SET ?, update_date = NOW(), update_by = ? WHERE id = ? AND market_id = ?',
                [
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
                    },
                    loggedInUserId,
                    id,
                    marketId
                ],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });

        res.redirect('/ninMember');
    } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).send('Error updating member');
    }
};

// Delete a member
exports.deleteMembers = async (req, res) => {
    try {
        const { id } = req.params;
        const marketId = req.user.market_id;

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM members WHERE id = ? AND market_id = ?', [id, marketId], (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        res.redirect('/ninMember');
    } catch (error) {
        console.error('Error deleting Members:', error);
        res.status(500).send('Error deleting Members');
    }
};

// Render member profile
exports.MembersProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const marketId = req.user.market_id;

        const member = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM members WHERE id = ? AND market_id = ?', [id, marketId], (err, results) => {
                if (err) reject(err);
                if (results.length === 0) reject(new Error('Member not found'));
                resolve(results[0]);
            });
        });

        res.render('membersProfile', { member });
    } catch (error) {
        console.error('Error fetching Member profile:', error);
        res.status(500).send(error.message || 'Error fetching Member profile');
    }
};
