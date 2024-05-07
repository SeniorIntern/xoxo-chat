import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true // This line enables sending cookies with the request
});

export default apiClient;
