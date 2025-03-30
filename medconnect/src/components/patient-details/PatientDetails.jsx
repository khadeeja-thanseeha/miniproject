import React, { useState } from "react";
import "./PatientDetails.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


const PatientDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Extract email from previous page (Patientsignup.jsx)
  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    city: "",
    bloodGroup: "",
    weight: "",
    height: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add-details", { email, ...formData }, {
        headers: { "Content-Type": "application/json" }
      });
      navigate("/patient-dashboard");
    } catch (error) {
      console.error("Error submitting details:", error.response?.data || error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="header">
          
          <h2>Patient Details</h2>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3">
            <div>
              <label>First Name <span className="required">*</span></label>
              <input type="text" name="firstName" placeholder="Enter first name..." onChange={handleChange} required />
            </div>
            <div>
              <label>Middle Name</label>
              <input type="text" name="middleName" placeholder="Enter middle name..." onChange={handleChange} />
            </div>
            <div>
              <label>Last Name <span className="required">*</span></label>
              <input type="text" name="lastName" placeholder="Enter last name..." onChange={handleChange} required />
            </div>
          </div>

          

          <div>
            <label>Phone Number <span className="required">*</span></label>
            <input type="number" name="phoneNumber" placeholder="Enter phone number..." onChange={handleChange} required />
          </div>

          <div>
            <label>Date of Birth <span className="required">*</span></label>
            <input type="date" name="dob" onChange={handleChange} required />
          </div>

          <div>
            <label>Gender <span className="required">*</span></label>
            <input type="text" name="gender" placeholder="Enter F,M,Others..." onChange={handleChange} required />
          </div>

          <div>
            <label>City <span className="required">*</span></label>
            <input type="text" name="city" placeholder="E.g., Delhi, Kerala..." onChange={handleChange} required />
          </div>

          <div>
            <label>Blood_group <span className="required">*</span></label>
            <input type="text" name="bloodGroup" placeholder="Enter blood group..." onChange={handleChange} required />
          </div>

          <div>
            <label>Weight <span className="required">*</span></label>
            <input type="number" name="weight" placeholder="Enter weight..." onChange={handleChange} required />
          </div>

          <div>
            <label>Height <span className="required">*</span></label>
            <input type="number" name="height" placeholder="Enter height..." onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-btn" onClick={() => navigate("/patient-dashboard")}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PatientDetails;
