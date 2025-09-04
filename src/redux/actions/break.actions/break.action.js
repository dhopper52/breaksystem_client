import {
  authConstants,
  breakConstants,
} from "../../../system/constants/globleConstants/globleConstants";
import { ToastifyUtilities } from "../../../system/Toastify/toastifyUtilities";
import { breakServices } from "../../../services/break.services/break.services";

const getBreaksDaily = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: breakConstants.LOADING,
        payload: true,
      });
      const response = await breakServices.getDailyReport(data);
      // console.log(response);
      if (response?.status === authConstants.Success) {
        dispatch({
          type: breakConstants.BREAK_DAILY,
          payload: { data: response?.data },
        });
        dispatch({
          type: breakConstants.LOADING,
          payload: false,
        });
      } else {
        ToastifyUtilities.showError(response?.message);
        dispatch({
          type: breakConstants.LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log({ error });
      dispatch({
        type: breakConstants.LOADING,
        payload: false,
      });
    }
  };
};

const getBreaksMonthly = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: breakConstants.LOADING,
        payload: true,
      });
      const response = await breakServices.getMonthlyReport(data);
      // console.log(response);
      if (response?.status === authConstants.Success) {
        dispatch({
          type: breakConstants.BREAK_MONTHLY,
          payload: { data: response?.data },
        });
        dispatch({
          type: breakConstants.LOADING,
          payload: false,
        });
      } else {
        ToastifyUtilities.showError(response?.message);
        dispatch({
          type: breakConstants.LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log({ error });
      dispatch({
        type: breakConstants.LOADING,
        payload: false,
      });
    }
  };
};

export const breakActions = {
  getBreaksDaily,
  getBreaksMonthly,
};
