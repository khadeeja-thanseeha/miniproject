const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express(); 

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to access API
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes=require("./routes/appointments");
const ehrRoutes = require("./routes/ehrRoutes");


app.use("/api", patientRoutes);
app.use("/api", doctorRoutes);
app.use("/api",appointmentRoutes);
// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use EHR Routes
app.use("/api/ehr", ehrRoutes);


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
