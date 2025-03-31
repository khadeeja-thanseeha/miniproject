const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.get("/doctor-signup", (req, res) => {
    res.json({ message: "Signup endpoint is working!" });
  });

router.get("/doctor-details", (req, res) => {
    res.json({ message: "Signup endpoint is working!" });
  }); 

router.get("/doctor-login", (req, res) => {
    res.json({ message: "Signup endpoint is working!" });
  }); 

// Allow CORS for specific routes
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });


// Register a new doctor
router.post("/doctor-signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newDoctor = new Doctor({ name, email, password });
    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add Doctor Details
router.post("/doctor-details", async (req, res) => {
    try {
      const { email, phoneNumber, licenseNumber, specialization, availableDays, slotsPerDay } = req.body;
      const doctor = await Doctor.findOne({ email });
  
      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }
  
      // Update doctor details
      doctor.phoneNumber = phoneNumber;
      doctor.licenseNumber = licenseNumber;
      doctor.specialization = specialization;
      doctor.availableDays = availableDays;
      doctor.slotsPerDay = slotsPerDay;
  
      await doctor.save();
      res.status(200).json({ message: "Doctor details updated successfully!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


  // Doctor Login
router.post("/doctor-login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const doctor = await Doctor.findOne({ email });
  
      if (!doctor || doctor.password !== password) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }
  
      res.status(200).json({ message: "Login successful", doctorId: doctor._id });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });


module.exports = router;
