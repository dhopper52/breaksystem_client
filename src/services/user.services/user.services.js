import axios from "axios";

import { Url } from "../../system/constants/globleConstants/globleConstants";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
import { getDailyReport } from "../break.services/break.services";
const { BASE_URL, GET_USER, CREATE_USER, GET_USERS, USER, DELETE_USER } = Url;
const localUser = getCurrentUserLocalStorage();

function getUser(data) {
  return axios
    .post(`${BASE_URL}/${USER}/${GET_USER}`, data)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function getUsers(data) {
  return axios
    .post(`${BASE_URL}/${USER}/${GET_USERS}`, data)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function createUser(data) {
  console.log(localUser);
  return axios
    .post(`${BASE_URL}/${USER}/${CREATE_USER}`, data, {
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

function deleteUser(data) {
  console.log(data, "delete data");
  return axios
    .delete(`${BASE_URL}/${USER}/${DELETE_USER}`, {
      data: data,
      headers: {
        "auth-token": localUser.authToken,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export const userServices = {
  getUser,
  createUser,
  getUsers,
  deleteUser,
};
