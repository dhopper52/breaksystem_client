import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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
import { FormLabel, InputGrouptext } from "../../shared/components/wrapperComponent/wrapperComponent";
import SearchModal from "../modal/searchModal/searchModal";
import ProjectModal from "../modal/projectModal/projectModal";
import UserModal from "../modal/userModal/userModal";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
import { breakActions } from "../../redux/actions/break.actions/break.action"; 
import { authActions } from "../../redux/actions/auth.action/auth.actions";
import { exportToExcel } from "../../shared/utilities/utilities";
import { exportToExcelDaily } from "../../shared/utilities/utilities";
import { formattedDate } from "../../shared/utilities/utilities";
import { HashLoader } from "react-spinners";
import { totalTimeUsed } from "../../shared/utilities/utilities";
import "./monthlyReport.css";

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
            style={{ maxWidth: "fit-content", height: "32px" }}
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
      name: "Fine",
      selector: (row) => row.fine,
      reorder: true,
      sortable: true,
    },
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
  };

  const onSubmit = (data) => {
    const dataObj = {
      ...data,
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
    <div className="monthly-report-container">
      {!props.loading ? (
        <>
          <div className="page-header mt-2">
            <h3 className="page-title">Monthly Report</h3>
            <div className="header-actions">
              <ButtonGroup aria-label="Basic example">
                <Button
                  className="export-btn"
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
            </div>
          </div>

          <div className="filter-card">
            <h4 className="filter-title">
              Filter <i class="fa-solid fa-filter"></i>
            </h4>
            <Form
              noValidate
              className="mt-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-inline-row filter-row">
                <div className="form-item">
                  <FormLabel className="form-label">Report Type</FormLabel>
                  <InputGroup>
                    <InputGrouptext>
                      <i className="fa-solid fa-sliders"></i>
                    </InputGrouptext>
                    <Form.Select
                      className="select"
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
                  </InputGroup>
                </div>
                {reportTypeState === reportType?.SINGLE_USER ? (
                  <div className="form-item">
                    <FormLabel className="form-label">Id</FormLabel>
                    <InputGroup>
                      <InputGrouptext>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </InputGrouptext>
                      <Form.Control
                        className="input"
                        {...register("_id")}
                        placeholder="Search"
                      />
                    </InputGroup>
                  </div>
                ) : (
                  <>
                    {localUser.role === roleType.SUPER_ADMIN ? (
                      <div className="form-item">
                        <FormLabel className="form-label">Floor</FormLabel>
                        <InputGroup>
                          <InputGrouptext>
                            <i className="fa-solid fa-building"></i>
                          </InputGrouptext>
                          <Form.Select className="select" {...register("floorId")}>
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
                        </InputGroup>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>

              {reportTypeState === reportType.SINGLE_USER &&
              localUser.role === roleType.SUPER_ADMIN ? (
                <div className="form-inline-row filter-row mt-2">
                  <div className="form-item">
                    <FormLabel className="form-label">Floor</FormLabel>
                    <InputGroup>
                      <InputGrouptext>
                        <i className="fa-solid fa-building"></i>
                      </InputGrouptext>
                      <Form.Select className="select" {...register("floorId")}>
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
                    </InputGroup>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="form-inline-row filter-row mt-2">
                <div className="form-item">
                  <FormLabel className="form-label">Start Date</FormLabel>
                  <InputGroup>
                    <InputGrouptext>
                      <i className="fa-regular fa-calendar"></i>
                    </InputGrouptext>
                    <Controller
                      name="startDate"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          dateFormat="dd/MM/yyyy"
                          onChange={(value) => field.onChange(value)}
                          selected={field.value}
                          className="date-input"
                        />
                      )}
                    />
                  </InputGroup>
                </div>
                <div className="form-item">
                  <FormLabel className="form-label">End Date</FormLabel>
                  <InputGroup>
                    <InputGrouptext>
                      <i className="fa-regular fa-calendar"></i>
                    </InputGrouptext>
                    <Controller
                      name="endDate"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          dateFormat="dd/MM/yyyy"
                          onChange={(value) => field.onChange(value)}
                          selected={field.value}
                          className="date-input"
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </div>

              <button type="submit" className="search-btn">
                Search
              </button>
            </Form>
          </div>

          <div className="table-section">
            <ReactTable columns={columnsList} items={breakList} />
          </div>

          <CustomModal
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
  breakList: state?.breakReducer?.breakList?.data,
  floorList: state?.authReducer?.floorList?.data?.floorList,
  loading: state?.breakReducer?.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getFloor: () => dispatch(authActions.getFloor()),
  handleModal: () => dispatch(modalActions.handleModal()),
  monthlyBreaks: (data) => dispatch(breakActions.getBreaksMonthly(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MonthlyReport);
