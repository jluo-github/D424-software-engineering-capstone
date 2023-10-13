import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend URL
  withCredentials: true, // Send credentials (e.g., cookies) with requests
});

// Set common headers (e.g., authorization)
api.defaults.headers.common["Authorization"] = "Bearer your-token"; // Replace with your token

export default api;
