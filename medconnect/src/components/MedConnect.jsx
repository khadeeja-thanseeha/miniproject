import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MedConnect.module.css"; // Correct way to import CSS Modules
import image from "./med.jpeg"; // Import the image correctly

const MedConnect = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>  {/* Apply styles using CSS Modules */}
            <div className={styles.content}>
                {/* Logo Image */}
                <div className={styles.logoContainer}>
                    <img src="/logo.png" alt="MedConnect Logo" className={styles.logoImage} />
                </div>

                {/* Background Image */}
                <div className={styles.background}></div>  

                <h1>MedConnect</h1>
                <button className={styles.doctorBtn} onClick={() => navigate("/doctor-login")}>
                    Doctor Login
                </button>
                <button className={styles.patientBtn} onClick={() => navigate("/patient-login")}>
                    Patient Login
                </button>
            </div>
        </div>
    );
};

export default MedConnect;
