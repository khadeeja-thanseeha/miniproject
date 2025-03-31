const express = require("express");
const multer = require("multer");
const EHRRecord = require("../models/EHRRecord");
const router = express.Router();
const fs = require("fs");
const path = require("path");

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

// Delete Record by ID
router.delete("/delete/:id", async (req, res) => {
    try {
      const ehrRecord = await EHRRecord.findById(req.params.id);
  
      if (!ehrRecord) {
        return res.status(404).json({ message: "Record not found" });
      }
  
      // Delete the file from the uploads folder
      const filePath = path.join(__dirname, "..", "uploads", ehrRecord.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Remove file from storage
      }
  
    // Delete the record from the database
      await EHRRecord.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
      console.error("Error deleting record:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
