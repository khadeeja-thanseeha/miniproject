import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./PatientDashboard.module.css";
import { FaUser, FaNotesMedical, FaCalendarCheck, FaVideo } from "react-icons/fa";

const PatientDashboard = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="MedConnect Logo" />
          <span className={styles.logoText}>medconnect</span>
        </div>
        <div className={styles.userInfo}>
          <a href="/" className={styles.logout}>Logout</a>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Background Image */}
        <div className={styles.background}>
          <img src="/dashboard_img.png" alt="Hospital Scene" />
          <p className={styles.slogan}>“We Connect you around the world”</p>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          {/*<div className={styles.button} onClick={() => navigate("/patient-details")}>
            <FaUser className={styles.icon} />
            <p>Patient Details</p>
          </div>*/}
          <div className={styles.button} onClick={() => navigate("/ehr-upload")}>
            <FaNotesMedical className={styles.icon} />
            <p>Patient Health Care Records</p>
          </div>
          <div className={styles.button} onClick={() => navigate("/appointment-booking")}>
            <FaCalendarCheck className={styles.icon} />
            <p>Appointment Booking</p>
          </div>
          <div className={styles.button} onClick={() => window.open("http://localhost:3000", "_blank")}>
            <FaVideo className={styles.icon} />
            <p>Virtual Consultation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
