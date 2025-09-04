import { localStorageConstants } from "../constants/globleConstants/globleConstants";

export const getCurrentUserLocalStorage = () => {
  const userData = localStorage.getItem(localStorageConstants.CURRENT_USER);
  return userData ? JSON.parse(userData) : null;
};

export const setCurrentUserLocalStorage = (response) => {
  return localStorage.setItem(
    localStorageConstants.CURRENT_USER,
    JSON.stringify(response)
  );
};

export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const forceLogout = (reason = '') => {
  clearStorage();
  
  // Add logout reason to URL for user feedback
  const loginUrl = reason ? `/login?reason=${reason}` : '/login';
  window.location.href = loginUrl;
};

export const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return true; // If can't decode, consider expired
  }
};
