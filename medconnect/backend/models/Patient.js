const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true , required: true },
  password: String, // Consider encrypting passwords
    // New Fields for Patient Details
    firstName: String,
    middleName: String,
    lastName: String,
    phoneNumber: String,
    dob: Date,
    gender: String,
    city: String,
    bloodGroup: String,
    weight: Number,
    height: Number,
    ehrRecords: [
      {
        type: String,
        format: String,
        fileUrl: String,
      }
    ]
});

module.exports = mongoose.model("Patient", PatientSchema);
