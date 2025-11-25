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
// *** أضف هذا السطر في أعلى الملف للتأكيد (حتى لو لم يكن لديك ملف .env) ***
require('dotenv').config();

const db = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST, // 🔑 يجب أن يكون هذا السطر هو الذي يقرأ PGHOST
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    // المنفذ 5432 هو المنفذ القياسي لـ PostgreSQL وهو صحيح
    port: 5432, 
    // إذا واجهت مشاكل أمنية في الاتصال لاحقاً، أضف السطر التالي:
    // ssl: { rejectUnauthorized: false }
});

// تأكد أنك تقوم بتصدير (export) قاعدة البيانات
module.exports = db;