import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Spinner, Alert } from "react-bootstrap";
import { authActions } from "../../redux/actions/auth.action/auth.actions";
import { connect } from "react-redux";

import {
  setCurrentUserLocalStorage,
  getCurrentUserLocalStorage,
} from "../../system/storageUtilites/storageUtilities";
import {
  FormLabel,
  InputGrouptext,
} from "../../shared/components/wrapperComponent/wrapperComponent";

import { authServices } from "../../services/auth.services/auth";
const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sessionMessage, setSessionMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  useEffect(() => {
    // Check if user was logged out due to password change or other reasons
    const params = new URLSearchParams(location.search);
    const reason = params.get('reason');
    
    if (reason) {
      switch (reason) {
        case 'password_changed':
          setSessionMessage('Your password was changed. Please login with your new password.');
          setMessageType('warning');
          break;
        case 'session_expired':
          setSessionMessage('Your session has expired. Please login again.');
          setMessageType('info');
          break;
        case 'auth_failed':
          setSessionMessage('Authentication failed. Please login again.');
          setMessageType('danger');
          break;
        default:
          setSessionMessage('You have been logged out. Please login again.');
          setMessageType('info');
      }
      
      // Clear URL parameters after reading them
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  const onSubmit = async (data) => {
    // console.log(data);
    // try {
    //   const response = await authServices.login(data);
    //   console.log(response);
    //   setCurrentUserLocalStorage(data);

    //   // navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }

    props.login(data, navigate);
  };

  return (
    <div className="bg-gray">
      <div className="d-flex justify-content-center h-100 min-vh-100 align-items-center">
        <div className="card p-5 rounded-0 border-0 width-30rem">
          <div className="card-body">
            {sessionMessage && (
              <Alert variant={messageType} className="mb-4">
                {sessionMessage}
              </Alert>
            )}
            <div className="border-left">
              <div className="ms-2 default-color fs-4 fw-bold">
                D-Hoppers Service Solutions
              </div>
            </div>
            <form
              action="#"
              noValidate
              className="ViewUserContent mt-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="field fieldSignup mb-3">
                <FormLabel> Floor Id</FormLabel>
                <InputGroup>
                  <InputGrouptext>
                    <i className="fa-solid fa-building color-gray"></i>
                  </InputGrouptext>
                  <Form.Control
                    type="number"
                    className={`rounded-0 light-black ${
                      errors.floorId ? "error-border" : ""
                    }`}
                    {...register("floorId", {
                      required: "Floor Id is Required",
                    })}
                  />
                </InputGroup>
                {errors.floorId && (
                  <p className="error-text">{errors.floorId.message}</p>
                )}
              </div>
              <div className="space"></div>
              <div className="field space fieldSignup mb-3">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputGrouptext>
                    <i className="fa-solid fa-key color-gray"></i>
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
                  <p className="error-text">{errors.password.message}</p>
                )}
              </div>
              <div className="mt-5 mb-2">
                <Button
                  className="submitButton btn btn-primary"
                  type="submit"
                >
                  {props.loading ? <Spinner animation="border" /> : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state?.authReducer?.loading,
});
const mapDispatchToProps = (dispatch) => ({
  login: (data, navigate) => dispatch(authActions.login(data, navigate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
