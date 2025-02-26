const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();



// ✅ Middleware
app.use(express.json()); // Parse JSON data from frontend
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cors()); // Allow frontend requests
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// ✅ Connect to SQLite Database (Creates 'carbon_footprint.db' if it doesn't exist)
const db = new sqlite3.Database("./carbon_footprint.db", (err) => {
    if (err) {
        console.error("❌ SQLite Connection Failed:", err);
    } else {
        console.log("✅ Connected to SQLite Database");
        // ✅ Create Table if it doesn't exist
        db.run(
            `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
            (err) => {
                if (err) console.error("❌ SQLite Table Creation Error:", err);
                else console.log("✅ Users Table Ready!");
            }
        );
    }
});

// ✅ API Route to Save Data
app.post("/submit-interest", (req, res) => {
    const { name, email } = req.body;

    // ✅ Check if data is missing
    if (!name || !email) {
        console.error("❌ Missing Data:", req.body);
        return res.status(400).json({ success: false, message: "Missing name or email" });
    }

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.run(sql, [name, email], function (err) {
        if (err) {
            console.error("❌ Error inserting data:", err);
            res.status(500).json({ success: false, message: "Database error" });
        } else {
            console.log("✅ Data inserted with ID:", this.lastID);
            res.json({ success: true, message: "Data saved successfully!" });
        }
    });
});

// ✅ API Route to Retrieve Data (Optional)
app.get("/get-users", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            console.error("❌ Error retrieving data:", err);
            res.status(500).json({ success: false, message: "Database error" });
        } else {
            res.json({ success: true, users: rows });
        }
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
