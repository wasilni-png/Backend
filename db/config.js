const pkg = require("pg");
const { Client } = pkg;

// يتم استخدام process.env لقراءة القيم من Render Environment Variables
const db = new Client({
    host: process.env.PGHOST,
    port: 5432, // يمكنك ترك المنفذ 5432 أو جعله أيضاً متغير بيئة إذا لزم الأمر
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
});

db.connect((err, client) => {
    if (err) {
        console.error("Connection error to PostgreSQL:", err.message);
        process.exit(1);
    }
    console.log("Connected to PostgreSQL successfully!");
});

module.exports = db;