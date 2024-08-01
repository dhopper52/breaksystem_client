import axios from "axios";
import { Url } from "../../system/constants/globleConstants/globleConstants";

const { BASE_URL, LOGIN, SIGNUP, GET_FLOOR } = Url;

function login(data) {
  return axios
    .post(`${BASE_URL}/${LOGIN}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Login error:", error);
      return error;
    });
}

function signUp(data) {
  return axios
    .post(`${BASE_URL}/${SIGNUP}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Sign-up error:", error);
      throw error;
    });
}
function getFloor() {
  return axios
    .get(`${BASE_URL}/${GET_FLOOR}`)
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
};
