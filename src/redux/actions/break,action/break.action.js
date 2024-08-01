import {
  LoginConstants,
  modalConstants,
  userConstants,
} from "../../../system/constants/globleConstants/globleConstants";
import { userServices } from "../../../services/user.services/user.services";
import {
  authConstants,
  breakConstants,
} from "../../../system/constants/globleConstants/globleConstants";
import { ToastifyUtilities } from "../../../system/Toastify/toastifyUtilities";
import {
  getCurrentUserLocalStorage,
  setCurrentUserLocalStorage,
} from "../../../system/storageUtilites/storageUtilities";
import { breakServices } from "../../../services/break.services/break.services";

//   const getUser = (data) => {
//     return async (dispatch) => {
//       try {
//         const response = await userServices.getUser(data);
//         console.log(response);

//         if (response.status === authConstants.Success) {
//           dispatch({
//             type: userConstants.GET_USER,
//             payload: response.data,
//           });

//           ToastifyUtilities.showSuccess("User Created Successfully");
//         } else {
//           ToastifyUtilities.showError(response.data.message);
//         }
//       } catch (error) {
//         console.log({ error });
//         ToastifyUtilities.showError("User Already Registered");
//       }
//     };
//   };

const getBreaksDaily = (data) => {
  return async (dispatch) => {
    try {
      const response = await breakServices.getDailyReport(data);
      console.log(response);
      if (response?.status === authConstants.Success) {
        dispatch({
          type: breakConstants.BREAK_DAILY,
          payload: { data: response?.data },
        });

        // ToastifyUtilities.showSuccess("User Created Successfully");
        // dispatch({
        //   type: modalConstants.ModalOpen,
        //   payload: false,
        // });
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
    }
  };
};
const getBreaksMonthly = (data) => {
  return async (dispatch) => {
    try {
      const response = await breakServices.getMonthlyReport(data);
      console.log(response);
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
    }
  };
};

export const breakActions = {
  getBreaksDaily,
  getBreaksMonthly,
};
