import axios from 'axios';
import { clearStorage } from '../system/storageUtilites/storageUtilities';
import { localStorageConstants } from '../system/constants/globleConstants/globleConstants';

// Create axios instance
const axiosInstance = axios.create();

// Request interceptor - Add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const userData = localStorage.getItem(localStorageConstants.CURRENT_USER);
      if (userData) {
        const user = JSON.parse(userData);
        if (user?.authToken) {
          // Check if token is expired before sending request
          if (isTokenExpired(user.authToken)) {
            forceLogout('session_expired');
            return Promise.reject(new Error('Token expired'));
          }
          
          config.headers['auth-token'] = user.authToken;
        }
      }
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const errorCode = error.response.data?.code;
      
      // Handle different types of auth failures
      switch (errorCode) {
        case 'PASSWORD_CHANGED':
          forceLogout('password_changed');
          break;
        case 'TOKEN_EXPIRED':
          forceLogout('session_expired');
          break;
        case 'INVALID_TOKEN':
        case 'USER_NOT_FOUND':
        case 'TOKEN_MISSING':
        case 'AUTH_FAILED':
          forceLogout('auth_failed');
          break;
        default:
          // Generic auth error
          forceLogout('unknown_error');
      }
    }
    return Promise.reject(error);
  }
);

// Helper function to check if token is expired
function isTokenExpired(token) {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return true; // If can't decode, consider expired
  }
}

// Helper function to force logout
function forceLogout(reason = '') {
  clearStorage();
  
  // Add logout reason to URL for user feedback
  const loginUrl = reason ? `/login?reason=${reason}` : '/login';
  window.location.href = loginUrl;
}

export default axiosInstance;
