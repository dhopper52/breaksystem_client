import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  clockActions,
  startClock,
  stopClock,
  updateElapsedTime,
} from "../../../redux/actions/clock.actions/clock.action";

import { formateTime } from "../../utilities/utilities";
import moment from "moment-timezone";
import { breakTypeCheck } from "../../../system/constants/globleConstants/globleConstants";
import TimerComponent from "../timerComponent/timerComponent";
import { getCurrentUserLocalStorage } from "../../../system/storageUtilites/storageUtilities";
const ClockComponentTwo = (props) => {
  const localUser = getCurrentUserLocalStorage();

  console.log(props);
  const dispatch = useDispatch();
  const [startTimes, setStartTimes] = useState();
  const {
    id,
    breakInfo,
    user,
    runing,
    startTime,
    breakTimeValue,
    breakType,
    breakKey,
    count,
  } = props?.data;
  console.log({ props }, "ClockComponentTwo");
  console.log(id, "id");
  console.log(breakInfo, "breakInfo");
  console.log(user, "user");
  console.log(breakTimeValue, "breakTimeValue");
  console.log(breakKey, "breakKey");
  console.log(props?.strtTime, "strtTime");

  const handleStop = () => {
    let startPstTime = moment.utc(startTime).tz("Asia/Karachi").toISOString();
    console.log({ startPstTime });

    console.log(breakInfo, "breakInfo");
    // const stopTime = new Date().toISOString();
    const stopTime = Date();

    let stopPstTime = moment.utc(stopTime).tz("Asia/Karachi").toISOString();
    console.log({ stopPstTime });

    console.log({ breakTimeValue });
    // console.log({ stopTime });
    // const newStartTime = new Date(startTime).toISOString();
    const startTimeInMilliseconds = new Date(startTime).getTime();
    const stopTimeInMilliseconds = new Date().getTime();
    const actualUsedTime = stopTimeInMilliseconds - startTimeInMilliseconds;
    const newSeconds = Math.floor((actualUsedTime / 1000) % 60);
    const minutes = Math.floor(actualUsedTime / 1000 / 60);
    const actualUsedTimeMinutes = `${minutes}.${newSeconds
      .toString()
      .padStart(2, "0")}`;
    console.log(actualUsedTimeMinutes, "actualUsedTimeMinutes");

    // const seconds = actualUsedTime / 1000;
    // const actualUsedTimeMinutes = seconds / 60;
    // console.log(Math.floor(actualUsedTimeMinutes));
    // const newBreakTime = breakTimeValue * 60 * 1000;
    const newBreakTime = new Date().getTime() - new Date(startTime).getTime();

    const relaxUsedTime = breakTimeValue * 60 * 1000 + 30 * 1000;

    // const relaxUsedTime =
    //   new Date().getTime() - new Date(startTime).getTime() + 30 * 1000;

    const breakTimingList = {
      startTime: startPstTime,
      endTime: stopPstTime,
    };

    const usedBreaksList = {
      breakKey: breakTimeValue,
      // breakValue: Math.floor(actualUsedTimeMinutes),
      breakValue: actualUsedTimeMinutes,
    };
    console.log(
      Math.floor(actualUsedTimeMinutes),
      " Math.floor(actualUsedTimeMinutes) Math.floor(actualUsedTimeMinutes)"
    );
    if (breakInfo) {
      // dispatch(
      props.stopClockFn({
        userId: id,
        id: id,
        _id: breakInfo?._id,
        name: user?.name,
        count: count + 1,
        shiftHours: user?.shiftHours,
        floorId: user?.floorId,
        emergencyShortBreak:
          breakType === breakTypeCheck?.EMERGENCY_BREAK
            ? (breakInfo?.emergencyShortBreak || 0) +
              Math.floor(actualUsedTimeMinutes)
            : breakInfo?.emergencyShortBreak,
        date: breakInfo?.date,
        fine:
          breakType === breakTypeCheck?.EMERGENCY_BREAK
            ? breakInfo?.fine + 0
            : // : relaxUsedTime <= newBreakTime
            newBreakTime <= relaxUsedTime
            ? breakInfo?.fine + 0
            : breakInfo?.fine + 500,
        breakTime: [
          ...breakInfo?.breakTime,
          ...(breakType !== breakTypeCheck?.EMERGENCY_BREAK
            ? [breakTimingList]
            : []),
        ],
        usedbreaks: [
          ...breakInfo?.usedbreaks,
          ...(breakType !== breakTypeCheck?.EMERGENCY_BREAK
            ? [usedBreaksList]
            : []),
        ],
      });
      // );
    } else {
      // dispatch(
      props.stopClockFn({
        userId: id,
        name: user?.name,
        id: id,
        shiftHours: user?.shiftHours,
        floorId: user?.floorId,
        user: user,
        count: 1,
        emergencyShortBreak:
          breakType === breakTypeCheck?.EMERGENCY_BREAK
            ? (breakInfo?.emergencyShortBreak || 0) +
              Math.floor(actualUsedTimeMinutes)
            : 0,
        fine:
          breakType === breakTypeCheck?.EMERGENCY_BREAK
            ? 0
            : // : relaxUsedTime <= newBreakTime
            newBreakTime <= relaxUsedTime
            ? 0
            : 500,
        breakTime: [
          breakType !== breakTypeCheck?.EMERGENCY_BREAK ? breakTimingList : [],
          // breakTimingList
        ],
        usedbreaks: [
          breakType !== breakTypeCheck?.EMERGENCY_BREAK ? usedBreaksList : [],
        ],

        // [usedBreaksList],
      });
      // );
    }
  };

  useEffect(() => {
    setStartTimes(formateTime(startTime));
    console.log(startTime);
  }, [id]);

  return (
    <div>
      {/* <div className="d-flex flex-column align-items-center"> */}
      <div className="">
        <div className="d-flex flex-column align-items-center">
          <div className="clock-circle fw-semibold d-flex justify-content-center align-items-center mb-2">
            {/* {startTimes} */}
            {/* <TimerComponent seconds={Number(breakTimeValue * 60)} /> */}
            {props?.strtTime}
          </div>
        </div>
        {localUser.role === "superAdmin" ? (
          <></>
        ) : (
          <div className="d-flex flex-column align-items-center pb-4">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleStop}
            >
              Stop Clock
            </button>
          </div>
        )}

        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 className="fw-semibold mt-2">User Id:{user._id} </h6>
          <h6 className="fw-semibold">Floor Id:{user.floorId} </h6>
          <h6 className="fw-semibold ">Name: {user.name}</h6>
          <h6 className="fw-semibold">
            Break Time: {breakTimeValue === 21 ? 20 : breakTimeValue} minutes
          </h6>
          <h6 className="fw-semibold">Break Type: {breakType}</h6>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => ({
  stopClockFn: (data) => dispatch(clockActions.stopClock(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ClockComponentTwo);
