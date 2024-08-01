import {
  LoginConstants,
  modalConstants,
} from "../../../system/constants/globleConstants/globleConstants";
import { authServices } from "../../../services/auth.services/auth";
import { authConstants } from "../../../system/constants/globleConstants/globleConstants";
import { ToastifyUtilities } from "../../../system/Toastify/toastifyUtilities";
import {
  getCurrentUserLocalStorage,
  setCurrentUserLocalStorage,
} from "../../../system/storageUtilites/storageUtilities";
const signUp = (data) => {
  return async (dispatch) => {
    try {
      const response = await authServices.signUp(data);
      console.log(response);

      if (response?.status === authConstants.Success) {
        dispatch({
          type: LoginConstants.SignUp,
          payload: response?.data,
        });

        ToastifyUtilities.showSuccess("Floor Created Successfully");
        dispatch({
          type: modalConstants.ModalOpen,
          payload: false,
        });
      } else {
        ToastifyUtilities.showError(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      ToastifyUtilities.showError(error?.response?.data?.error);
    }
  };
};

const login = (data, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LoginConstants.LOADING,
        payload: true,
      });
      const response = await authServices.login(data);
      console.log(response);
      if (response?.status === authConstants.Success) {
        setCurrentUserLocalStorage(response?.data);
        const currentUser = getCurrentUserLocalStorage();

        dispatch({
          type: LoginConstants.Login,
          payload: { data: response?.data },
        });

        ToastifyUtilities.showSuccess("Account Login Successfully");
        navigate("/");
        dispatch({
          type: LoginConstants.LOADING,
          payload: false,
        });
      } else {
        ToastifyUtilities.showError(response?.message);
        dispatch({
          type: LoginConstants.LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
};

const getFloor = () => {
  return async (dispatch) => {
    try {
      const response = await authServices.getFloor();
      console.log(response);
      if (response?.status === authConstants.Success) {
        dispatch({
          type: LoginConstants.GET_FLOOR,
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

export const authActions = {
  login,
  signUp,
  getFloor,
};
