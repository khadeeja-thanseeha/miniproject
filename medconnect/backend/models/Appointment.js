const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  email: String,
  doctor: String,
  date: String,
  time: String,
  reason: String,
  meetingCode: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
