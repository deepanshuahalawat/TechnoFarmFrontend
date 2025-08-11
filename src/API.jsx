import axios from 'axios';

const api = axios.create({
  baseURL: 'https://technofarm.in',
  withCredentials: true, // Include cookies in every request
});

// Response interceptor to handle 401/403 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      // Redirect to login page
      window.location.href = '/login';
    }

    // Still reject so calling functions can handle it too
    return Promise.reject(error);
  }
);

export default api;
