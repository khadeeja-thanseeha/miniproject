const mongoose = require("mongoose");

const EHRRecordSchema = new mongoose.Schema({
  patientEmail: { type: String, required: true }, // Maps to patient's email
  recordType: { type: String, required: true },
  format: { type: String, required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true }, // File URL (stored in database)
  uploadedAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("EHRRecord", EHRRecordSchema);
