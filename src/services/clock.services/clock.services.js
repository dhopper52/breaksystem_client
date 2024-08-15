import axios from "axios";
import { Url } from "../../system/constants/globleConstants/globleConstants";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
const localUser = getCurrentUserLocalStorage();

const { BASE_URL, START_CLOCK, STOP_CLOCK, CLOCK, GET_CLOCK, DELETE_CLOCK } =
  Url;

function getClocks(data) {
  console.log(data, "getClocks service");
  return axios
    .post(`${BASE_URL}/${CLOCK}/${GET_CLOCK}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function startClock(data) {
  console.log(data, "service start clock");
  return axios
    .post(`${BASE_URL}/${CLOCK}/${START_CLOCK}`, data, {
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

function deleteClock(data) {
  console.log(data, "deleteClock service");
  return axios
    .delete(`${BASE_URL}/${CLOCK}/${DELETE_CLOCK}`, {
      headers: {
        "auth-token": localUser.authToken,
      },
      data: data,  
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

export const clockServices = {
  startClock,
  getClocks,
  deleteClock,
};
