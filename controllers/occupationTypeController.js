const db = require('../db/db');

// Fetch all occupation types
exports.occupationType = async (req, res) => {
    try {
        const { market_id } = req.user; // Assuming req.user contains the market_id

        const occupations = await new Promise((resolve, reject) => {
            db.query(
                'SELECT ot.*, m.name AS market_name FROM occupation_type ot JOIN markets m ON ot.market_id = m.id WHERE ot.market_id = ?',
                [market_id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });

        res.render('occupationType', { occupations });
    } catch (error) {
        console.error('Error fetching occupation types:', error);
        res.status(500).send('Error fetching occupation types');
    }
};

// Render add occupation type page
exports.addoccupationTypePage = (req, res) => {
    res.render('addoccupationType');
};

// Add a new occupation type
exports.addOccupationType = async (req, res) => {
    try {
        const { occupation_name } = req.body;
        const { market_id, id: create_by } = req.user; // Assuming req.user contains market_id and user ID

        await new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO occupation_type SET ?',
                {
                    occupation_name,
                    market_id,
                    create_by,
                    create_date: new Date(),
                },
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });

        res.redirect('/occupationType');
    } catch (error) {
        console.error('Error adding occupation type:', error);
        res.status(500).send('Error adding occupation type');
    }
};

// Render edit occupation type page
exports.editOccupationTypePage = async (req, res) => {
    try {
        const { id } = req.params;
        const { market_id } = req.user; // Assuming req.user contains the market_id

        const occupation = await new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM occupation_type WHERE id = ? AND market_id = ?',
                [id, market_id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                }
            );
        });

        res.render('editOccupationType', { occupation });
    } catch (error) {
        console.error('Error fetching occupation type for edit:', error);
        res.status(500).send('Error fetching occupation type for edit');
    }
};

// Update an existing occupation type
exports.updateOccupationType = async (req, res) => {
    try {
        const { id } = req.params;
        const { occupation_name } = req.body;
        const { market_id, id: update_by } = req.user; // Assuming req.user contains market_id and user ID

        await new Promise((resolve, reject) => {
            db.query(
                'UPDATE occupation_type SET ?, update_by = ?, update_date = ? WHERE id = ? AND market_id = ?',
                [
                    { occupation_name },
                    update_by,
                    new Date(),
                    id,
                    market_id,
                ],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });

        res.redirect('/occupationType');
    } catch (error) {
        console.error('Error updating occupation type:', error);
        res.status(500).send('Error updating occupation type');
    }
};

// Delete an occupation type
exports.deleteOccupationType = async (req, res) => {
    try {
        const { id } = req.params;
        const { market_id } = req.user; // Assuming req.user contains the market_id

        await new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM occupation_type WHERE id = ? AND market_id = ?',
                [id, market_id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });

        res.redirect('/occupationType');
    } catch (error) {
        console.error('Error deleting occupation type:', error);
        res.status(500).send('Error deleting occupation type');
    }
};

// Render occupation type profile
exports.occupationTypeProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { market_id } = req.user; // Assuming req.user contains the market_id

        const occupation = await new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM occupation_type WHERE id = ? AND market_id = ?',
                [id, market_id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                }
            );
        });

        res.render('occupationTypeProfile', { occupation });
    } catch (error) {
        console.error('Error fetching occupation type profile:', error);
        res.status(500).send('Error fetching occupation type profile');
    }
};

/*
const db = require('../db/db');

exports.occupationType = async (req, res) => {
    try {
        const occupations = await new Promise((resolve, reject) => {
            db.query('SELECT ot.*, m.name as market_name FROM occupation_type ot, markets m where ot.market_id = m.id', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
        res.render('occupationType', { occupations });
    } catch (error) {
        console.error('Error fetching occupation types:', error);
        res.status(500).send('Error fetching occupation types');
    }
};

exports.addoccupationTypePage = (req, res) => {
    res.render('addoccupationType');
};

exports.addOccupationType = async (req, res) => {
    try {
        const { occupation_name } = req.body;
        await new Promise((resolve, reject) => {
            db.query('INSERT INTO occupation_type SET ?', { occupation_name }, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
        res.redirect('/occupationType');
    } catch (error) {
        console.error('Error adding occupation type:', error);
        res.status(500).send('Error adding occupation type');
    }
};

exports.editOccupationTypePage = async (req, res) => {
    try {
        const { id } = req.params;
        const occupation = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM occupation_type WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
        res.render('editOccupationType', { occupation });
    } catch (error) {
        console.error('Error fetching occupation type for edit:', error);
        res.status(500).send('Error fetching occupation type for edit');
    }
};

exports.updateOccupationType = async (req, res) => {
    try {
        const { id } = req.params;
        const { occupation_name } = req.body;
        await new Promise((resolve, reject) => {
            db.query('UPDATE occupation_type SET ? WHERE id = ?', [{ occupation_name }, id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
        res.redirect('/occupationType');
    } catch (error) {
        console.error('Error updating occupation type:', error);
        res.status(500).send('Error updating occupation type');
    }
};

exports.deleteOccupationType = async (req, res) => {
    try {
        const { id } = req.params;
        await new Promise((resolve, reject) => {
            db.query('DELETE FROM occupation_type WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
        res.redirect('/occupationType');
    } catch (error) {
        console.error('Error deleting occupation type:', error);
        res.status(500).send('Error deleting occupation type');
    }
};

exports.occupationTypeProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const occupation = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM occupation_type WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
        res.render('occupationTypeProfile', { occupation });
    } catch (error) {
        console.error('Error fetching occupation type profile:', error);
        res.status(500).send('Error fetching occupation type profile');
    }
};
*/