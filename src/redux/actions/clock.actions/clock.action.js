import { breakServices } from "../../../services/break.services/break.services";
import { authConstants } from "../../../system/constants/globleConstants/globleConstants";
import { ToastifyUtilities } from "../../../system/Toastify/toastifyUtilities";

// actions/clockActions.js
export const START_CLOCK = "START_CLOCK";
export const STOP_CLOCK = "STOP_CLOCK";
export const UPDATE_ELAPSED_TIME = "UPDATE_ELAPSED_TIME";

export const startClock = (data) => ({
  type: START_CLOCK,
  payload: {
    id: data?.id,
    floorId: data?.floorId,
    startTime: Date.now(),
    running: true,
    elapsedTime: 0,
    user: data?.user,
    breakInfo: data?.breakInfo,
    breakTimeValue: data?.breakTimeValue,
    breakType: data?.breakType,
    breakKey: data?.breakKey,
    count: data?.count,

  },
});
export const stopClock = (data) => {
  console.log(data, "..............stopclock");
  console.log(
    data.usedbreaks.length,
    "data.usedbreaks.lengthdata.usedbreaks.lengthdata.usedbreaks.length"
  );
  return async (dispatch) => {
    try {
      const response =
        data.count > 1
          ? await breakServices.updateBreak(data)
          : await breakServices.createBreak(data);

      console.log(response);
      if (response?.status === authConstants.Success) {
        dispatch({
          type: STOP_CLOCK,
          payload: { id: data?.id },
        });

        ToastifyUtilities.showSuccess("Saved Successfully");
        // dispatch({
        //   type: modalConstants.ModalOpen,
        //   payload: false,
        // });
        // dispatch({
        //   type: userConstants.LOADING,
        //   payload: false,
        // });
      } else {
        ToastifyUtilities.showError(response?.response?.data?.error);
        // dispatch({
        //   type: userConstants.LOADING,
        //   payload: false,
        // });
      }
    } catch (error) {
      console.log({ error });
    }
  };
};
