
const pkg=require("pg");
const { Client } = pkg;

const db = new Client({
  host: "localhost",
  port: 5432,
  database: "RoadRider",
  user: "postgres",
  password: "12345",
});

db.connect((err, client) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL!");
});

const { Client } = require('pg');

// يجب إزالة هذا السطر إذا كنت تستخدم Hardcoding
// require('dotenv').config(); 

const db = new Client({
    user: 'roadrider_user',
    host: 'dpg-d4id4gbe5dus738pee90-a.frankfurt-postgres.render.com', 
    database: 'roadrider',
    password: '0DfLJeCXxlc79yUZtI5z7Iru1FtOt07D',
    port: 5432,
    // 🔑 هذا السطر ضروري جداً للاتصال الآمن بـ Render
    ssl: { rejectUnauthorized: false } 
});

module.exports = db;