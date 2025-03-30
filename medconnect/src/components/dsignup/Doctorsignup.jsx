import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './Dsignup.module.css'; // Import the corresponding CSS module

const   Doctorsignup = () => {
  const navigate = useNavigate(); // For navigation

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/doctor-signup", formData);
      navigate("/doctor-details", { state: { email: formData.email } }); // Redirect to doctor details page
    } catch (error) {
      console.error("Signup error:", error.response?.data || error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.authLeft}>
          <h2>Welcome</h2>
          <p>Keep connected with us, please login with your personal information</p>
        </div>
        <div className={styles.authRight}>
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.signupBtn}onClick={() => navigate("/doctor-details")}>
              Sign Up
            </button>
            
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Doctorsignup;
