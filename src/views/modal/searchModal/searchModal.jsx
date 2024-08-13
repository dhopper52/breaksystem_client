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
  startClock,
  stopClock,
  updateElapsedTime,
} from "../../../redux/actions/clock.actions/clock.action";
import { modalActions } from "../../../redux/actions/modal.actions/modal.actions";

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
    console.log(data);

    dispatch(
      startClock({
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
        breakKey:
          data?.breakType === breakTypeCheck?.EMERGENCY_BREAK
            ? "120"
            : breakKeyValue,
      })
    );
    props.handleSearchModal();
  };

  useEffect(() => {
    console.log(props.userData);
    if (props.userData?.break) {
      setBreakState({ break: props.userData?.break[0] });
    }
    setUserState({ user: props.userData?.user[0] });
    console.log(props.userData?.user[0]);
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center fs-5 mt-1 fs-5 fw-semibold ">
        "{userState?.user?.name}"
      </div>
      <div className="d-flex justify-content-between pb-3 pt-5">
        <div className="key   py-1  ">Shift Starts</div>
        <div className=" fw-semibold px-3 py-1 value">
          {userState?.user?.shiftStarts}{" "}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="key  py-1  ">Shift Ends</div>
        <div className=" fw-semibold px-3 py-1 value">
          {userState?.user?.shiftEnds}{" "}
        </div>
      </div>
      <Form
        noValidate
        className="ViewUserContent"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          <div className="col-lg-12 col-md-12">
            {" "}
            <div class="field fieldSignup mb-3 mt-3">
              <FormLabel> Select Break Type</FormLabel>
              <InputGroup>
                <InputGrouptext>
                  <i class="fa-solid fa-circle-dot"></i>
                </InputGrouptext>
                <Form.Select
                  className={`rounded-0 light-black ${
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
                <p className="error-text ">{errors.breakType.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            {!emergencyBreak ? (
              <div class="field fieldSignup mb-3 mt-4">
                <FormLabel> Select Break Time</FormLabel>
                <InputGroup>
                  <InputGrouptext>
                    <i class="fa-solid fa-clock"></i>{" "}
                  </InputGrouptext>
                  <Form.Select
                    className={`rounded-0 light-black ${
                      errors.breakTime ? "error-border" : ""
                    }`}
                    {...register("breakTime", {
                      required: "Break Time is Required",
                    })}
                    aria-label="Default select example"
                    //   disabled={isEdit}
                    onChange={breakKeyFn}
                  >
                    {/*                     {userState?.user?.shiftHours === shiftHours.Twelve ||
                    userState?.user?.shiftHours === shiftHours.Ten ? (
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
                    )} */}

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
                {/* 
              <InputGroup>
                <InputGrouptext>
                  <i class="fa-solid fa-clock"></i>{" "}
                </InputGrouptext>
                <Form.Select
                  className={`rounded-0 light-black ${
                    errors.breakTime ? "error-border" : ""
                  }`}
                  {...register("breakTime", {
                    required: "Break Time is Required",
                  })}
                  aria-label="Default select example"
                >
                  <option value="">Select Time</option>
                  {(userState?.user?.shiftHours === shiftHours.Eight
                    ? breakListEight
                    : breakListTwelve
                  ).map((breakTimeOption) => {
                    if (
                      !breakState?.break?.usedbreaks.some(
                        (breaks) => breaks.breakKey === breakTimeOption.id
                      )
                    ) {
                      return (
                        <option
                          key={breakTimeOption.id}
                          value={breakTimeOption.value}
                        >
                          {breakTimeOption.label}
                        </option>
                      );
                    }
                    return null;
                  })}
                </Form.Select>
              </InputGroup> */}
                {errors.breakTime && (
                  <p className="error-text ">{errors.breakTime.message}</p>
                )}
              </div>
            ) : (
              <> </>
            )}
          </div>
          <div className="d-flex justify-content-center mt-5 ">
            <SubmitButton>Start Clock</SubmitButton>
            <CancelButton onClick={handleCancel}> Cancel</CancelButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state?.userReducer?.userData,
  modalOpen: state?.modalReducer?.modalOpen,
});
const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(modalActions.handleModal()),

  handleSearchModal: () => dispatch(modalActions.handleSearchModal()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
