import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./DoctorDashboard.module.css";
import { FaUserMd, FaCalendarCheck, FaVideo } from "react-icons/fa";

const DoctorDashboard = () => {
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
          <p className={styles.slogan}>“Providing better care, one step at a time”</p>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          {/* Doctor Details */}
          {/*<div className={styles.button} onClick={() => navigate("/doctor-details")}>
            <FaUserMd className={styles.icon} />
            <p>Doctor Details</p>
          </div>*/}

          {/* Appointments (Combining Appointment Booking & EHR Records) */}
          <div className={styles.button} onClick={() => navigate("/appointment-list")}>
            <FaCalendarCheck className={styles.icon} />
            <p>Appointments</p>
          </div>

          {/* Virtual Consultation */}
          <div className={styles.button }onClick={() => window.open("http://localhost:3000", "_blank")}>
            <FaVideo className={styles.icon} />
            <p>Virtual Consultation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
