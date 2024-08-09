import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startClock,
  stopClock,
  updateElapsedTime,
} from "../../../redux/actions/clock.actions/clock.action";
import { formateTime } from "../../utilities/utilities";
import moment from "moment-timezone";
import { breakTypeCheck } from "../../../system/constants/globleConstants/globleConstants";

const ClockComponentTwo = (data) => {
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
  } = data?.data;

  console.log(id, "id");
  console.log(breakInfo, "breakInfo");
  console.log(user, "user");
  console.log(breakTimeValue, "breakTimeValue");
  console.log(breakKey, "breakKey");

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
      dispatch(
        stopClock({
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
                // Math.floor(actualUsedTimeMinutes)
                actualUsedTimeMinutes
              : breakInfo?.emergencyShortBreak,
          date: breakInfo?.date,
          fine:
            breakType === breakTypeCheck?.EMERGENCY_BREAK
              ? breakInfo?.fine + 0
              // : relaxUsedTime <= newBreakTime
              : newBreakTime <= relaxUsedTime
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
        })
      );
    } else {
      dispatch(
        stopClock({
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
                // Math.floor(actualUsedTimeMinutes)
                actualUsedTimeMinutes
              : 0,
          fine:
            breakType === breakTypeCheck?.EMERGENCY_BREAK
              ? 0
              // : relaxUsedTime <= newBreakTime
            :  newBreakTime <= relaxUsedTime
              ? 0
              : 500,
          breakTime: [
            breakType !== breakTypeCheck?.EMERGENCY_BREAK
              ? breakTimingList
              : [],
            // breakTimingList
          ],
          usedbreaks: [
            breakType !== breakTypeCheck?.EMERGENCY_BREAK ? usedBreaksList : [],
          ],

          // [usedBreaksList],
        })
      );
    }
  };

  //   const formatTime = (totalSeconds) => {
  //     const minutes = Math.floor(totalSeconds / 60);
  //     const seconds = totalSeconds % 60;
  //     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
  //       2,
  //       "0"
  //     )}`;
  //   };
  useEffect(() => {
    setStartTimes(formateTime(startTime));
    console.log(startTime);
  }, []);

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <div className="clock-circle fw-semibold d-flex justify-content-center align-items-center mb-2">
          {startTimes}
        </div>
        {runing && (
          <button type="button" className="btn btn-danger" onClick={handleStop}>
            Stop Clock
          </button>
        )}
        <h6 className="fw-semibold mt-2">User Id:{user._id} </h6>
        <h6 className="fw-semibold ">Name: {user.name}</h6>
        {/* <h6 className="fw-semibold">Extra Time: 20 minutes</h6> */}
        <h6 className="fw-semibold">
          Break Time: {breakTimeValue === 21 ? 20 : breakTimeValue} minutes
        </h6>{" "}
        <h6 className="fw-semibold">Break Type: {breakType}</h6>
      </div>
    </div>
  );
};

export default ClockComponentTwo;
