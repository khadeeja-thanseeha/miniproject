import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MedConnect from "./components/MedConnect";
import DoctorLogin from "./components/doctor-login/DoctorLogin";
import PatientLogin from "./components/patient-login/PatientLogin";
import PatientDashboard from "./components/patient-login/patient-dashboard/PatientDashboard";
import DoctorDashboard from "./components/doctor-login/doctor-dashboard/DoctorDashboard";
import AppointmentForm from "./components/appointment-booking/AppointmentForm";
import EHRUpload from "./components/ehr-upload/EHRUpload";
import PatientDetails from "./components/patient-details/PatientDetails";
import Appointments from "./components/appointment-list/Appointments";
import DoctorDetails from "./components/doctor-details/DoctorDetails";
import Patientsignup from "./components/signup/Patientsignup";
import Doctorsignup from "./components/dsignup/Doctorsignup";
import EHRRecords from "./components/appointment-list/EHRRecords";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MedConnect />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/appointment-booking" element={<AppointmentForm />} />
        <Route path="/ehr-upload" element={<EHRUpload />} />
        <Route path="/patient-details" element={<PatientDetails />} />
        <Route path="/appointment-list" element={<Appointments />} /> 
        <Route path="/doctor-details" element={<DoctorDetails />} />
        <Route path="/signup" element={<Patientsignup />} />
        <Route path="/dsignup" element={<Doctorsignup />} />
        <Route path="/view-records/:email" element={<EHRRecords />} />
      </Routes>
    </Router>
  );
};

export default App;

