const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Consider hashing the password before saving
    phoneNumber: String,
    licenseNumber: String,
    specialization: String,
    availableDays: [String], // Store as an array
    slotsPerDay: Number,
});

module.exports = mongoose.model("Doctor", DoctorSchema);