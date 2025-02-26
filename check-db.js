const sqlite3 = require("sqlite3").verbose();

// ✅ Connect to SQLite Database
const db = new sqlite3.Database("./carbon_footprint.db", (err) => {
    if (err) {
        console.error("❌ Database Connection Failed:", err);
        return;
    }
    console.log("✅ Connected to SQLite Database");

    // ✅ Query all users
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            console.error("❌ Error retrieving data:", err);
        } else {
            if (rows.length === 0) {
                console.log("⚠️ No data found in the database.");
            } else {
                console.log("📌 Users in Database:");
                console.table(rows);
            }
        }
        db.close();
    });
});
