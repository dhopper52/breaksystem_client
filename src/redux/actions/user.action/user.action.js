import {
  LoginConstants,
  modalConstants,
  userConstants,
} from "../../../system/constants/globleConstants/globleConstants";
import { userServices } from "../../../services/user.services/user.services";
import { authConstants } from "../../../system/constants/globleConstants/globleConstants";
import { ToastifyUtilities } from "../../../system/Toastify/toastifyUtilities";
import {
  getCurrentUserLocalStorage,
  setCurrentUserLocalStorage,
} from "../../../system/storageUtilites/storageUtilities";
import {
  getCurrentBreak,
  getDailyReport,
} from "../../../services/break.services/break.services";
import { handleSearchModal } from "../modal.actions/modal.actions";

const getUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: userConstants.LOADING,
        payload: true,
      });
      const response = await userServices.getUser(data);
      console.log(response.data);

      if (response?.data?.status === authConstants.Success) {
        const breakResponse = await getCurrentBreak(response.data);

        console.log(breakResponse);
        dispatch({
          type: userConstants.GET_USER,
          // payload: response,
          payload: { user: response?.data?.data, break: breakResponse?.data },
        });
        dispatch({
          type: userConstants.LOADING,
          payload: false,
        });

        // handleSearchModal();
        // console.log("searcjh moidal.............")
        dispatch({
          type: modalConstants.SEARCH_MODAL,
          payload: true,
        });
        // ToastifyUtilities.showSuccess("User Created Successfully");
      } else {
        ToastifyUtilities.showError(response?.data?.message);
        dispatch({
          type: userConstants.LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log({ error });
      ToastifyUtilities.showError("Internal Server Error");
      dispatch({
        type: userConstants.LOADING,
        payload: false,
      });
    }
  };
};

const getSearchUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: userConstants.LOADING,
        payload: true,
      });
      const response = await userServices.getUser(data);
      console.log(response?.data?.data);

      if (response.data.status === authConstants.Success) {
        dispatch({
          type: userConstants.GET_USER,
          // payload: response,
          payload: response?.data?.data,
        });
        dispatch({
          type: userConstants.LOADING,
          payload: false,
        });
      } else {
        ToastifyUtilities.showError(response?.data?.message);
        dispatch({
          type: userConstants.LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log({ error });
      ToastifyUtilities.showError("Internal Server Error");
      dispatch({
        type: userConstants.LOADING,
        payload: false,
      });
    }
  };
};

const getUsersLength = (data) => {
  return async (dispatch) => {
    try {
      const response = await userServices.getUsers(data);
      console.log(response?.data);

      if (response?.data?.status === authConstants.Success) {
        dispatch({
          type: userConstants.GET_USERS,
          payload: response.data,
        });
      } else {
        ToastifyUtilities.showError(response?.data?.message);
      }
    } catch (error) {
      console.log({ error });
      ToastifyUtilities.showError("Internal Server Error");
    }
  };
};
const getUsersList = (data) => {
  return async (dispatch) => {
    try {
      const response = await userServices.getUser(data);
      console.log(response?.data);

      if (response?.data?.status === authConstants.Success) {
        dispatch({
          type: userConstants.GET_USERSLIST,
          payload: response.data,
        });
      } else {
        ToastifyUtilities.showError(response?.data?.message);
      }
    } catch (error) {
      console.log({ error });
      ToastifyUtilities.showError("Internal Server Error");
    }
  };
};
const createUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await userServices.createUser(data);
      console.log(response);
      if (response?.status === authConstants.Success) {
        dispatch({
          type: userConstants.USER_CREATED,
          payload: { data: response?.data },
        });

        ToastifyUtilities.showSuccess("User Created Successfully");
        dispatch({
          type: modalConstants.ModalOpen,
          payload: false,
        });
        dispatch({
          type: userConstants.LOADING,
          payload: false,
        });
      } else {
        ToastifyUtilities.showError(response?.message);
        dispatch({
          type: userConstants.LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
};

export const userActions = {
  createUser,
  getUser,
  getUsersLength,
  getSearchUser,
  getUsersList,
};
