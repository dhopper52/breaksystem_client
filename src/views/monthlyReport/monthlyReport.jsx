import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import moment from "moment-timezone";

import ReactTable from "../../shared/components/reactTable/reactTable";
import CustomModal from "../../shared/components/Modal/Modal";
import SupervisorModal from "../modal/supervisorModal/supervisorModal";
import {
  action,
  reportType,
  roleType,
  reportTypeList,
} from "../../system/constants/globleConstants/globleConstants";
import { modalActions } from "../../redux/actions/modal.actions/modal.actions";
import { FormLabel } from "../../shared/components/wrapperComponent/wrapperComponent";
import SearchModal from "../modal/searchModal/searchModal";
import ProjectModal from "../modal/projectModal/projectModal";
import UserModal from "../modal/userModal/userModal";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
import { breakActions } from "../../redux/actions/break,action/break.action";
import { authActions } from "../../redux/actions/auth.action/auth.actions";
import { exportToExcel } from "../../shared/utilities/utilities";
import { exportToExcelDaily } from "../../shared/utilities/utilities";
import { formattedDate } from "../../shared/utilities/utilities";

const MonthlyReport = (props) => {
  const localUser = getCurrentUserLocalStorage();
  console.log(localUser);

  const [reportTypeState, setreportTypeState] = useState(reportType.team);
  const [floorList, setfloorList] = useState([]);
  const [breakList, setbreakList] = useState([]);

  const monthlyHeaders = [
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
      id: "usedBreakTime",
      name: "Used Break Time",
      selector: (row) => row.usedBreakTime,
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
      name: "Allowed Break Time",
      selector: (row) => row.totalBreakTime,
      reorder: true,
      sortable: true,
    },
    {
      id: "totalFine",
      name: "Total Fine",
      selector: (row) => row.totalFine,
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
    //               // action: UserActionType.Details,
    //               heading: "View User",
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
    //               // action: UserActionType.Delete,
    //               heading: "Delete User",
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
    //               // action: UserActionType.Update,
    //               heading: "Update User",
    //               size: "lg",
    //             },
    //           });
    //         }}
    //       ></i>
    //     </div>
    //   ),
    // },
  ];
  const dailyHeaders = [
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
      id: "date",
      name: "Date",
      selector: (row) => row?.date?.slice(0, 10),
      // formattedDate(row.date),
      // moment(new Date(row.date)).format("YYYY-MM-DD"),
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
                    item.breakKey + 0.3 < item.breakValue ? "bg-danger" : "bg-success"
                  } p-2 text-bg-danger text-center`}
                  style={{ width: "36px", height: "32px" }}
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
      selector: (row) => row.totalBreakTime,
      reorder: true,
      sortable: true,
    },
    {
      id: "fine",
      name: "Fine",
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
  const [columnsList, setcolumnsList] = useState(monthlyHeaders);
  const [exportHeader, setExportHeaders] = useState([]);
  const [reportName, setReportName] = useState("monthly");

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

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const {
    register,
    handleSubmit,
    // setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reportType: reportTypeList[1].value,
      endDate: new Date(),
      startDate: thirtyDaysAgo,
    },
  });
  const handleSelectChange = (event) => {
    setreportTypeState(event.target.value);
    // setcolumnsList(
    //   event.target.value === reportType.SINGLE_USER
    //     ? dailyHeaders
    //     : monthlyHeaders
    // );
  };

  const onSubmit = (data) => {
    // const startDate = format(new Date(data.startDate), "dd/MM/yyyy");
    // const endDate = format(new Date(data.endDate), "dd/MM/yyyy");
    // console.log("Formatted Start Date:", startDate);
    // console.log({ ...data, startDate, endDate });
    // console.log(data);
    // props.handleModal();
    // setactionType({
    //   rowData: {
    //     action: action.Search,
    //     heading: "Search",
    //     size: "md",
    //   },
    // });
    console.log(localUser);

    const dataObj = {
      ...data,
      // date: data,
      _id: Number(data._id),
      floorId: data.floorId ? Number(data.floorId) : Number(localUser._id),
    };
    console.log(dataObj);
    props.monthlyBreaks(dataObj);
    setcolumnsList(
      data.reportType === reportType.SINGLE_USER ? dailyHeaders : monthlyHeaders
    );
  };

  useEffect(() => {
    props.getFloor();
    props.monthlyBreaks({ floorId: localUser._id });
  }, []);

  useEffect(() => {
    setfloorList(props?.floorList);
    setbreakList(props?.breakList);
  }, [props?.floorList, props?.breakList]);

  useEffect(() => {
    const updatedExportHeaders = columnsList?.map((h) => ({
      key: h.id,
      label: h.name,
    }));
    console.log(updatedExportHeaders);
    setExportHeaders(updatedExportHeaders);
  }, [columnsList]);

  return (
    <div>
      <h3>Monthly Report</h3>
      <div className="d-flex d-sm-flex flex-column flex-sm-row justify-content-end mt-5">
        <div className="d-flex justify-content-end">
          {/* {localUser.role === roleType.SUPERVISOR ? ( */}
          {/* <Button
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
              </Button> */}
          {/* ) : ( */}
          <ButtonGroup aria-label="Basic example" className="mt-3 mt-sm-0">
            <Button
              variant="secondary color-theme"
              onClick={() => {
                reportTypeState === reportType?.SINGLE_USER
                  ? exportToExcelDaily(
                      breakList,
                      exportHeader,
                      `${localUser?.floorName} Daily Break Report`
                    )
                  : exportToExcel(
                      breakList,
                      exportHeader,
                      `${localUser?.floorName} Monthly Break Report`
                    );
              }}
            >
              <i class="fa-solid fa-download"></i> Export CSV
            </Button>
          </ButtonGroup>
          {/* )} */}
        </div>
      </div>
      <div className="filter-container ">
        <h4 className="mb-4">
          Filter <i class="fa-solid fa-filter"></i>
        </h4>
        <Form
          noValidate
          className="ViewUserContent  mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row mb-0 mb-md-2">
            <div className="col-lg-6 col-md-6">
              <div class="field fieldSignup ">
                <FormLabel>Report Type</FormLabel>

                <Form.Select
                  className={`rounded-0 light-black`}
                  {...register("reportType")}
                  onChange={(e) => {
                    handleSelectChange(e);
                  }}
                >
                  <option value="">Select Type</option>
                  {reportTypeList?.map((project) => (
                    <option key={project?.id} value={project?.value}>
                      {project?.label}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>{" "}
            {reportTypeState === reportType?.SINGLE_USER ? (
              <div className="col-lg-6 col-md-6 mt-3 mt-md-0">
                <div class="field fieldSignup">
                  <FormLabel>Id</FormLabel>
                  <Form.Control
                    className={`rounded-0 light-black  `}
                    {...register("_id")}
                    placeholder="Search"
                  />
                </div>
              </div>
            ) : (
              <>
                {" "}
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
                            {localUser._id === item?._id ? (
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
              </>
            )}
          </div>
          <div className="row">
            {reportTypeState === reportType.SINGLE_USER &&
            localUser.role === roleType.SUPER_ADMIN ? (
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
                        {localUser._id === item?._id ? (
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
              <FormLabel>Start Date</FormLabel>
              <div className="row">
                <div className="col">
                  {" "}
                  <Controller
                    name="startDate"
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
            <div className="col">
              <FormLabel>End Date</FormLabel>
              <div className="row">
                <div className="col">
                  <Controller
                    name="endDate"
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
          </div>
          <button type="submit" class="btn btn-dark color-theme">
            Search
          </button>
        </Form>
      </div>

      <ReactTable
        columns={columnsList}
        items={breakList}
        // onSort={onSort}
        // progressPending={userList.length <= 0 ? false : false}
      />
      <CustomModal
        // size={actionType.rowData.size}
        centered={true}
        scrollable={true}
        setShow={onSetShow}
        show={props.modalOpen}
        heading={actionType?.rowData?.heading}
      >
        {actionType?.rowData?.action === action.Search ? (
          <SearchModal onHide={onSetShow} />
        ) : actionType.rowData.action === action.Project ? (
          <ProjectModal onHide={onSetShow} />
        ) : actionType.rowData.action === action.User ? (
          <UserModal />
        ) : (
          <SupervisorModal onHide={onSetShow} />
        )}
      </CustomModal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modalOpen: state?.modalReducer?.modalOpen,
  breakList: state?.breakReducer?.breakList?.data,
  floorList: state?.authReducer?.floorList?.data?.floorList,

  // userGroupNameList: state.userGroupReducer,
  // userList: state.userReducer,
});
const mapDispatchToProps = (dispatch) => ({
  getFloor: () => dispatch(authActions.getFloor()),
  handleModal: () => dispatch(modalActions.handleModal()),
  monthlyBreaks: (data) => dispatch(breakActions.getBreaksMonthly(data)),

  // getUserGroupNameList: (data) =>
  //   dispatch(userGroupActions.getUsersGroup(data)),
  // getUserList: (data) => dispatch(userActions.getUsers(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MonthlyReport);
