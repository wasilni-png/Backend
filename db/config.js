
const pkg=require("pg");
const { Client } = pkg;

5 const db = new Client({
6   host: process.env.PGHOST,
7   port: process.env.PGPORT || 5432, // المنفذ
8   database: process.env.PGDATABASE,
9   user: process.env.PGUSER,
10  password: process.env.PGPASSWORD,
11 });

db.connect((err, client) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL!");
});


module.exports= db;