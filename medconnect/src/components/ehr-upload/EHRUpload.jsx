import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EHRUpload.module.css";

const EHRUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState([]);
  const [recordType, setRecordType] = useState("");
  const [fileFormat, setFileFormat] = useState("PDF");
  const [file, setFile] = useState(null);
  const [patientEmail, setPatientEmail] = useState(""); // Email entered by the user


  useEffect(() => {
    if (patientEmail) {
      fetchRecords();
    }
  }, [patientEmail]);
  


  const allowedExtensions = {
    PDF: "pdf",
    JPG: "jpg",
    PNG: "png",
    DOCX: "docx",
  };

   // Fetch records from backend
  const fetchRecords = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ehr/${patientEmail}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  
  const handleUpload = async () => {
    const fileUrl = `http://localhost:5000/uploads/${file.name}`;
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== allowedExtensions[fileFormat]) {
      alert(`Invalid file format! Please upload a ${fileFormat} file.`);
      return;
    }

    const formData = new FormData();
    formData.append("patientEmail", patientEmail);
    formData.append("recordType", recordType);
    formData.append("format", fileFormat);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/ehr/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      fetchRecords();
      setShowForm(false);
      setRecordType("");
      setFile(null);
    } catch (error) {
      alert("Upload failed.");
    }
  };

  // Handle Delete Record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/ehr/delete/${id}`);
      alert("Record deleted successfully!");
      fetchRecords(); // Refresh the records list
    } catch (error) {
      alert("Failed to delete record.");
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Electronic Health Records (EHR) Manager</h2>
      {/* Email Input Field */}
      <label>Enter Patient Email:</label>
      <input
        type="email"
        placeholder="Enter email"
        value={patientEmail}
        onChange={(e) => setPatientEmail(e.target.value)}
        required
      />
      <button onClick={() => setShowForm(true)}>+ Add Records</button>
      {showForm && (
        <div className="file-inputs">
          <label>Record Type:</label>
          <input
            type="text"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            placeholder="Enter record type"
          />

          <label>File Format:</label>
          <select value={fileFormat} onChange={(e) => setFileFormat(e.target.value)}>
            <option value="PDF">PDF</option>
            <option value="JPG">JPG</option>
            <option value="PNG">PNG</option>
            <option value="DOCX">DOCX</option>
          </select>

          <label>Upload File:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf,.jpg,.png,.docx" />

          <button onClick={handleUpload}>Upload</button>
        </div>
      )}

      <h2>Uploaded Records</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Record Name</th>
            <th>Type</th>
            <th>Format</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.fileName}</td>
              <td>{record.recordType}</td>
              <td>{record.format}</td>
              <td>
                <a href={`http://localhost:5000/uploads/${record.fileName}`} target="_blank" rel="noopener noreferrer">
                  View
                </a>
                &nbsp; | &nbsp;
                <button onClick={() => handleDelete(record._id)} style={{ color: "red", cursor: "pointer" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EHRUpload;
