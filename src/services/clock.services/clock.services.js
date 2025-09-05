import axiosInstance from "../axiosInterceptor";
import { Url } from "../../system/constants/globleConstants/globleConstants";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";

const {
  BASE_URL,
  START_CLOCK,
  STOP_CLOCK,
  CLOCK,
  GET_CLOCK,
  DELETE_CLOCK,
  GET_ADMIN_CLOCK,
} = Url;

function getClocks(data) {
  // console.log(data, "getClocks service");
  return axiosInstance
    .post(`${BASE_URL}/${CLOCK}/${GET_CLOCK}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function getAdminClocks(data) {
  // console.log(data, "getClocks service");
  return axiosInstance
    .post(`${BASE_URL}/${CLOCK}/${GET_ADMIN_CLOCK}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function startClock(data) {
  // console.log(data, "service start clock");
  return axiosInstance
    .post(`${BASE_URL}/${CLOCK}/${START_CLOCK}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function deleteClock(data) {
  // console.log(data, "deleteClock service");
  return axiosInstance
    .delete(`${BASE_URL}/${CLOCK}/${DELETE_CLOCK}`, {
      data: data
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
  getAdminClocks,
};
