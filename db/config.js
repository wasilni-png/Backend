const pkg=require("pg");
const { Client } = pkg;
const { Client } = require('pg');

const db = new Client({
    user: 'roadrider_user',
    host: 'dpg-d4id4gbe5dus738pee90-a.frankfurt-postgres.render.com', 
    database: 'roadrider',
    password: '0DfLJeCXxlc79yUZtI5z7Iru1FtOt07D',
    port: 5432,
    ssl: { rejectUnauthorized: false } 
});

module.exports = db;

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

module.exports = db;