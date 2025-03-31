import React, { useState } from "react";
import "./DoctorDetails.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const DoctorDetails = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [formData, setFormData] = useState({
    phoneNumber: "",
    licenseNumber: "",
    specialization: "",
    availableDays: 0 ,
    slotsPerDay: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/doctor-details", { email, ...formData },{
      headers: { "Content-Type": "application/json" }

    });
    navigate("/doctor-dashboard");
  }
     catch (error) {
      console.error("Details submission error:", error.response?.data || error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="header">
          <h2>Doctor Details</h2>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label>Phone Number <span className="required">*</span></label>
            <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
          </div>

          <div>
            <label>License Number <span className="required">*</span></label>
            <input type="text" name="licenseNumber" placeholder="License Number" onChange={handleChange} required />
          </div>

          <div>
            <label>Specialization <span className="required">*</span></label>
            <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} required />
          </div>

          <div>
            <label>Available Days <span className="required">*</span></label>
            <input type="text" name="availableDays" placeholder="Available Days (e.g., Monday, Wednesday)" onChange={handleChange} required />
          </div>

          <div>
            <label>Number of Slots Per Day <span className="required">*</span></label>
            <input type="number" name="slotsPerDay" placeholder="Slots Per Day" onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};


export default DoctorDetails;
