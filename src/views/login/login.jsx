import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
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

  const onSubmit = async (data) => {
    console.log(data);
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
        <div class="card p-5 rounded-0 border-0 width-30rem">
          <div class="card-body">
            <div className="border-left ">
              <div className=" ms-2 default-color fs-4 fw-bold">
                {" "}
                D-Hoppers Service Solutions
              </div>
            </div>
            <form
              action="#"
              noValidate
              className="ViewUserContent mt-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div class="field fieldSignup mb-3">
                <FormLabel> Floor Id</FormLabel>
                <InputGroup>
                  <InputGrouptext>
                    <i class="fa-solid fa-building color-gray"></i>
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
                  <p className="error-text ">{errors.floorId.message}</p>
                )}
              </div>
              <div className="space"></div>
              <div class="field space fieldSignup mb-3">
                <FormLabel>Password</FormLabel>
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
              <div class="mt-5 mb-2">
                <Button
                  className="submitButton btn btn-primary  "
                  type="submit"
                >
                  {[props.loading ? <Spinner animation="border" /> : "Login"]}
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
