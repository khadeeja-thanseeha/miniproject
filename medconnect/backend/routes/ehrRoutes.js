const express = require("express");
const multer = require("multer");
const EHRRecord = require("../models/EHRRecord");
const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });

// ✅ API to Upload EHR Record
router.post("/upload", upload.single("file"), async (req, res) => {
  try {

    console.log("Received upload request:", req.body);
    console.log("File details:", req.file);

    if (!req.file) {
      console.error("No file uploaded!");
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const { patientEmail, recordType, format } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const newRecord = new EHRRecord({
      patientEmail,
      recordType,
      format,
      fileName: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
    });

    await newRecord.save();
    res.json({ message: "EHR record uploaded successfully", record: newRecord });
  } catch (error) {
    res.status(500).json({ error: "Server error while uploading record" });
  }
});

// ✅ API to Fetch EHR Records by Email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const records = await EHRRecord.find({ patientEmail: email });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

module.exports = router;
