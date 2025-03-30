const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

router.get("/signup", (req, res) => {
  res.json({ message: "Signup endpoint is working!" });
});

router.get("/add-details", (req, res) => {
  res.json({ message: "Signup endpoint is working!" });
});

router.get("/patient-login", (req, res) => {
  res.json({ message: "Signup endpoint is working!" });
});

// Allow CORS for specific routes
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Register a new patient
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if mail already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newPatient = new Patient({ name, email, password });
    await newPatient.save();
    res.status(201).json({ message: "Patient registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/add-details", async (req, res) => {
  try {
    const { email, firstName, middleName, lastName, phoneNumber, dob, gender, city, bloodGroup, weight, height } = req.body;

    // Find patient by email
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Update patient details
    patient.firstName = firstName;
    patient.middleName = middleName;
    patient.lastName = lastName;
    patient.phoneNumber = phoneNumber;
    patient.dob = dob;
    patient.gender = gender;
    patient.city = city;
    patient.bloodGroup = bloodGroup;
    patient.weight = weight;
    patient.height = height;

    await patient.save();
    res.status(200).json({ message: "Patient details updated successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/patient-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient || patient.password !== password) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    res.status(200).json({ message: "Login successful", patientId: patient._id });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
