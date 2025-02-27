const xlsx = require("xlsx");
const db = require("../db/db");

// Upload Controller
const uploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required!" });
    }

    // Parse the uploaded Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });

    // Define expected column headers based on the `customer` table
    const expectedHeaders = [
      "name", "nin", "phone_no", "category", "lock_up_number", "fc_no", "division",
      "parish", "village", "street", "nature_of_market", "total_paid", "balance",
      "municipality", "mth_pay", "market_id", "sex", "fc_type", "is_active"
    ];

    // Validate headers in the uploaded file
    const fileHeaders = Object.keys(sheet[0]);
    const mismatchedHeaders = expectedHeaders.filter(header => !fileHeaders.includes(header));

    if (mismatchedHeaders.length > 0) {
      return res.status(400).json({ error: `Mismatched columns: ${mismatchedHeaders.join(", ")}` });
    }

    // Validate rows
    const errors = [];
    const validRows = [];
    const loggedInUserId = req.user.id; // Get the logged-in user's ID

    sheet.forEach((row, index) => {
      const rowErrors = [];

      if (!row.market_id) rowErrors.push("market_id cannot be null");
      //if (!row.name) rowErrors.push("name is required");
      //if (!row.phone_no) rowErrors.push("phone_no is required");

      // Add more validations if needed
      if (rowErrors.length > 0) {
        errors.push({ row: index + 1, errors: rowErrors });
      } else {
        validRows.push({
          name: row.name,
          nin: row.nin,
          phone_no: row.phone_no,
          category: row.category,
          lock_up_number: row.lock_up_number,
          fc_no: row.fc_no,
          division: row.division,
          parish: row.parish,
          village: row.village,
          street: row.street,
          nature_of_market: row.nature_of_market,
          total_paid: row.total_paid,
          balance: row.balance,
          municipality: row.municipality,
          mth_pay: row.mth_pay,
          market_id: row.market_id,
          create_by: loggedInUserId,
          create_date: new Date(),
          update_by: loggedInUserId,
          update_date: new Date(),
          is_active: row.is_active ?? 1, // Default to active if not provided
          sex: row.sex,
          fc_type: row.fc_type,
        });
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ error: "Validation failed", details: errors });
    }

    // Insert valid rows into the `customer` table
    const query = `
      INSERT INTO customer 
      (name, nin, phone_no, category, lock_up_number, fc_no, division, parish, village, street, 
      nature_of_market, total_paid, balance, municipality, mth_pay, market_id, create_by, create_date, 
      update_by, update_date, is_active, sex, fc_type)
      VALUES ?
    `;
    
    const values = validRows.map(row => Object.values(row));
    await db.query(query, [values]);

    res.status(200).json({
      message: "File processed successfully!",
      rowsInserted: validRows.length
    });

  } catch (err) {
    console.error("Error during file upload:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

module.exports = { uploadController };


/*const xlsx = require("xlsx");
const db = require('../db/db');


// Upload Controller
const uploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required!" });
    }

    // Parse the file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });

    // Check headers
    const expectedHeaders = ["name", "nin", "phone_no", "category", "fc_no", "mth_pay", "market_id","is_active","sex","fc_type"];
    const fileHeaders = Object.keys(sheet[0]);
    const mismatchedHeaders = expectedHeaders.filter(header => !fileHeaders.includes(header));

    if (mismatchedHeaders.length > 0) {
      return res.status(400).json({ error: `Mismatched columns: ${mismatchedHeaders.join(", ")}` });
    }

    // Validate rows
    const errors = [];
    const validRows = [];
    const loggedInUserId = req.user.id; // Replace with your session user ID logic

    sheet.forEach((row, index) => {
      const rowErrors = [];
      if (row.market_id == null) rowErrors.push("market_id cannot be null");

      // Add more validations if required
      if (rowErrors.length > 0) {
        errors.push({ row: index + 1, errors: rowErrors });
      } else {
        validRows.push({
          name: row.name,
          nin: row.nin,
          phone_no: row.phone_no,
          category: row.category,
          fc_no: row.fc_no,
          mth_pay: row.mth_pay,
          market_id: row.market_id,
          create_by: loggedInUserId,
          create_date: new Date(),
          is_active: 1,
          sex: row.sex,
          fc_type: row.fc_type,
        });
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ error: "Validation failed", details: errors });
    }

    // Insert valid rows into the database
    //const db = req.app.locals.db; // Use your existing database connection
    const query = `
      INSERT INTO customer 
      (name, nin, phone_no, category, fc_no, mth_pay, market_id, create_by, create_date,is_active,sex,fc_type)
      VALUES ?
    `;
    const values = validRows.map(row => Object.values(row));
    await db.query(query, [values]);

    res.status(200).json({ message: "File processed successfully!", rowsInserted: validRows.length });
  } catch (err) {
    console.error("Error during file upload:", err); // Log the full error
    res.status(500).json({ error: "Internal server error", details: err.message });
}
};

module.exports = { uploadController };
*/