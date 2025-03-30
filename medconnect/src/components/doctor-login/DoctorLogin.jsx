import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import loginImage from "./login-image.png"; // Ensure the path is correct

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/doctor-login", { email, password });
      if (response.status === 200) {
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      setErrorMessage("Incorrect email or password");
    }
  };


  return (
    <div className={styles.container}>
      {/* Left Section - Login Form */}
      <div className={styles.leftSection}>
        <h1>Doctor Login</h1>
        <p>Please enter your details.</p>
        <input type="email" placeholder="Enter your email" className={styles.inputField} value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required/>
        <input type="password" placeholder="********" className={styles.inputField} value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required/>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <button className={styles.signInBtn} onClick={handleSignIn}>Sign In</button>

        <p className={styles.signUp}>
                   Don't have an account? <span onClick={() => navigate("/dsignup")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Sign up for free!</span>
                </p>
        
      </div>

      {/* Right Section - Full Height Image */}
      <div className={styles.rightSection}>
        <img src={loginImage} alt="Login Illustration" className={styles.loginImage} />
      </div>
    </div>
  );
};

export default DoctorLogin;

