import {
  START_CLOCK,
  STOP_CLOCK,
  GET_CLOCK,
} from "../../actions/clock.actions/clock.action";

const initialState = {
  currentBreaks: [],
};

const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLOCK:
      console.log(action.payload?.data, "clock reducer");
      return {
        ...state,
        currentBreaks: action.payload?.data, 
      };
    case STOP_CLOCK:
      return {
        ...state,
        currentBreaks: action.payload,
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

// case STOP_CLOCK:
//   return {
//     ...state,
//     currentBreaks: state.currentBreaks.filter(breakItem => breakItem.id !== action.payload.id), // Remove break by ID
//   };
