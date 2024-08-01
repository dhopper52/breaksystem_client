import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm, Controller } from 'react-hook-form';
import { connect } from "react-redux";
import TimePicker from "react-time-picker";


import {
  action,
  genderList,
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

const SupervisorModal = (props) => {
  const [isEdit, setisEdit] = useState(false);
  const [startvalue, setStartValue] = useState("08:00");
  const [endvalue, setEndValue] = useState("08:00");

  const {
    register,
    handleSubmit,control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // const dataObject = {
    //   ...data,
    //   currentUserId: props.userData.data.id,
    // };
    // if (props.action === action.Update) {
    //   return props.updateUser({ ...dataObject, id: props.row.id });
    // }
    // props.createUser(dataObject);
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
        <div className="col-lg-12 col-md-12">
          <div class="field fieldSignup mb-3">
            <FormLabel>Supervisor Id</FormLabel>
            <InputGroup>
              <InputGrouptext>
                <i class="fa-regular fa-user color-gray"></i>
              </InputGrouptext>
              <Form.Control
                type="number"
                className={`rounded-0 light-black ${
                  errors.supervisorId ? "error-border" : ""
                }`}
                {...register("supervisorId", {
                  required: "Supervisor Id is Required",
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message: "Enter a valid number",
                  },
                })}
                // disabled={isEdit}
              />
            </InputGroup>
            {errors.supervisorId && (
              <p className="error-text ">{errors.supervisorId.message}</p>
            )}
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div class="field fieldSignup mb-3">
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <InputGrouptext>
                <i class="fa-regular fa-user color-gray"></i>
              </InputGrouptext>
              <Form.Control
                className={`rounded-0 light-black ${
                  errors.firstName ? "error-border" : ""
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
        <div className="col-lg-12 col-md-12">
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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/i,
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
        <div className="col-lg-12 col-md-12">
          {" "}
          <div class="field fieldSignup mb-3">
            <FormLabel> Gender</FormLabel>
            <InputGroup>
              <InputGrouptext>
                <i class="fa-solid fa-user-friends color-gray"></i>
              </InputGrouptext>
              <Form.Select
                className={`rounded-0 light-black ${
                  errors.userGroupName ? "error-border" : ""
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
        </div>{" "}
        {/* <div className="col-lg-12 col-md-12">
          <div class="field  mb-3">
            <div className="row">
              <div className="col-sm-6 col-12 light-black">
                <FormLabel> Shift Starts </FormLabel> <br />
                <TimePicker onChange={setStartValue} value={startvalue} />
                {errors.startvalue && (
                  <p className="error-text ">{errors.startvalue.message}</p>
                )}
              </div>
              <div className="col-sm-6 col-12 mt-3   mt-sm-0">
                <FormLabel> Shift Ends </FormLabel> <br />
                <TimePicker onChange={setEndValue} value={endvalue} />
                {errors.endvalue && (
                  <p className="error-text ">{errors.endvalue.message}</p>
                )}
              </div>
            </div>
          </div>
        </div> */}
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
export default connect(null, mapDispatchToProps)(SupervisorModal);
