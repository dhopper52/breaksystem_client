import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { action } from "../../../system/constants/globleConstants/globleConstants";
import {
  FormLabel,
  InputGrouptext,
} from "../../../shared/components/wrapperComponent/wrapperComponent";
import {
  SubmitButton,
  CancelButton,
} from "../../../shared/components/systemComponents/systemComponents";
import { authActions } from "../../../redux/actions/auth.action/auth.actions";
import { authServices } from "../../../services/auth.services/auth";
import { getCurrentUserLocalStorage } from "../../../system/storageUtilites/storageUtilities";
const FloorModal = (props) => {
  const localUser = getCurrentUserLocalStorage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dataObject = {
      ...data,
      _id: Number(data._id),
      role: "superVisor",
      localUser: localUser,
    };
  
    props.createFloor(dataObject);
  };
  const handleCancel = () => {
    props.onHide();
  };

  const test = async () => {
    const response = await authServices.getFloor();
  };
  useEffect(() => {
    // props.createFloor();
    // console.log(props.floorList);
    // props.action === action.Details ? setisEdit(true) : setisEdit(false);

    // if (
    //   props.action === action.Update ||
    //   props.action === action.Details
    // ) {
    //   setValue("email", props.row.email);
    //   setValue("firstName", props.row.firstName);
    //   setValue("lastName", props.row.lastName);
    //   setValue("gender", props.row.gender);
    //   setValue("phoneNumber", props.row.phoneNumber);
    //   setValue("userGroupName", props.row.userGroupName);
    // }
  }, []);
  return (
    <section>
      <Form
        noValidate
        className="ViewUserContent"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-lg-12 col-md-12">
          <div class="field fieldSignup mb-3">
            <FormLabel>Floor Id</FormLabel>
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
                  required: "Floor Id is Required",
                  type: Number,
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message: "Enter a valid number",
                  },
                })}
              />
            </InputGroup>
            {errors._id && <p className="error-text ">{errors._id.message}</p>}
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div class="field fieldSignup mb-3">
            <FormLabel>Floor Name</FormLabel>
            <InputGroup>
              <InputGrouptext>
                <i class="fa-regular fa-user color-gray"></i>
              </InputGrouptext>
              <Form.Control
                className={`rounded-0 light-black ${
                  errors.floorName ? "error-border" : ""
                }`}
                {...register("floorName", {
                  required: "Floor Name is Required",
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message: "Enter valid Name",
                  },
                })}
              />
            </InputGroup>
            {errors.floorName && (
              <p className="error-text ">{errors.floorName.message}</p>
            )}
          </div>
        </div>

        <div class="field space fieldSignup mb-3">
          <FormLabel> Password</FormLabel>
          <InputGroup className="">
            <InputGrouptext>
              <i class="fa-solid fa-key color-gray"></i>{" "}
            </InputGrouptext>
            <input
              className={`form-control light-black rounded-0 ${
                errors.password ? "error-border" : ""
              }`}
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^\s*[^\s]+(?:\s+[^\s]+)*\s*$/,
                  message: "invalid passsword",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
          </InputGroup>
          {errors.password && (
            <p className=" error-text ">{errors.password.message}</p>
          )}
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
  createFloor: (data) => dispatch(authActions.signUp(data)),
});
export default connect(null, mapDispatchToProps)(FloorModal);
