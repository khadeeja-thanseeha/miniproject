const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Consider hashing the password before saving
  phoneNumber : { type : String },
  licenseNumber : { type : String },
  specialization : {type : String},
  availableDays: {type: Number}, // Store as an array
  slotsPerDay : {type: Number},
});

module.exports = mongoose.model("Doctor", DoctorSchema);