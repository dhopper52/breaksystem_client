import axios from "axios";
import { Url } from "../../system/constants/globleConstants/globleConstants";

const { BASE_URL, LOGIN, SIGNUP, GET_FLOOR, AUTH, UPDATE_FLOOR } = Url;

function login(data) {
  return axios
    .post(`${BASE_URL}/${AUTH}/${LOGIN}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Login error:", error);
      return error;
    });
}

function signUp(data) {
  return axios
    .post(`${BASE_URL}/${AUTH}/${SIGNUP}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Sign-up error:", error);
      throw error;
    });
}

function updateFloor(data) {
  console.log({data},"auth upfate floor service")
  return axios
    .put(`${BASE_URL}/${AUTH}/${UPDATE_FLOOR}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Update Floor error:", error);
      throw error;
    });
}

function getFloor() {
  return axios
    .get(`${BASE_URL}/${AUTH}/${GET_FLOOR}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export const authServices = {
  login,
  signUp,
  getFloor,
  updateFloor,
};
