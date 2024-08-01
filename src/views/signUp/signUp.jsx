import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

import { authActions } from "../../redux/actions/auth.action/auth.actions";
import {
  FormLabel,
  InputGrouptext,
} from "../../shared/components/wrapperComponent/wrapperComponent";

const Signup = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const password = watch("password");
  const onSubmit = (data) => {
    // props.signUp(data, navigate);
  };

  return (
    <div className="bg-gray">
      <div className="d-flex justify-content-center h-100 min-vh-100 align-items-center">
        <div class="card p-3 rounded-0 border-0 width-30rem ">
          <div class="card-body">
            <div className="border-left ">
              <div className=" ms-2 default-color fs-4 fw-bold">
                D-Hoppers Service Solutions
              </div>
            </div>
            <form
              action="#"
              noValidate
              className="ViewUserContent mt-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div class="field fieldSignup mb-3">
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <InputGrouptext>
                    <i class="fa-regular fa-user color-gray"></i>{" "}
                  </InputGrouptext>
                  <Form.Control
                    className={`rounded-0 light-black ${
                      errors.name ? "error-border" : ""
                    }`}
                    {...register("name", {
                      required: "Name is Required",
                      minLength: 3,
                      pattern: {
                        value: /^[^\s]+(?:$|.*[^\s]+$)/,
                        message: "Enter valid name",
                      },
                    })}
                  />
                </InputGroup>
                {errors.name && (
                  <p className="error-text ">{errors.name.message}</p>
                )}
              </div>
              <div class="field fieldSignup mb-3">
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputGrouptext>
                    <i class="fa-regular fa-user color-gray"></i>{" "}
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
              <div className="space"></div>
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
              <div class="field fieldSignup mb-3">
                <FormLabel> Confirm Password</FormLabel>
                <InputGroup className="">
                  <InputGrouptext>
                    <i class="fa-solid fa-key color-gray"></i>{" "}
                  </InputGrouptext>
                  <Form.Control
                    className={` light-black rounded-0 ${
                      errors.password ? "error-border" : ""
                    }`}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      pattern: {
                        value: /^\s*[^\s]+(?:\s+[^\s]+)*\s*$/,
                        message: "invalid passsword",
                      },
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    id="password"
                    type="password"
                  />
                </InputGroup>
                {errors.confirmPassword && (
                  <p className=" error-text ">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div class="mt-5 mb-2">
                <Button
                  className="submitButton btn btn-primary  "
                  type="submit"
                >
                  Sign Up
                  {/* {[
                    props.loading ? <Spinner animation="border" /> : " Sign Up",
                  ]} */}
                </Button>
              </div>
              <div class="signup-link mt-2 light-black d-flex justify-content-center">
                Already have an Account?
              </div>
              <div class="signup-link mt-2 d-flex justify-content-center">
                <Link to="/login">Login Now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  //   loading: state.authReducer.loading,
});
const mapDispatchToProps = (dispatch) => ({
  //   signUp: (data, navigate) => dispatch(authActions.signUp(data, navigate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
