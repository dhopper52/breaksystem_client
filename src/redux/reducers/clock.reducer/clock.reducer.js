import { ToastifyUtilities } from "../../../system/Toastify/toastifyUtilities";
import {
  START_CLOCK,
  STOP_CLOCK,
  UPDATE_ELAPSED_TIME,
} from "../../actions/clock.actions/clock.action";

const initialState = {};

const clockReducer = (state = initialState, action) => {
  const { id, user, breakInfo, breakTimeValue, breakType, breakKey } =
    action.payload || {};
  switch (action.type) {
    case START_CLOCK:
      const newBreakList = Object.values(state);
      console.log(newBreakList);
      if (newBreakList.length < 3) {
        return {
          ...state,
          [id]: {
            startTime: state[id]?.startTime || Date(),
            runing: true,
            id: id,
            user: user,
            breakInfo: breakInfo,
            breakTimeValue: Number(breakTimeValue),
            breakType: breakType,
            breakKey: breakKey,
          },
        };
      } else {
        console.log("another clock is not allowed");
        ToastifyUtilities.showError("Another clock is not allowed");
      }

    case STOP_CLOCK:
      console.log(
        "STOP_CLOCKSTOP_CLOCKSTOP_CLOCKSTOP_CLOCKSTOP_CLOCKSTOP_CLOCK"
      );
      console.log(id);
      delete state[id];
      return {
        ...state,
      };
    case UPDATE_ELAPSED_TIME:
      return {
        ...state,
        [id]: { ...state[id], elapsedTime: state[id].elapsedTime + 1 },
      };
    default:
      return state;
  }
};

export default clockReducer;

// import {
//   START_CLOCK,
//   STOP_CLOCK,
//   UPDATE_ELAPSED_TIME,
// } from "../../actions/clock.actions/clock.action";

// const initialState = {};

// const clockReducer = (state = initialState, action) => {
//   const { id, user, breakInfo, breakTime } = action.payload || {};
//   switch (action.type) {
//     case START_CLOCK:
//       const newBreakList = Object.values(state);
//       console.log(newBreakList);
//       if (newBreakList.length <= 3) {
//         return {
//           ...state,
//           [id]: {
//             running: true,
//             elapsedTime: state[id]?.elapsedTime || 0,
//             startTime: state[id]?.startTime || Date.now(),
//             id: id,
//             user: user,
//             breakInfo: breakInfo,
//             breakTime: breakTime,
//           },
//         };
//       }

//     case STOP_CLOCK:
//       return {
//         ...state,
//         [id]: { ...state[id], running: false },
//       };
//     case UPDATE_ELAPSED_TIME:
//       return {
//         ...state,
//         [id]: { ...state[id], elapsedTime: state[id].elapsedTime + 1 },
//       };
//     default:
//       return state;
//   }
// };

// export default clockReducer;
