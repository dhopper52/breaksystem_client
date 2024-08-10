import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
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
import ReactTable from "../../shared/components/reactTable/reactTable";

const User = (props) => {
  const dispatch = useDispatch();
  const localUser = getCurrentUserLocalStorage();
  const [userListData, setUserListData] = useState([]);
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
      floorId:
        localUser?.role === roleType.SUPER_ADMIN
          ? Number(data.floorId)
          : localUser?._id,

     };

     props.getUserList(dataObj)
    // props.getSearchUser(dataObj);
 
  };
  const headers = [
    {
      id: "_id",
      name: "User Id",
      selector: (row) => row._id,
      reorder: true,
      sortable: true,
    },
    {
      id: "name",
      name: "Name",
      selector: (row) => row.name,
      reorder: true,
      sortable: true,
    },
    {
      id: "floorId",
      name: "Floor Id",
      selector: (row) => row.floorId,
      reorder: true,
      sortable: true,
    },

    {
      id: "shiftHours",
      name: "Shift Hours",
      selector: (row) => row.shiftHours,
      reorder: true,
      sortable: true,
    },

    {
      id: "shiftStarts",
      name: "Shift Start",
      selector: (row) => row.shiftStarts,
      reorder: true,
      sortable: true,
    },
    {
      id: "shiftEnds",
      name: "Shift Ends",
      selector: (row) => row.shiftEnds,
      reorder: true,
      sortable: true,
    },
    {
      id: "actions",
      name: "Actions",
      cell: (row) => (
        <div>
{/*           <i
            class="fa-solid fa-eye pointer me-2 fs-12"
            onClick={() => {
              onSetShow();
              setactionType({
                rowData: {
                  row: row,
                  for: action.Break,
                  action: action.Details,
                  heading: "View Daily Break",
                  size: "lg",
                },
              });
            }}
          />{" "} */}
           <i
            class="fa-solid fa-pen-to-square pointer fs-12"
            onClick={() => {
              onSetShow();
              setactionType({
                rowData: {
                  row: row,
                  for: "update",
                  action: action.Update,
                  heading: "Update User",
                  size: "md",
                },
              });
            }}
          ></i>
          <i
            className="fa-solid fa-trash pointer me-2 colorText ps-3  fs-12"
            onClick={() => {
              onSetShow();
              setactionType({
                rowData: {
                  row: row,
                  for: action.Break,
                  action: action.Delete,
                  heading: "Delete Daily Break",
                  size: "md",
                },
              });
            }}
          ></i>
         
        </div>
      ),
    },
  ];
  console.log(props.userData);

  // useEffect(() => {
  //   if (props?.userData?.userData?.length >= 1) {
  //     setUserListData(props?.userData?.userData);
  //     console.log(
  //       props?.userData?.userData,
  //       "    console.log(props.userData   "
  //     );
  //   }
  // }, [props?.userData]);

  useEffect(() => {
    setUserListData(props?.userListcount?.data);
  }, [props?.userListcount?.data]);

  // useEffect(() => {
  //   props.getUserList(
  //     localUser?.role === roleType.SUPER_ADMIN ? "" : { floorId: localUser._id }
  //   );
  //   props.getFloor();
  // }, [props?.modalOpen === false, props?.clockData, dispatch]);
  useEffect(() => {
    props.getUserList(
      localUser?.role === roleType.SUPER_ADMIN ? "" : { floorId: localUser._id }
    );
    // props.getFloor();
  }, []);
  return (
    <div className="dashboard-container">
      <h3>Users</h3>
      <div className="d-flex d-sm-flex flex-column flex-sm-row justify-content-end mt-5">
        <div className="d-flex justify-content-end">
          <Button
            className="supervisor-btn border-0 btn btn-primary color-theme mt-3 mt-sm-0"
            onClick={() => {
              setactionType({
                rowData: {
                  action: action.User,
                  heading: "Create User",
                  size: "md",
                  for: "create",
                },
              });
              props.handleModal();
            }}
          >
            <i class="fa-solid fa-plus" /> Create User
          </Button>
        </div>
      </div>

      <Form
        noValidate
        className="ViewUserContent  d-flex mt-3 mb-5"
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

      <ReactTable
        columns={headers}
        items={userListData}
        // progressPending={userList.length <= 0 ? false : false}
      />
      <CustomModal
        centered={true}
        scrollable={true}
        setShow={onSetShow}
        show={props.modalOpen}
        heading={actionType.rowData.heading}
      >
        {/* {actionType.rowData.action === action.Create ? (
          <FloorModal onHide={onSetShow} />
        ) : actionType.rowData.action === action.User ? ( */}
        <UserModal
          for={actionType?.rowData?.for}
          row={actionType.rowData.row}
          onHide={onSetShow}
        />
        {/* // ) : (
        //   <SearchModal onHide={onSetShow} />
        // )} */}
      </CustomModal>
      {/* 
      <CustomModal
        centered={true}
        scrollable={true}
        setShow={onSetSearchShow}
        show={props.searchModal}
        heading="Search User"
      >
        <SearchModal onHide={onSetSearchShow} />
      </CustomModal> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  modalOpen: state?.modalReducer?.modalOpen,
  searchModal: state?.modalReducer?.searchModal,
  userData: state?.userReducer,
  clockData: state?.clock,
  floorListcount: state?.authReducer?.floorList?.data?.floorList,
  userListcount: state?.userReducer?.newUserListLemgth,
});
const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(modalActions.handleModal()),
  handleSearchModal: () => dispatch(modalActions.handleSearchModal()),
  getUserList: (data) => dispatch(userActions.getUsersList(data)),
  getSearchUser: (data) => dispatch(userActions.getSearchUser(data)),
  getFloor: () => dispatch(authActions.getFloor()),
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
