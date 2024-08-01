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

const ReportModal = (props) => {
  const [isEdit, setisEdit] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const handleCancel = () => {
    props.onHide();
  };
  // useEffect(() => {
  //   props.action === action.Details ? setisEdit(true) : setisEdit(false);

  //   if (
  //     props.action === action.Update ||
  //     props.action === action.Details
  //   ) {
  //     setValue("email", props.row.email);
  //     setValue("firstName", props.row.firstName);
  //     setValue("lastName", props.row.lastName);
  //     setValue("gender", props.row.gender);
  //     setValue("phoneNumber", props.row.phoneNumber);
  //     setValue("userGroupName", props.row.userGroupName);
  //   }
  // }, []);
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
                    errors.userId ? "error-border" : ""
                  }`}
                  {...register("userId", {
                    required: "User Id is Required",
                    pattern: {
                      value: /^[^\s]+(?:$|.*[^\s]+$)/,
                      message: "Enter a valid number",
                    },
                  })}
                  // disabled={isEdit}
                />
              </InputGroup>
              {errors.userId && (
                <p className="error-text ">{errors.userId.message}</p>
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
              <Form.Label className="Form-labels light-black">Email</Form.Label>
              <InputGroup>
                <InputGrouptext>
                  <i class="fa-solid fa-envelope color-gray"></i>
                </InputGrouptext>
                <Form.Control
                  className={`rounded-0 light-black ${
                    errors.email ? "error-border" : ""
                  }`}
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/i,
                      message: "Invalid Email",
                    },
                  })}
                  id="email"
                  type="email"
                />
              </InputGroup>
              {errors.email && (
                <p className="error-text ">{errors.email.message}</p>
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
                  {genderList?.map((gender) => (
                    <option key={gender?.id} value={gender?.value}>
                      {gender?.value}
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
                  {shiftHoursList?.map((item) => (
                    <option key={item?.id} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
              {errors.shiftHours && (
                <p className="error-text ">{errors.shiftHours.message}</p>
              )}
            </div>
          </div>
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
                    errors.floor ? "error-border" : ""
                  }`}
                  {...register("floor", {
                    required: "Project is Required",
                  })}
                  aria-label="Default select example"
                  //   disabled={isEdit}
                >
                  <option value="">Select Floor</option>
                  {floorList?.map((item) => (
                    <option key={item?.id} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
              {errors.floor && (
                <p className="error-text ">{errors.floor.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-12 col-md-6">
            {" "}
            <div class="field fieldSignup mb-3 mt-4">
              <FormLabel>Assign To Supervisor</FormLabel>
              <InputGroup>
                <InputGrouptext>
                  <i class="fa-solid fa-user color-gray"></i>{" "}
                </InputGrouptext>
                <Form.Select
                  className={`rounded-0 light-black ${
                    errors.supervisor ? "error-border" : ""
                  }`}
                  {...register("supervisor", {
                    required: "Supervisor to is Required",
                  })}
                  aria-label="Default select example"
                >
                  <option value="">Select Supervisor</option>
                  {supervisorList.map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
              {errors.supervisor && (
                <p className="error-text ">{errors.supervisor.message}</p>
              )}
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="field fieldSignup mb-3">
              <div className="row">
                <div className="col-sm-6 col-12 light-black">
                  <FormLabel>Shift Starts</FormLabel>
                  <br />
                  <Controller
                    name="startvalue"
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
                    name="endvalue"
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

const mapDispatchToProps = (dispatch) => ({
  // createUser: (data) => dispatch(userActions.createUser(data)),
  // updateUser: (data) => dispatch(userActions.updateUser(data)),
});
export default connect(null, mapDispatchToProps)(ReportModal);
