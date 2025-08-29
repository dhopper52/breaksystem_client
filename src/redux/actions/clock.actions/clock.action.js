import { breakServices } from "../../../services/break.services/break.services";
import { clockServices } from "../../../services/clock.services/clock.services";
import { authConstants } from "../../../system/constants/globleConstants/globleConstants";
import { ToastifyUtilities } from "../../../system/Toastify/toastifyUtilities";
import { getCurrentUserLocalStorage } from "../../../system/storageUtilites/storageUtilities";
import {
  breakConstants,
  clockConstants,
} from "../../../system/constants/globleConstants/globleConstants";

export const START_CLOCK = "START_CLOCK";
export const GET_CLOCK = "GET_CLOCK";
export const GET_ADMIN_CLOCK = "GET_ADMIN_CLOCK";
export const STOP_CLOCK = "STOP_CLOCK";
export const UPDATE_ELAPSED_TIME = "UPDATE_ELAPSED_TIME";

const startClock = (data) => {
  const localUser = getCurrentUserLocalStorage();
  console.log({ localUser });
  console.log(data, "startClock");
  return async (dispatch) => {
    try {
      dispatch({
        type: clockConstants.LOADING,
        payload: true,
      });
      const response = await clockServices.startClock(data);
      console.log(response);
      if (response?.status === authConstants.Success) {
        const responseClock = await clockServices.getClocks(localUser);
        dispatch({
          type: GET_CLOCK,
          payload: { data: responseClock?.data },
        });
        ToastifyUtilities.showSuccess("Clock starts Successfully");
        dispatch({
          type: clockConstants.LOADING,
          payload: false,
        });
      } else {
        ToastifyUtilities.showError(response?.message);
        dispatch({
          type: clockConstants.LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log({ error });
      ToastifyUtilities.showError("Failed to start clock. Please try again.");
      dispatch({
        type: clockConstants.LOADING,
        payload: false,
      });
    }
  };
};

const getClock = (data) => {
  console.log(data, "getClock");
  return async (dispatch) => {
    try {
      const response = await clockServices.getClocks(data);
      console.log(response);
      if (response?.status === authConstants.Success) {
        dispatch({
          type: GET_CLOCK,
          payload: { data: response?.data },
        });
      } else {
        ToastifyUtilities.showError(response?.message);
      }
    } catch (error) {
      console.log({ error });
    }
  };
};

const getAdminClock = () => {
   return async (dispatch) => {
    try {
      const response = await clockServices.getAdminClocks();
      console.log(response);
      if (response?.status === authConstants.Success) {
        dispatch({
          type: GET_CLOCK,
          payload: { data: response?.data },
        });
      } else {
        ToastifyUtilities.showError(response?.message);
      }
    } catch (error) {
      console.log({ error });
    }
  };
};

export const stopClock = (data) => {
  const localUser = getCurrentUserLocalStorage();

  console.log(data, "..............stopclock");

  return async (dispatch) => {
    try {
      dispatch({
        type: clockConstants.LOADING,
        payload: true,
      });
      const response =
        data.count > 1
          ? await breakServices.updateBreak(data)
          : await breakServices.createBreak(data);

      if (response?.status === authConstants.Success) {
        const deleteResponse = await clockServices.deleteClock(data);
        if (deleteResponse?.status === authConstants.Success) {
          const responseClock = await  clockServices.getClocks(localUser);
          dispatch({
            type: GET_CLOCK,
            payload: { data: responseClock?.data },
          });
          dispatch({
            type: clockConstants.LOADING,
            payload: false,
          });
          ToastifyUtilities.showSuccess("Clock stopped  successfully");
        } else {
          dispatch({  
            type: clockConstants.LOADING,
            payload: false,
          });
          ToastifyUtilities.showError("Failed to stopped clock entry.");
        }
      } else {
        console.log(response , "response?.response?.data?")
        ToastifyUtilities.showError(response?.error);
        dispatch({
          type: clockConstants.LOADING,
          payload: false,
        });
        const responseClock = await  clockServices.getClocks(localUser);
        dispatch({
          type: GET_CLOCK,
          payload: { data: responseClock?.data },
        });
      }
    } catch (error) {
      console.log({ error });
      dispatch({
        type: clockConstants.LOADING,
        payload: false,
      });
      ToastifyUtilities.showError(
        "An error occurred while stopping the clock."
      );
    }
  };
};

export const clockActions = {
  startClock,
  stopClock,
  getClock,
  getAdminClock,
};
