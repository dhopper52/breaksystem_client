import axios from "axios";
import { Url } from "../../system/constants/globleConstants/globleConstants";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
const localUser = getCurrentUserLocalStorage();

const {
  BASE_URL,
  GET_DAILY_BREAKS,
  GET_CURRENT_BREAK,
  GET_MONTHLY_BREAKS,
  CREATE_BREAK,
  UPDATE_BREAK,
} = Url;

export function getCurrentBreak(data) {
  return axios
    .post(`${BASE_URL}/${GET_CURRENT_BREAK}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function createBreak(data) {
  return axios
    .post(`${BASE_URL}/${CREATE_BREAK}`, data, {
      headers: {
        "auth-token": localUser.authToken,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function updateBreak(data) {
  return axios
    .put(`${BASE_URL}/${UPDATE_BREAK}`, data, {
      headers: {
        "auth-token": localUser.authToken,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

export function getDailyReport(data) {
  return axios
    .post(`${BASE_URL}/${GET_DAILY_BREAKS}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function getMonthlyReport(data) {
  const localUser = getCurrentUserLocalStorage();

  console.log(localUser);
  return axios
    .post(
      `${BASE_URL}/${GET_MONTHLY_BREAKS}`,
      data
      //      {
      //   headers: {
      //     "auth-token": localUser.authToken,
      //   },
      // }
    )
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
