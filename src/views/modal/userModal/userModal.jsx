import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import TimePicker from "react-time-picker";

import {
  action,
  genderList,
  projectList,
  shiftHoursList,
  supervisorList,
  floorList,
  reportType,
  reportTypeList,
  roleType,
} from "../../../system/constants/globleConstants/globleConstants";
// import { userActions } from "../../../redux/actions/user.actions/user.actions";
import {
  FormLabel,
  InputGrouptext,
} from "../../../shared/components/wrapperComponent/wrapperComponent";
import {
  SubmitButton,
  CancelButton,
} from "../../../shared/components/systemComponents/systemComponents";
import { userActions } from "../../../redux/actions/user.action/user.action";
import { authActions } from "../../../redux/actions/auth.action/auth.actions";
import { authServices } from "../../../services/auth.services/auth";
import { getCurrentUserLocalStorage } from "../../../system/storageUtilites/storageUtilities";

const UserrModal = (props) => {
  const localUser = getCurrentUserLocalStorage();
  const [isEdit, setisEdit] = useState(false);
  const [actionFor, setActionFor] = useState();
  const [floorList, setfloorList] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dataObj = {
      ...data,
      _id: Number(data._id),
      actionFor: actionFor,
      floorId:
        localUser?.role === roleType.SUPER_ADMIN
          ? Number(data.floorId)
          : localUser?._id,
    };
    console.log(dataObj);
    props.createUser(dataObj);
  };
  const handleCancel = () => {
    props.onHide();
  };
  useEffect(() => {
    console.log(props);
    // props.action === action.Details ? setisEdit(true) : setisEdit(false);
    setActionFor("create");

    if (props.for === action.Update) {
      setActionFor("update");
      setValue("_id", props.row._id);
      setValue("phoneNo", props.row.phoneNo);

      setValue("floorId", props.row.floorId);
      setValue("name", props.row.name);
      setValue("shiftEnds", props.row.shiftEnds);
      setValue("shiftStarts", props.row.shiftStarts);
      setValue("gender", props.row.gender);
      setValue("phoneNumber", props.row.phoneNumber);
      setValue("shiftHours", props.row.shiftHours);
    }
  }, []);

  useEffect(() => {
    props.getFloor();
  }, []);
  useEffect(() => {
    setfloorList(props?.floorList);
  }, [props?.floorList]);
  return (
    <section>
      <Form
        noValidate
        className="ViewUserContent"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          {" "}
          <div className="col-lg-6 col-md-12">
            <div class="field fieldSignup mb-3">
              <FormLabel>User Id</FormLabel>
              <InputGroup>
                <InputGrouptext>
                  <i class="fa-regular fa-user color-gray"></i>
                </InputGrouptext>
                <Form.Control
                  type="number"
                  className={`rounded-0 light-black ${
                    errors._id ? "error-border" : ""
                  }`}
                  {...register("_id", {
                    required: "User Id is Required",
                    pattern: {
                      value: /^[^\s]+(?:$|.*[^\s]+$)/,
                      message: "Enter a valid number",
                    },
                  })}
                  // disabled={isEdit}
                />
              </InputGroup>
              {errors._id && (
                <p className="error-text ">{errors._id.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div class="field fieldSignup mb-3">
              <FormLabel>Name</FormLabel>
              <InputGroup>
                <InputGrouptext>
                  <i class="fa-regular fa-user color-gray"></i>
                </InputGrouptext>
                <Form.Control
                  className={`rounded-0 light-black ${
                    errors.name ? "error-border" : ""
                  }`}
                  {...register("name", {
                    required: "Name is Required",
                    pattern: {
                      value: /^[^\s]+(?:$|.*[^\s]+$)/,
                      message: "Enter valid Name",
                    },
                  })}
                  // disabled={isEdit}
                />
              </InputGroup>
              {errors.name && (
                <p className="error-text ">{errors.name.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          {" "}
          <div className="col-lg-6 col-md-12">
            {" "}
            <div class="field fieldSignup mb-3">
              <Form.Label className="Form-labels light-black">
                Phone No.
              </Form.Label>
              <InputGroup>
                <InputGrouptext>
                  <i class="fa-solid fa-phone color-gray"></i>
                </InputGrouptext>
                <Form.Control
                  className={`rounded-0 light-black ${
                    errors.phoneNo ? "error-border" : ""
                  }`}
                  {...register("phoneNo", {
                    required: "phone No. is Required",
                  })}
                />
              </InputGroup>
              {errors.phoneNo && (
                <p className="error-text ">{errors.phoneNo.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            {" "}
            <div class="field fieldSignup mb-3">
              <FormLabel> Gender</FormLabel>
              <InputGroup>
                <InputGrouptext>
                  <i class="fa-solid fa-user-friends color-gray"></i>
                </InputGrouptext>
                <Form.Select
                  className={`rounded-0 light-black ${
                    errors.gender ? "error-border" : ""
                  }`}
                  {...register("gender", {
                    required: "Gender is Required",
                  })}
                  aria-label="Default select example"
                  disabled={isEdit}
                >
                  <option value="">Select Gender</option>
                  {genderList.map((gender) => (
                    <option key={gender.id} value={gender.value}>
                      {gender.value}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
              {errors.gender && (
                <p className="error-text ">{errors.gender.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            {" "}
            <div class="field fieldSignup mb-3 mt-2">
              <FormLabel>Shift Hours</FormLabel>
              <InputGroup>
                <InputGrouptext>
                  <i class="fa-solid fa-clock"></i>{" "}
                </InputGrouptext>
                <Form.Select
                  className={`rounded-0 light-black ${
                    errors.shiftHours ? "error-border" : ""
                  }`}
                  {...register("shiftHours", {
                    required: "Shift Hours is Required",
                  })}
                  aria-label="Default select example"
                  //   disabled={isEdit}
                >
                  <option value="">Select Hours</option>
                  {shiftHoursList.map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
              {errors.shiftHours && (
                <p className="error-text ">{errors.shiftHours.message}</p>
              )}
            </div>
          </div>

          {localUser?.role === roleType.SUPER_ADMIN ? (
            <div className="col-lg-6 col-md-12">
              {" "}
              <div class="field fieldSignup mb-3 mt-2">
                <FormLabel>Floor</FormLabel>
                <InputGroup>
                  <InputGrouptext>
                    <i class="fa-solid fa-bars-progress color-gray"></i>{" "}
                  </InputGrouptext>
                  <Form.Select
                    className={`rounded-0 light-black ${
                      errors.floorId ? "error-border" : ""
                    }`}
                    {...register("floorId", {
                      required: "Project is Required",
                    })}
                    aria-label="Default select example"
                    //   disabled={isEdit}
                  >
                    <option value="">Select Floor</option>
                    {floorList?.map((item) => (
                      <>
                        {item?.role === roleType.SUPER_ADMIN ? (
                          ""
                        ) : (
                          <option key={item?._id} value={item?._id}>
                            {item?.floorName}
                          </option>
                        )}
                      </>
                    ))}
                  </Form.Select>
                </InputGroup>
                {errors.floorId && (
                  <p className="error-text ">{errors.floorId.message}</p>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="field fieldSignup mb-3">
              <div className="row">
                <div className="col-sm-6 col-12 light-black">
                  <FormLabel>Shift Starts</FormLabel>
                  <br />
                  <Controller
                    name="shiftStarts"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Shift start time is required" }}
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.startvalue && (
                    <p className="error-text">{errors.startvalue.message}</p>
                  )}
                </div>
                <div className="col-sm-6 col-12 mt-3 mt-sm-0">
                  <FormLabel>Shift Ends</FormLabel>
                  <br />
                  <Controller
                    name="shiftEnds"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Shift end time is required" }}
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.endvalue && (
                    <p className="error-text">{errors.endvalue.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {props.action === action.Details ? (
          ""
        ) : (
          <div className="d-flex justify-content-center mt-5 ">
            <SubmitButton>Submit</SubmitButton>
            <CancelButton onClick={handleCancel}> Cancel</CancelButton>
          </div>
        )}
      </Form>
    </section>
  );
};
const mapStateToProps = (state) => ({
  floorList: state?.authReducer?.floorList?.data?.floorList,
  // userGroupNameList: state.userGroupReducer,
  // userList: state.userReducer,
});
const mapDispatchToProps = (dispatch) => ({
  createUser: (data) => dispatch(userActions.createUser(data)),
  getFloor: () => dispatch(authActions.getFloor()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserrModal);
