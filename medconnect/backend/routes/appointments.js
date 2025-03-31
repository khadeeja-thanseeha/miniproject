const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Allow CORS for specific routes
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

// Fetch all appointments
router.get("/appointments", async (req, res) => {
    try {
      const appointments = await Appointment.find();
      console.log("Fetched Appointments:", appointments); // Debugging log
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Error fetching appointments" });
    }
  });

// Get list of doctors for dropdown
router.get("/doctor", async (req, res) => {
  try {
    const doctors = await Doctor.find({}, "name specialization");
    console.log("Fetched Doctors:", doctors); // Debugging
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Error fetching doctors" });
  }
});

// Book an appointment (Check if patient exists)
router.post("/appointments/book", async (req, res) => {
  const { patientName, email, doctor, date, time, reason } = req.body;

  try {
    const patientExists = await Patient.findOne({ email });
    if (!patientExists) {
      return res.status(400).json({ error: "Email not found in Patient records" });
    }

    const newAppointment = new Appointment({ patientName, email, doctor, date, time, reason });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error booking appointment" });
  }
});

// Fetch all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
});

module.exports = router;
