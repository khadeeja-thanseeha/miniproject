import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const [appointments, setAppointments] = useState([]);

  // Fetch booked appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/appointments/book", formData);
      alert("Appointment booked successfully!");
      fetchAppointments(); // Refresh the appointments list
    } catch (error) {
      alert("Failed to book appointment");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Book an Appointment</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="patientName" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="doctor" placeholder="Doctor's Name" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />
        <textarea name="reason" placeholder="Reason for Appointment" onChange={handleChange} required></textarea>
        <button type="submit">Book Appointment</button>
      </form>

      {/* Display Booked Appointments */}
      <h2>Booked Appointments</h2>
      <table className={styles.appointmentTable}>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Email</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.patientName}</td>
              <td>{appointment.email}</td>
              <td>{appointment.doctor}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentForm;
