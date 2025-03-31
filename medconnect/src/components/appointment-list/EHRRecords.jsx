import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./EHRRecords.module.css";

const EHRRecords = () => {
  const { email } = useParams(); // Get email from URL
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchEHRRecords();
  }, []);

  const fetchEHRRecords = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ehr/${email}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching EHR records:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Electronic Health Records</h2>
      <table className={styles.table}>
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
                  View File
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EHRRecords;
