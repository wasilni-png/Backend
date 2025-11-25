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

const PORT = process.env.PORT || 3000; // استخدام متغير البيئة Render

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});