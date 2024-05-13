import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true // enable sending cookies with the request
});

export default apiClient;
