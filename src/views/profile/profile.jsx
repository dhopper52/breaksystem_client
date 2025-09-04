import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { modalActions } from "../../redux/actions/modal.actions/modal.actions";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
import { authActions } from "../../redux/actions/auth.action/auth.actions";
import {
  InputGrouptext,
  FormLabel,
} from "../../shared/components/wrapperComponent/wrapperComponent";
import { roleType } from "../../system/constants/globleConstants/globleConstants";

const Profile = (props) => {
  const [floorList, setfloorList] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState({});

  const localUser = getCurrentUserLocalStorage();
  // console.log({ localUser });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (localUser.role === roleType.SUPER_ADMIN) {
      // console.log(floorList);
      const selectedFlor = floorList.find((floor) => floor._id == data.floorId);
      const dataObj = {
        _id: selectedFlor._id,
        floorName: selectedFlor.floorName,
        role: selectedFlor.role,
        password: data.password,
      };
      // console.log(dataObj);
      props.updateFloor(dataObj);
    } else {
      const dataObj = {
        _id: localUser._id,
        floorName: localUser.floorName,
        role: localUser.role,
        password: data.password,
      };

      props.updateFloor(dataObj);
    }
  };

  useEffect(() => {
    props.getFloor();
  }, []);

  useEffect(() => {
    setfloorList(props?.floorList);
  }, [props?.floorList]);

  return (
    <div>
      <h3>Profile</h3>
      <div className="d-flex justify-content-center mt-5">
        <div class="text-center">
          <h4>Change Password</h4>

          <Form
            noValidate
            className="ViewUserContent   mt-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            {localUser.role === roleType.SUPER_ADMIN ? (
              <div className="col-lg-12 col-md-12">
                {" "}
                <div class="field fieldSignup mb-3 mt-2">
                  <FormLabel>Select Floor</FormLabel>
                  <Form.Select
                    className={`rounded-0 light-black ${
                      errors.floorId ? "error-border" : ""
                    }`}
                    {...register("floorId", {
                      required: "Floor is Required",
                    })}
                    aria-label="Default select example"
                  >
                    <option value="">Select Floor</option>
                    {floorList?.map((item) => (
                      <option key={item?._id} value={item?._id}>
                        {item?.floorName}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.floorId && (
                    <p className="error-text ">{errors.floorId.message}</p>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="field fieldSignup d-flex flex-column  align-items-center ">
              <div className="field fieldSignup mt-4">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="number"
                  className={`rounded-0 light-black ${
                    errors.password ? "error-border" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="error-text ">{errors.password.message}</p>
                )}
              </div>
              <div>
                {" "}
                <button type="submit" class="btn btn-dark color-theme mt-3">
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modalOpen: state?.modalReducer?.modalOpen,
  floorList: state?.authReducer?.floorList?.data?.floorList,
});
const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(modalActions.handleModal()),
  updateFloor: (data) => dispatch(authActions.updateFloorAction(data)),
  getFloor: () => dispatch(authActions.getFloor()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
