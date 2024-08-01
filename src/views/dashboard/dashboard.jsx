import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import CustomModal from "../../shared/components/Modal/Modal";
import {
  action,
  roleType,
} from "../../system/constants/globleConstants/globleConstants";
import { modalActions } from "../../redux/actions/modal.actions/modal.actions";
import SearchModal from "../modal/searchModal/searchModal";
import UserModal from "../modal/userModal/userModal";
import FloorModal from "../modal/floorModal/floorModal";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
import { userActions } from "../../redux/actions/user.action/user.action";
import { ToastifyUtilities } from "../../system/Toastify/toastifyUtilities";
import ClockComponentTwo from "../../shared/components/clockComponentTwo/clockComponentTwo";
import { authActions } from "../../redux/actions/auth.action/auth.actions";

const Dashboard = (props) => {
  const localUser = getCurrentUserLocalStorage();
  const [breakList, setBreakList] = useState([]);
  const [actionType, setactionType] = useState({
    rowData: {
      action: "",
      size: "",
      heading: "",
    },
  });

  const onSetShow = () => {
    props.handleModal();
  };

  const onSetSearchShow = () => {
    props.handleSearchModal();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dataObj = {
      _id: Number(data._id),
      floorId: localUser._id,
    };
    props.getUser(dataObj);
    // setactionType({
    //   rowData: {
    //     action: action.Search,
    //     heading: "Search",
    //     size: "md",
    //   },
    // });
    // props.handleModal();
  };

  useEffect(() => {
    const newBreakList = Object.values(props.clockData);
    props.getUserList();
    props.getFloor();
    setBreakList(newBreakList);
  }, [props?.modalOpen === false, props?.clockData]);

  return (
    <div className="dashboard-container">
      <h3>Dashboard</h3>
      <div className="d-flex d-sm-flex flex-column flex-sm-row justify-content-end mt-5">
        <div className="d-flex justify-content-end">
          {localUser.role === roleType.SUPERVISOR ? (
            <Button
              className="supervisor-btn border-0 btn btn-primary color-theme mt-3 mt-sm-0"
              onClick={() => {
                setactionType({
                  rowData: {
                    action: action.User,
                    heading: "Create User",
                    size: "md",
                  },
                });
                props.handleModal();
              }}
            >
              <i class="fa-solid fa-plus" /> Create User
            </Button>
          ) : (
            <ButtonGroup aria-label="Basic example" className="mt-3 mt-sm-0">
              <Button
                variant="secondary color-theme"
                onClick={() => {
                  setactionType({
                    rowData: {
                      action: action.Create,
                      heading: "Create Floor",
                      size: "md",
                    },
                  });
                  props.handleModal();
                }}
              >
                <i class="fa-solid fa-plus" /> Create Floor
              </Button>
            </ButtonGroup>
          )}
        </div>
      </div>
      <>
        {" "}
        {localUser.role === "superAdmin" ? (
          <></>
        ) : (
          <Form
            noValidate
            className="ViewUserContent  d-flex mt-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div class="field fieldSignup me-3">
              <Form.Control
                type="number"
                className={`rounded-0 light-black ${
                  errors._id ? "error-border" : ""
                }`}
                {...register("_id", {
                  required: "Please fill search field",
                })}
                placeholder="User Id"
              />
            </div>{" "}
            <button type="submit" class="btn btn-dark color-theme">
              Search
            </button>
          </Form>
        )}
      </>
      <div className="hero-banner-container">
        <div className="row gx-3 justify-content-center">
          <div className="col-md-4 mt-2 mb-2 col-sm-5">
            <div className=" hero-banner p-4  d-flex  justify-content-evenly">
              <div className="icon-div user-color">
                <i class="fa-solid fa-user" />
              </div>
              <div>
                <p className="project-text ">Floor</p>
                <p className="project-quantity">
                  {props?.floorListcount?.length}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2 mb-2 col-sm-5">
            <div className=" hero-banner p-4  d-flex  justify-content-evenly">
              <div className="icon-div supervisor-color">
                <i class="fa-solid fa-file" />
              </div>
              <div>
                <p className="project-text">Users</p>
                <p className="project-quantity">
                  {props?.userListcount?.data?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {localUser.role === "superAdmin" ? (
        <></>
      ) : (
        <div className=" mt-3">
          <h3 className="mb-4">Active Breaks</h3>
          {/* <div className="row grid-container"> */}
          <div className=" grid-container">
            {breakList?.map((breakItem) => {
              return (
                // <div className="col-md-4 col-sm-6 g-2 clock-outer">
                <div className=" clock-outer">
                  <div className="clock-container">
                    <ClockComponentTwo data={breakItem} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <CustomModal
        centered={true}
        scrollable={true}
        setShow={onSetShow}
        show={props?.modalOpen}
        heading={actionType.rowData.heading}
      >
        {actionType.rowData.action === action.Create ? (
          <FloorModal onHide={onSetShow} />
        ) : actionType.rowData.action === action.User ? (
          <UserModal />
        ) : (
          <SearchModal onHide={onSetShow} />
        )}
      </CustomModal>

      <CustomModal
        centered={true}
        scrollable={true}
        setShow={onSetSearchShow}
        show={props.searchModal}
        heading="Search User"
      >
        <SearchModal onHide={onSetSearchShow} />
      </CustomModal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modalOpen: state?.modalReducer?.modalOpen,
  searchModal: state?.modalReducer?.searchModal,
  userData: state?.userReducer,
  clockData: state?.clock,
  floorListcount: state?.authReducer?.floorList?.data?.floorList,
  userListcount: state?.userReducer?.newUserList,
});
const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(modalActions.handleModal()),
  handleSearchModal: () => dispatch(modalActions.handleSearchModal()),

  getUserList: () => dispatch(userActions.getUsersLength()),
  getUser: (data) => dispatch(userActions.getUser(data)),
  getFloor: () => dispatch(authActions.getFloor()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
