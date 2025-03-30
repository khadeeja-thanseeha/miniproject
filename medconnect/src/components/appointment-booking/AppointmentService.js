const API_URL = "http://localhost:5000/api/appointments"; // Adjust as needed

const AppointmentService = {
  getAppointments: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch appointments");
      return await response.json();
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
  },

  bookAppointment: async (appointmentData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  },

  cancelAppointment: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to cancel appointment");
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  },
};

export default AppointmentService;
