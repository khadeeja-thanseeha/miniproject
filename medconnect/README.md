# 🛠️ MedConnect : Cloud Based Health Care Management System

This is a full-stack web application using **React.js** (frontend), **Node.js + Express.js** (backend), and **MongoDB** (database), with integrated **WebRTC** support for real-time video conferencing. The app allows user registration, data retrieval, and peer-to-peer video communication.

---

## 🚀 Features

- Full CRUD backend API using Express and MongoDB
- React frontend to fetch and display data
- REST API integration using Axios
- Real-time **video conferencing** using WebRTC and Socket.IO
- CORS and environment variable support
- Modular and scalable folder structure

---

## 🧰 Tech Stack

- **Frontend**: React.js, Axios, WebRTC, Socket.IO-client
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB (via Mongoose)
- **Dev Tools**: Visual Studio Code, Postman, npm

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

git clone https://github.com/yourusername/fullstack-react-node-mongodb-webrtc.git

cd fullstack-react-node-mongodb-webrtc

### 2. Backend Setup (/backend)

cd backend

npm install

#### Create a .env file:

MONGO_URI=your_mongodb_connection_string

PORT=5000

#### Start the backend server:

node server.js

The backend handles both API routes and WebRTC signaling via Socket.IO.

### 3. Frontend Setup (/frontend)

cd ../frontend

npm install

npm start

The frontend provides UI for:

- User data listing
  
- Real-time video call using WebRTC and meeting codes
---

## 📬 API Endpoints
## Method	Route	Description
GET :	/api/users	: Get all users

POST : /api/users/register	: Register a new user

---

## 📹 WebRTC Module
The WebRTC module allows peer-to-peer video conferencing between users using a meeting code. It uses:

- WebRTC for media streaming
- Socket.IO for signaling and connection setup
- React hooks and context for session management
  
---

### How to Use:

- Navigate to the video call page.
- Enter or share a meeting code.
- Click "Join Call" to start a peer-to-peer video session.
---

## 🧪 Example POST Request

- Endpoint: /api/users/register
  
- Payload:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "mypassword"
}
---

# 🔧 Future Improvements

- User authentication with JWT
- Enhanced WebRTC features: screen share, chat, mute
- Integration of Payment Module
- UI styling with Tailwind or Material UI


---

# 📝 License
This project is licensed under the MIT License.

## 👨‍💻 Author
Khadeeja Thanseeha V 
GitHub: @khadeeja-thanseeha

---




