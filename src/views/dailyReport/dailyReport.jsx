import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import { useForm, Controller } from "react-hook-form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import ReactTable from "../../shared/components/reactTable/reactTable";
import CustomModal from "../../shared/components/Modal/Modal";
import SupervisorModal from "../modal/supervisorModal/supervisorModal";
import {
  action,
  floorList,
  roleType,
} from "../../system/constants/globleConstants/globleConstants";
import { modalActions } from "../../redux/actions/modal.actions/modal.actions";
import { FormLabel } from "../../shared/components/wrapperComponent/wrapperComponent";
import { usersList } from "../../system/constants/globleConstants/globleConstants";
import SearchModal from "../modal/searchModal/searchModal";
import ProjectModal from "../modal/projectModal/projectModal";
import UserModal from "../modal/userModal/userModal";
import BreakModal from "../modal/breakModal/breakModal";
import { authActions } from "../../redux/actions/auth.action/auth.actions";
import { breakActions } from "../../redux/actions/break,action/break.action";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
import { exportToExcelDaily } from "../../shared/utilities/utilities";
import { HashLoader } from "react-spinners";
import { totalTimeUsed } from "../../shared/utilities/utilities";
const DailyReport = (props) => {
  const localUser = getCurrentUserLocalStorage();
  console.log(localUser);
  const [floorList, setfloorList] = useState([]);
  const [breakList, setbreakList] = useState([]);
  const [exportHeader, setExportHeaders] = useState([]);

  const headers = [
    {
      id: "userId",
      name: "User Id",
      selector: (row) => row.userId,
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
      id: "shiftHours",
      name: "Shift Hours",
      selector: (row) => row.shiftHours,
      reorder: true,
      sortable: true,
    },

    {
      id: "usedbreaks",
      name: "Used Breaks",
      selector: (row) => {
        return (
          <div className="d-flex flex-column mt-1 mb-1">
            {row?.usedbreaks?.map((item, index) => (
              <div className="d-flex">
                {" "}
                <div
                  className="bg-dark m-1 p-2 text-bg-danger text-center"
                  style={{ width: "36px", height: "32px" }}
                  key={index}
                >
                  {item.breakKey === 21 ? 20 : item.breakKey}
                </div>
                <div className="align-content-center">=</div>
                <div
                  className={`m-1 ${
                    item.breakKey + 0.3 < item.breakValue
                      ? "bg-danger"
                      : "bg-success"
                  } p-2 text-bg-danger text-center`}
                  style={{ width: "45px", height: "32px" }}
                  key={index}
                >
                  {item.breakValue}
                </div>
              </div>
            ))}
          </div>
        );
      },
      reorder: true,
      sortable: true,
    },
    {
      id: "emergencyShortBreak",
      name: "Emergency Short Break",
      selector: (row) => row.emergencyShortBreak,
      reorder: true,
      sortable: true,
    },

    {
      id: "totalBreakTime",
      name: "Total Break Time",
      selector: (row) => {
        return (
          <div
            className={`m-1 ${
              totalTimeUsed(row.shiftHours, row.totalBreakTime)
                ? "bg-danger"
                : "bg-success"
            } p-2 text-bg-danger text-center`}
            style={{ maxWidth:"fit-content", height: "32px" }}
          >
            {row.totalBreakTime}
          </div>
        );
      },
      reorder: true,
      sortable: true,
    },

    {
      id: "fine",
      name: "Total Fine",
      selector: (row) => row.fine,
      reorder: true,
      sortable: true,
    },
    // {
    //   id: "actions",
    //   name: "Actions",
    //   cell: (row) => (
    //     <div>
    //       <i
    //         class="fa-solid fa-eye pointer me-2 fs-12"
    //         onClick={() => {
    //           onSetShow();
    //           setactionType({
    //             rowData: {
    //               row: row,
    //               for: action.Break,
    //               action: action.Details,
    //               heading: "View Daily Break",
    //               size: "lg",
    //             },
    //           });
    //         }}
    //       />{" "}
    //       <i
    //         className="fa-solid fa-trash pointer me-2 colorText  fs-12"
    //         onClick={() => {
    //           onSetShow();
    //           setactionType({
    //             rowData: {
    //               row: row,
    //               for: action.Break,
    //               action: action.Delete,
    //               heading: "Delete Daily Break",
    //               size: "md",
    //             },
    //           });
    //         }}
    //       ></i>
    //       <i
    //         class="fa-solid fa-pen-to-square pointer fs-12"
    //         onClick={() => {
    //           onSetShow();
    //           setactionType({
    //             rowData: {
    //               row: row,
    //               for: action.Break,
    //               action: action.Update,
    //               heading: "Update Daily Break",
    //               size: "lg",
    //             },
    //           });
    //         }}
    //       ></i>
    //     </div>
    //   ),
    // },
  ];

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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date(),
      floorId: localUser._id,
    },
  });

  const onSubmit = (data) => {
    // const date = format(new Date(data.date), "dd/MM/yyyy");
    // console.log("Formatted Start Date:", date);
    const dataObj = {
      ...data,
      // date: data,
      _id: Number(data._id),
      floorId: Number(data.floorId),
    };
    console.log(dataObj);
    props.dailyBreaks(dataObj);
  };

  const role = "supervir";

  useEffect(() => {
    props.getFloor();
    props.dailyBreaks({ floorId: localUser._id });
  }, []);

  useEffect(() => {
    setfloorList(props?.floorList);
    setbreakList(props?.breakList);
    console.log(props?.breakList);
  }, [props?.floorList, props?.breakList]);

  useEffect(() => {
    const updatedExportHeaders = headers?.map((h) => ({
      key: h.id,
      label: h.name,
    }));
    setExportHeaders(updatedExportHeaders);
  }, []);

  return (
    <div>
      {!props.loading ? (
        <>
          <h3>Daily Report</h3>

          <div className="d-flex d-sm-flex flex-column flex-sm-row justify-content-end mt-5">
            <div className="d-flex justify-content-end">
              {/* {localUser.role === roleType.SUPERVISOR ? ( */}
              {/* <Button
              className="supervisor-btn border-0 btn btn-primary color-theme mt-3 mt-sm-0"
              onClick={() => {
                setactionType({
                  rowData: {
                    action: action.Create,
                    heading: "Create User",
                    size: "md",
                  },
                });
                props.handleModal();
              }}
            >
              Create User
            </Button> */}
              {/* // ) : ( */}
              <ButtonGroup aria-label="Basic example" className="mt-3 mt-sm-0">
                {/* <Button
              variant="secondary color-theme"
              onClick={() => {
                setactionType({
                  rowData: {
                    action: action.Create,
                    heading: "Create User",
                    size: "md",
                  },
                });
                props.handleModal();
              }}
            >
              <i class="fa-solid fa-plus" /> Create User
            </Button> */}
                <Button
                  variant="secondary color-theme"
                  onClick={() => {
                    exportToExcelDaily(
                      breakList,
                      exportHeader,
                      `${localUser?.floorName} Daily Break Report`
                    );
                  }}
                >
                  <i class="fa-solid fa-download"></i> Export CSV
                </Button>
              </ButtonGroup>
              {/* // )} */}
            </div>
          </div>

          <div className="filter-container ">
            <h4 className="mb-4">
              FIlter <i class="fa-solid fa-filter"></i>
            </h4>
            <Form
              noValidate
              className="ViewUserContent  mt-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div class="field fieldSignup">
                    <FormLabel>User Id</FormLabel>
                    <Form.Control
                      type="number"
                      className={`rounded-0 light-black  `}
                      {...register("_id", {
                        pattern: {
                          value: /^[^\s]+(?:$|.*[^\s]+$)/,
                          message: "Enter a valid number",
                        },
                      })}
                      placeholder="User Id"
                    />
                  </div>
                </div>{" "}
                {localUser.role === roleType.SUPER_ADMIN ? (
                  <div className="col-lg-6 col-md-6 mt-3 mt-md-0">
                    {" "}
                    <div class="field fieldSignup ">
                      <FormLabel>Floor</FormLabel>

                      <Form.Select
                        className={`rounded-0 light-black`}
                        {...register("floorId")}
                      >
                        <option value="">Select Floor</option>

                        {floorList?.map((item) => (
                          <>
                            {localUser._id === item._id ? (
                              <></>
                            ) : (
                              <option key={item?._id} value={item?._id}>
                                {item?.floorName}
                              </option>
                            )}
                          </>
                        ))}
                      </Form.Select>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="row mt-2 mb-3 search">
                <div className="col">
                  <FormLabel>Date</FormLabel>
                  <div className="row">
                    <div className="col">
                      <Controller
                        name="date"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            dateFormat="dd/MM/yyyy"
                            onChange={(value) => field.onChange(value)}
                            value={field.value}
                            selected={field.value}
                          />
                        )}
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
              <button type="submit" class="btn btn-dark color-theme">
                Search
              </button>
            </Form>
          </div>
          <h3>Breaks</h3>

          <ReactTable
            columns={headers}
            items={breakList}
            // onSort={onSort}
            // progressPending={userList.length <= 0 ? false : false}
          />
          <CustomModal
            // size={actionType.rowData.size}
            centered={true}
            scrollable={true}
            setShow={onSetShow}
            show={props?.modalOpen}
            heading={actionType?.rowData?.heading}
          >
            {actionType?.rowData?.for === action.Break ? (
              <BreakModal data={actionType?.rowData} onHide={onSetShow} />
            ) : actionType?.rowData?.action === action.Create ? (
              <UserModal onHide={onSetShow} />
            ) : (
              <div className="align-content-center align-items-center d-flex justify-content-center spinner-conteiner">
                <HashLoader size={42} speedMultiplier={2} />
              </div>
            )}
          </CustomModal>
        </>
      ) : (
        <div className="align-content-center align-items-center d-flex justify-content-center spinner-conteiner">
          <HashLoader size={42} speedMultiplier={2} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  modalOpen: state?.modalReducer?.modalOpen,
  floorList: state?.authReducer?.floorList?.data?.floorList,
  breakList: state?.breakReducer?.breakList?.data,
  loading: state?.breakReducer?.loading,
});
const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(modalActions.handleModal()),
  getFloor: () => dispatch(authActions.getFloor()),
  dailyBreaks: (data) => dispatch(breakActions.getBreaksDaily(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DailyReport);
