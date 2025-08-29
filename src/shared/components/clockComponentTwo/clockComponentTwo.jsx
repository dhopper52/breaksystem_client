import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  clockActions,
} from "../../../redux/actions/clock.actions/clock.action";

import moment from "moment-timezone";
import { breakTypeCheck } from "../../../system/constants/globleConstants/globleConstants";
import { getCurrentUserLocalStorage } from "../../../system/storageUtilites/storageUtilities";
import "./clockComponentTwo.css";
const ClockComponentTwo = (props) => {
  const localUser = getCurrentUserLocalStorage();
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

  const handleStop = () => {
    let startPstTime = moment.utc(startTime).tz("Asia/Karachi").toISOString();
    const stopTime = Date();

    let stopPstTime = moment.utc(stopTime).tz("Asia/Karachi").toISOString();
    const startTimeInMilliseconds = new Date(startTime).getTime();
    const stopTimeInMilliseconds = new Date().getTime();
    const actualUsedTime = stopTimeInMilliseconds - startTimeInMilliseconds;
    const newSeconds = Math.floor((actualUsedTime / 1000) % 60);
    const minutes = Math.floor(actualUsedTime / 1000 / 60);
    const actualUsedTimeMinutes = `${minutes}.${newSeconds
      .toString()
      .padStart(2, "0")}`;
    const newBreakTime = new Date().getTime() - new Date(startTime).getTime();

    const relaxUsedTime = breakTimeValue * 60 * 1000 + 30 * 1000;

    const breakTimingList = {
      startTime: startPstTime,
      endTime: stopPstTime,
    };

    const usedBreaksList = {
      breakKey: breakTimeValue,
      // breakValue: Math.floor(actualUsedTimeMinutes),
      breakValue: actualUsedTimeMinutes,
    };
    if (breakInfo) {
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
    } else {
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

      });
    }
  };

  useEffect(() => {}, [id]);

  return (
    <div className="break-clock-card">
      <div className="break-clock-container">
        <div className="clock-wrapper">
          <div className="clock-display">
            <div className="clock-circle-modern">
              <span className="clock-time">{props?.strtTime}</span>
            </div>
          </div>
        </div>
        {localUser.role !== "superAdmin" && (
          <div className="stop-button-container">
            <button type="button" className="stop-clock-btn" onClick={handleStop}>
              Stop Clock
            </button>
          </div>
        )}

        <div className="user-info-container">
          <div className="user-info-item">
            <span className="info-label">User Id</span>
            <span className="info-value">{user._id}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Floor Id</span>
            <span className="info-value">{user.floorId}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Name</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Break Time</span>
            <span className="info-value">{breakTimeValue === 21 ? 20 : breakTimeValue} minutes</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Break Type</span>
            <span className="info-value"><span className="break-type-badge">{breakType}</span></span>
          </div>
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
