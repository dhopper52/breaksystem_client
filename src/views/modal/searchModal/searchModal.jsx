import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import {
  FormLabel,
  InputGrouptext,
} from "../../../shared/components/wrapperComponent/wrapperComponent";
import {
  SubmitButton,
  CancelButton,
} from "../../../shared/components/systemComponents/systemComponents";
import {
  action,
  breakListEight,
  breakListsEight,
  breakType,
  breakListTen,
  breakListTwelve,
  shiftHours,
  breakTypeCheck,
} from "../../../system/constants/globleConstants/globleConstants";
import {
  clockActions,
  startClock,
  stopClock,
  updateElapsedTime,
} from "../../../redux/actions/clock.actions/clock.action";
import { modalActions } from "../../../redux/actions/modal.actions/modal.actions";
import { clockServices } from "../../../services/clock.services/clock.services";
import "./searchModal.css";

const SearchModal = (props) => {
  const dispatch = useDispatch();
  const [userState, setUserState] = useState({});
  const [breakState, setBreakState] = useState({});
  const [emergencyBreak, setEmergencyBreak] = useState(false);
  const [breakKeyValue, setBreakKeyValue] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      breakType: breakType[0]?.value, // Set the default value for breakType to '1'
    },
  });

  const shift = "twelve";

  const onchange = (e) => {
    console.log(e.target.value);
    e.target.value === breakTypeCheck.EMERGENCY_BREAK
      ? setEmergencyBreak(true)
      : setEmergencyBreak(false);
  };

  const handleCancel = () => {
    props.onHide();
  };

  const breakKeyFn = (e) => {
    console.log(e);
    setBreakKeyValue(e.target.value);
  };
  const onSubmit = (data) => {
    const dataObj = {
      id: userState?.user?._id,
      floorId: userState?.user?.floorId,
      breakTimeValue:
        data?.breakType === breakTypeCheck?.EMERGENCY_BREAK
          ? "120"
          : data?.breakTime,
      user: props?.userData?.user[0],
      breakInfo: props?.userData?.break[0],
      breakType: data?.breakType,
      count: props?.userData?.break[0]?.count,
      startTime: Date.now(),

      breakKey:
        data?.breakType === breakTypeCheck?.EMERGENCY_BREAK
          ? "120"
          : breakKeyValue,
    };
    console.log(data);
    props.startclockFn(dataObj);
    // dispatch(
    //   startClock({
    //     id: userState?.user?._id,
    //     floorId: userState?.user?.floorId,
    //     breakTimeValue:
    //       data?.breakType === breakTypeCheck?.EMERGENCY_BREAK
    //         ? "120"
    //         : data?.breakTime,
    //     user: props?.userData?.user[0],
    //     breakInfo: props.userData?.break[0],
    //     startTime: Date.now(),
    //     breakType: data?.breakType,
    //     count: props?.userData?.break[0]?.count,
    //     breakKey:
    //       data?.breakType === breakTypeCheck?.EMERGENCY_BREAK
    //         ? "120"
    //         : breakKeyValue,
    //   })
    // );
    props.handleSearchModal();
  };
  const breakss = props?.userData?.break[0];
  const user = props?.userData?.user[0];
  console.log(breakss, "breakss");
  console.log(user, "userrr");
  useEffect(() => {
    console.log(props.userData);
    console.log(props.userData?.break);
    if (props.userData?.break.length > 0) {
      setBreakState({ break: props.userData?.break[0] });
      console.log("break is settttt");
    }
    setUserState({ user: props.userData?.user[0] });
    console.log(props.userData?.user[0]);
  }, []);

  return (
    <div className="search-modal-container">
      <div className="search-modal-header">
        <h2 className="search-modal-title">Start Break Session</h2>
        <p className="search-modal-subtitle">Configure break settings for {userState?.user?.name}</p>
      </div>
      
      <div className="search-modal-content">
        <div className="user-info-section">
          <div className="info-row">
            <span className="info-label">Shift Starts</span>
            <span className="info-value">{userState?.user?.shiftStarts}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Shift Ends</span>
            <span className="info-value">{userState?.user?.shiftEnds}</span>
          </div>
        </div>

        <Form
          noValidate
          className="form-section"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label className="form-label">Select Break Type</label>
            <InputGroup>
              <InputGrouptext>
                <i className="fa-solid fa-circle-dot"></i>
              </InputGrouptext>
              <Form.Select
                className={`form-select ${
                  errors.breakType ? "error-border" : ""
                }`}
                {...register("breakType", {
                  required: "Break Type is Required",
                })}
                aria-label="Default select example"
                onChange={onchange}
              >
                <option value="">Select Type</option>
                {breakType.map((item) => (
                  <option key={item?.id} value={item?.value}>
                    {item?.label}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            {errors.breakType && (
              <p className="error-text">{errors.breakType.message}</p>
            )}
          </div>

          {!emergencyBreak && (
            <div className="form-group">
              <label className="form-label">Select Break Time</label>
              <InputGroup>
                <InputGrouptext>
                  <i className="fa-solid fa-clock"></i>
                </InputGrouptext>
                <Form.Select
                  className={`form-select ${
                    errors.breakTime ? "error-border" : ""
                  }`}
                  {...register("breakTime", {
                    required: "Break Time is Required",
                  })}
                  aria-label="Default select example"
                  onChange={breakKeyFn}
                >
                  {userState?.user?.shiftHours === shiftHours.Ten ? (
                    <>
                      <option value="">Select Time</option>
                      {breakListTen?.map((item) => {
                        const isUsedBreak =
                          breakState?.break?.usedbreaks.some(
                            (breaks) => breaks?.breakKey === item?.id
                          );
                        if (!isUsedBreak) {
                          return (
                            <option key={item?.id} value={item?.id}>
                              {item?.label}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </>
                  ) : userState?.user?.shiftHours === shiftHours.Twelve ? (
                    <>
                      <option value="">Select Time</option>
                      {breakListTwelve?.map((item) => {
                        const isUsedBreak =
                          breakState?.break?.usedbreaks.some(
                            (breaks) => breaks?.breakKey === item?.id
                          );
                        if (!isUsedBreak) {
                          return (
                            <option key={item?.id} value={item?.id}>
                              {item?.label}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </>
                  ) : (
                    <>
                      <option value="">Select Time</option>
                      {breakListEight?.map((item) => {
                        const isUsedBreak =
                          breakState?.break?.usedbreaks.some(
                            (breaks) => breaks?.breakKey === item?.id
                          );
                        console.log(isUsedBreak);
                        if (!isUsedBreak) {
                          return (
                            <option key={item?.id} value={item?.id}>
                              {item?.label}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </>
                  )}
                </Form.Select>
              </InputGroup>

              {errors.breakTime && (
                <p className="error-text">{errors.breakTime.message}</p>
              )}
            </div>
          )}

          <div className="button-group">
            <button type="submit" className="submit-btn">
              <i className="fa-solid fa-play me-2"></i>
              Start Clock
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              <i className="fa-solid fa-times me-2"></i>
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state?.userReducer?.userData,
  modalOpen: state?.modalReducer?.modalOpen,
});
const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(modalActions.handleModal()),
  startclockFn: (data) => dispatch(clockActions.startClock(data)),
  handleSearchModal: () => dispatch(modalActions.handleSearchModal()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);