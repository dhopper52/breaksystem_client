import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useDispatch } from "react-redux";
import "./dashboard.css";

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
import ClockComponentTwo from "../../shared/components/clockComponentTwo/clockComponentTwo";
import { authActions } from "../../redux/actions/auth.action/auth.actions";
import { formateTime } from "../../shared/utilities/utilities";
import { clockActions } from "../../redux/actions/clock.actions/clock.action";
import Spinner from "react-bootstrap/Spinner";
import { HashLoader } from "react-spinners";

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
    const query =
      !isNaN(Number(data._id)) && data._id.trim() !== ""
        ? { _id: Number(data._id), floorId: localUser._id }
        : { name: data._id.trim(), floorId: localUser._id };

    props.getUser(query);
  };

  useEffect(() => {
    // Fetch data immediately on the first load
    if (localUser.role === roleType.SUPERVISOR) {
      props.getClocksFn(localUser);
    } else {
      props.getAdminClocksFn();
    }
    props.getUserList();
    props.getFloor();
    setBreakList(props.activeBreaks);
  }, [props.searchModal, props.modalOpen]);

  console.log(props?.modalOpen, "props?.modalOpen");

  useEffect(() => {
    console.log("activeBreaks runs useffect");
    console.log(props.activeBreaks);
    setBreakList(props.activeBreaks);
  }, [props.activeBreaks]);

  console.log(props.loading, "loading");
  return (
    <div className="dashboard-container">
      {!props.loading ? (
        <>
          <h3 className="dashboard-title">Dashboard</h3>
          <div className="dashboard-actions">
            <div className="action-buttons">
              {localUser.role === roleType.SUPERVISOR ? (
                <ButtonGroup
                  aria-label="Basic example"
                  className="mt-3 mt-sm-0"
                >
                  <Button
                    className="action-button create-button"
                    onClick={() => {
                      setactionType({
                        rowData: {
                          action: action.User,
                          // heading: "Create User",
                          size: "md",
                        },
                      });
                      props.handleModal();
                    }}
                  >
                    <i className="fa-solid fa-plus" /> Create User
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup
                  aria-label="Basic example"
                  className="mt-3 mt-sm-0"
                >
                  <Button
                    className="action-button create-button"
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
                    <i className="fa-solid fa-plus" /> Create Floor
                  </Button>
                </ButtonGroup>
              )}
            </div>
          </div>
          <>
            {localUser.role === "superAdmin" ? (
              <></>
            ) : (
              <Form
                noValidate
                className="search-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="search-field">
                  <Form.Control
                    className={`search-input ${
                      errors._id ? "error-border" : ""
                    }`}
                    {...register("_id", {
                      required: "Please fill search field",
                    })}
                    placeholder="User Name"
                  />
                </div>
                <button type="submit" className="search-button">
                  <i className="fas fa-search me-2"></i>
                  Search
                </button>
              </Form>
            )}
          </>
          <div className="stats-container">
            <div className="row gx-4 justify-content-center">
              <div className="col-md-4 mt-3 mb-2 col-sm-5">
                <div className="stat-card floor-card">
                  <div className="stat-icon">
                    <i className="fa-solid fa-building"></i>
                  </div>
                  <div className="stat-content">
                    <p className="stat-label">Floor</p>
                    <p className="stat-value">{props?.floorListcount?.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-3 mb-2 col-sm-5">
                <div className="stat-card user-card">
                  <div className="stat-icon">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <div className="stat-content">
                    <p className="stat-label">Users</p>
                    <p className="stat-value">{props?.userListcount?.data?.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="active-breaks-section">
            <div className="section-header">
              <h3 className="section-title">
                Active Breaks <span className="break-count">{breakList.length}</span>
              </h3>
            </div>
            <div className="breaks-grid">
              {breakList?.map((breakItem, index) => {
                return (
                  <div className="break-item" key={index}>
                    <ClockComponentTwo
                      data={breakItem}
                      strtTime={formateTime(breakItem?.startTime)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
            // heading="Searched User"
          >
            <SearchModal onHide={onSetSearchShow} />
          </CustomModal>
        </>
      ) : (
        <div className="loading-container">
          <HashLoader color="#4361ee" size={42} speedMultiplier={2} />
        </div>
      )}
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
  activeBreaks: state?.clock?.currentBreaks,
  loading: state.breakReducer?.loading,
});
const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(modalActions.handleModal()),
  handleSearchModal: () => dispatch(modalActions.handleSearchModal()),
  getUserList: () => dispatch(userActions.getUsersLength()),
  getUser: (data) => dispatch(userActions.getUser(data)),
  getFloor: () => dispatch(authActions.getFloor()),
  getClocksFn: (data) => dispatch(clockActions.getClock(data)),
  getAdminClocksFn: () => dispatch(clockActions.getAdminClock()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
