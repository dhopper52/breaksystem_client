import axiosInstance from "../axiosInterceptor";
import { Url } from "../../system/constants/globleConstants/globleConstants";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";

const {
  BASE_URL,
  GET_DAILY_BREAKS,
  GET_CURRENT_BREAK,
  GET_MONTHLY_BREAKS,
  CREATE_BREAK,
  UPDATE_BREAK,
  BREAK,
} = Url;

export function getCurrentBreak(data) {
  return axiosInstance
    .post(`${BASE_URL}/${BREAK}/${GET_CURRENT_BREAK}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function createBreak(data) {
  return axiosInstance
    .post(`${BASE_URL}/${BREAK}/${CREATE_BREAK}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function updateBreak(data) {
  return axiosInstance
    .put(`${BASE_URL}/${BREAK}/${UPDATE_BREAK}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

export function getDailyReport(data) {
  return axiosInstance
    .post(`${BASE_URL}/${BREAK}/${GET_DAILY_BREAKS}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function getMonthlyReport(data) {
  return axiosInstance
    .post(`${BASE_URL}/${BREAK}/${GET_MONTHLY_BREAKS}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export const breakServices = {
  getMonthlyReport,
  getDailyReport,
  createBreak,
  updateBreak,
};
