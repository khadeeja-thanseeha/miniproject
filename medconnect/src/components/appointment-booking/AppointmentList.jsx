import React, { useEffect, useState } from "react";
import AppointmentService from "./AppointmentService";
import styles from "./style.module.css";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await AppointmentService.getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await AppointmentService.cancelAppointment(id);
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Booked Appointments</h2>
      <ul className={styles.appointmentList}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment.id} className={styles.appointmentItem}>
              <p><strong>Doctor:</strong> {appointment.doctor}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <button 
                className={styles.cancelButton} 
                onClick={() => handleCancel(appointment.id)}
              >
                Cancel
              </button>
            </li>
          ))
        ) : (
          <p>No appointments booked yet.</p>
        )}
      </ul>
    </div>
  );
};

export default AppointmentList;
