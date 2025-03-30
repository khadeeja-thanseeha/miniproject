import React, { useState } from "react";
import "./EHRUpload.module.css";

const EHRUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState([]);
  const [recordType, setRecordType] = useState("");
  const [fileFormat, setFileFormat] = useState("PDF");
  const [file, setFile] = useState(null);

  const allowedExtensions = {
    PDF: "pdf",
    JPG: "jpg",
    PNG: "png",
    DOCX: "docx",
  };

  
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== allowedExtensions[fileFormat]) {
      alert(`Invalid file format! Please upload a ${fileFormat} file.`);
      return;
    }

    const newRecord = {
      name: file.name,
      type: recordType,
      format: fileFormat,
      url: URL.createObjectURL(file),
    };
    setRecords([...records, newRecord]);
    setShowForm(false);
    setRecordType("");
    setFile(null);
  };

  return (
    <div className="upload-container">
      <h2>Electronic Health Records (EHR) Manager</h2>
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
              <td>{record.name}</td>
              <td>{record.type}</td>
              <td>{record.format}</td>
              <td>
                <a href={record.url} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EHRUpload;
