import { localStorageConstants } from "../constants/globleConstants/globleConstants";

export const getCurrentUserLocalStorage = () => {
  return JSON.parse(localStorage.getItem(localStorageConstants.CURRENT_USER));
};

export const setCurrentUserLocalStorage = (response) => {
  return localStorage.setItem(
    localStorageConstants.CURRENT_USER,
    JSON.stringify(response)
  );
};
export const clearStorage = () => {
  localStorage.clear();
};
