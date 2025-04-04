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

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [meetingCode, setMeetingCode] = useState("");

  const generateTimeSlots = () => {
    const slots = [];
    const times = [
      { start: 9, end: 12 }, // Morning session
      { start: 14, end: 16 }, // Afternoon session (2 PM to 4 PM)
    ];
  
    times.forEach(({ start, end }) => {
      for (let hour = start; hour < end; hour++) {
        ["00", "15", "30", "45"].forEach((minutes) => {
          slots.push(`${hour}:${minutes}`);
        });
      }
    });
  
    return slots;
  };

  const availableTimeSlots = generateTimeSlots();
  
  // Fetch booked appointments on component mount
   // Fetch doctors for dropdown
   useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctor");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, []);

  // Fetch booked appointments
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
      const response = await axios.post("http://localhost:5000/api/appointments/book", formData);
      alert(response.data.message);
      setMeetingCode(response.data.meetingCode);
      fetchAppointments();
    } catch (error) {
      alert(error.response.data.error || "Failed to book appointment");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Book an Appointment</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="patientName" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        {/* Doctor Dropdown */}
        <select name="doctor" onChange={handleChange} required>
          <option value="">Select a doctor</option>
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <option key={doc._id} value={`${doc.name} : ${doc.specialization}`}>
                  {doc.name} : {doc.specialization}
                </option>
                ))
            ) : (
                <option disabled>Loading doctors...</option>
                )}
        </select>

        <input type="date" name="date" min={new Date().toISOString().split("T")[0]} onChange={handleChange} required/>
        <select name="time" onChange={handleChange} required>
        <option value="">Select a time</option>
            {availableTimeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
            {slot}
        </option>
          ))}
        </select>
        <textarea name="reason" placeholder="Reason for Appointment" onChange={handleChange} required></textarea>
        <button type="submit" onClick={handleSubmit}>Book Appointment</button>
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
            <th>Meeting Code</th>
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
              <td><strong>{appointment.meetingCode}</strong></td> 
              <td>{appointment.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentForm;