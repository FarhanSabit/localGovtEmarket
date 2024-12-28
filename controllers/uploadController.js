const xlsx = require("xlsx");
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
    const expectedHeaders = ["name", "nin", "phone_no", "category", "fc_no", "mth_pay", "market_id"];
    const fileHeaders = Object.keys(sheet[0]);
    const mismatchedHeaders = expectedHeaders.filter(header => !fileHeaders.includes(header));

    if (mismatchedHeaders.length > 0) {
      return res.status(400).json({ error: `Mismatched columns: ${mismatchedHeaders.join(", ")}` });
    }

    // Validate rows
    const errors = [];
    const validRows = [];
    const loggedInUser = req.session.userId; // Replace with your session user ID logic

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
          create_by: loggedInUser,
          create_date: new Date(),
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
      (name, nin, phone_no, category, fc_no, mth_pay, market_id, create_by, create_date)
      VALUES ?
    `;
    const values = validRows.map(row => Object.values(row));
    await db.query(query, [values]);

    //res.status(200).json({ message: "File processed successfully!", rowsInserted: validRows.length });
  } catch (err) {
    console.error("Error during file upload:", err); // Log the full error
    res.status(500).json({ error: "Internal server error", details: err.message });
}
};

module.exports = { uploadController };
