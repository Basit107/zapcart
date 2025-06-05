import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Send cookies with every request
  
});

export default instance;

// 'https://your-backend.onrender.com/api'