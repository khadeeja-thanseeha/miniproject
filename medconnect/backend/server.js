const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express(); 
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

app.use(
    cors({
      origin: "http://localhost:5173", // Allow frontend to access API
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
app.use(express.json());
app.use("/api", patientRoutes);
app.use("/api", doctorRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err)  => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1); // Exit the app if MongoDB connection fails
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/", (req, res) => {
    res.send("Welcome to the MedConnect API!");
  });
