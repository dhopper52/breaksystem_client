import { breakServices } from "../../../services/break.services/break.services";
import { clockServices } from "../../../services/clock.services/clock.services";
import { authConstants } from "../../../system/constants/globleConstants/globleConstants";
import { ToastifyUtilities } from "../../../system/Toastify/toastifyUtilities";
import { getCurrentUserLocalStorage } from "../../../system/storageUtilites/storageUtilities";

export const START_CLOCK = "START_CLOCK";
export const GET_CLOCK = "GET_CLOCK";
export const STOP_CLOCK = "STOP_CLOCK";
export const UPDATE_ELAPSED_TIME = "UPDATE_ELAPSED_TIME";

const startClock = (data) => {
  const localUser = getCurrentUserLocalStorage();
  console.log({ localUser });
  console.log(data, "startClock");
  return async (dispatch) => {
    try {
      const response = await clockServices.startClock(data);
      console.log(response);
      if (response?.status === authConstants.Success) {
        const responseClock = await clockServices.getClocks(localUser);
        dispatch({
          type: GET_CLOCK,
          payload: { data: responseClock?.data },
        });
        ToastifyUtilities.showSuccess("Clock starts Successfully");
      } else {
        ToastifyUtilities.showError(response?.message);
      }
    } catch (error) {
      console.log({ error });
      ToastifyUtilities.showError("Failed to start clock. Please try again.");
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

export const stopClock = (data) => {
  const localUser = getCurrentUserLocalStorage();

  console.log(data, "..............stopclock");
   
  return async (dispatch) => {
    try {
      const response =
        data.count > 1
          ? await breakServices.updateBreak(data)
          : await breakServices.createBreak(data);

      // console.log(response);
      if (response?.status === authConstants.Success) {
        // console.log({ data }, "stop clock dsata");
        const deleteResponse = await clockServices.deleteClock(data);
        // console.log(deleteResponse, "deleteClock response");

        if (deleteResponse?.status === authConstants.Success) {
          const responseClock = await clockServices.getClocks(localUser);
          dispatch({
            type: GET_CLOCK,
            payload: { data: responseClock?.data },
          });
          ToastifyUtilities.showSuccess("Clock stopped  successfully");
        } else {
          ToastifyUtilities.showError("Failed to stopped clock entry.");
        }
        ToastifyUtilities.showSuccess("Saved Successfully");
      } else {
        ToastifyUtilities.showError(response?.response?.data?.error);
      }
    } catch (error) {
      console.log({ error });
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
};
