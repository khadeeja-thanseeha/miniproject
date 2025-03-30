import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './psignup.module.css'; // Import the corresponding CSS module

const Patientsignup = () => {
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
  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
    
    // Here you can add API call logic for signup
    // Example: axios.post('/api/signup', formData).then(() => navigate('/patient-login'));

    navigate('/patient-login'); // Redirect to login page after signup
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", formData);
      navigate("/patient-details", { state: { email: formData.email } }); //  Send email to next page
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
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit" className={styles.signupBtn} onClick={() => navigate("/patient-details")}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Patientsignup;
