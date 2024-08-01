import axios from "axios";

import { Url } from "../../system/constants/globleConstants/globleConstants";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
import { getDailyReport } from "../break.services/break.services";
const { BASE_URL, GET_USER, CREATE_USER, GET_USERS } = Url;
const localUser = getCurrentUserLocalStorage();

function getUser(data) {
  return axios
    .post(`${BASE_URL}/${GET_USER}`, data)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function getUsers(data) {
  return axios
    .post(`${BASE_URL}/${GET_USERS}`, data)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function createUser(data) {
  console.log(localUser);
  return axios
    .post(`${BASE_URL}/${CREATE_USER}`, data, {
      headers: {
        "auth-token": localUser.authToken,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export const userServices = {
  getUser,
  createUser,
  getUsers,
};
