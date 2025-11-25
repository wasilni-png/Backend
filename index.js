const express = require("express");
const cors = require("cors");
const user = require("./routes/userAuthentication");
const owner = require("./routes/ownerAuthentication");
const vehicles = require("./routes/vehicle");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));
app.use("/uploads", express.static("./uploads"));

app.use("/user", user);
app.use("/owner", owner);
app.use("/vehicles", vehicles);
// الكود الجديد والمصحح
const PORT = process.env.PORT || 3000; // استخدام متغير البيئة

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
const { Client } = require('pg');

const db = new Client({
    user: 'roadrider_user',
    host: 'dpg-d4id4gbe5dus738pee90-a.frankfurt-postgres.render.com', // تم إدخال القيمة مباشرة
    database: 'roadrider',
    password: '0DfLJeCXxlc79yUZtI5z7Iru1FtOt07D',
    port: 5432,
    // 🔑 هذا هو السطر الحاسم الأخير المطلوب لفتح الاتصال على Render
    ssl: { rejectUnauthorized: false } 
});

// ... باقي الكود ...
db.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = db;