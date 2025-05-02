const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Function to generate a 6-digit unique meeting code
const generateMeetingCode = async () => {
  let code;
  let existingAppointment;

  do {
    code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit number
    existingAppointment = await Appointment.findOne({ meetingCode: code }); // Check if it already exists
  } while (existingAppointment); // Repeat if the code is already taken

  return code;
};

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
  try {
    const { patientName, email, doctor, date, time, reason } = req.body;

    // Generate a unique 6-digit meeting code
    const meetingCode = await generateMeetingCode();
    const patientExists = await Patient.findOne({ email });
    const newAppointment = new Appointment({
      patientName,
      email,
      doctor,
      date,
      time,
      reason,
      meetingCode, // ✅ Save the generated meeting code
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!", meetingCode });
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
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