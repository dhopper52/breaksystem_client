import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";

import { modalActions } from "../../redux/actions/modal.actions/modal.actions";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
import { authActions } from "../../redux/actions/auth.action/auth.actions";
import {
  InputGrouptext,
  FormLabel,
} from "../../shared/components/wrapperComponent/wrapperComponent";
import { roleType } from "../../system/constants/globleConstants/globleConstants";
import "./profile.css";

const Profile = (props) => {
  const [floorList, setfloorList] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'loading', 'success'

  const localUser = getCurrentUserLocalStorage();
  // console.log({ localUser });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitStatus('loading');
    
    try {
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
        await props.updateFloor(dataObj);
      } else {
        const dataObj = {
          _id: localUser._id,
          floorName: localUser.floorName,
          role: localUser.role,
          password: data.password,
        };

        await props.updateFloor(dataObj);
      }
      
      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error updating password:', error);
      setSubmitStatus('idle');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    props.getFloor();
  }, []);

  useEffect(() => {
    setfloorList(props?.floorList);
  }, [props?.floorList]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Profile Settings</h1>
        <p className="profile-subtitle">Manage your account and security preferences</p>
      </div>

      <div className="profile-card">
        <div className="user-info">
          <div className="user-info-header">
            <div className="user-avatar">
              {localUser?.floorName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <h4>{localUser?.floorName || 'User'}</h4>
              <p>{localUser?.role === roleType.SUPER_ADMIN ? 'Super Administrator' : 'Supervisor'}</p>
              <span className="role-badge">
                {localUser?.role === roleType.SUPER_ADMIN ? 'Admin' : 'Supervisor'}
              </span>
            </div>
          </div>
        </div>

        <Form
          noValidate
          className="profile-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {localUser.role === roleType.SUPER_ADMIN && (
            <div className="form-group">
              <label className="form-label">
                <i className="fa-solid fa-building me-2"></i>
                Select Floor
              </label>
              <Form.Select
                className={`form-select ${
                  errors.floorId ? "error-border" : ""
                }`}
                {...register("floorId", {
                  required: "Floor is Required",
                })}
                aria-label="Select Floor"
              >
                <option value="">Choose a floor...</option>
                {floorList?.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item?.floorName}
                  </option>
                ))}
              </Form.Select>
              {errors.floorId && (
                <p className="error-text">{errors.floorId.message}</p>
              )}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <i className="fa-solid fa-lock me-2"></i>
              New Password
            </label>
            <Form.Control
              type="password"
              className={`form-control ${
                errors.password ? "error-border" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters"
                }
              })}
              placeholder="Enter your new password"
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <div className="submit-section">
            <Button
              type="submit"
              className={`submit-button ${submitStatus}`}
              disabled={isLoading}
            >
              {submitStatus === 'loading' ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Updating...
                </>
              ) : submitStatus === 'success' ? (
                'Password Updated!'
              ) : (
                <>
                  <i className="fa-solid fa-save me-2"></i>
                  Update Password
                </>
              )}
            </Button>
          </div>
        </Form>
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
