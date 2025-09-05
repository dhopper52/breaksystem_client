import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "./dailyReport.css";

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
import { breakActions } from "../../redux/actions/break.actions/break.action";
import { getCurrentUserLocalStorage } from "../../system/storageUtilites/storageUtilities";
import { exportToExcelDaily } from "../../shared/utilities/utilities";
import { HashLoader } from "react-spinners";
import { totalTimeUsed } from "../../shared/utilities/utilities";
const DailyReport = (props) => {
  const localUser = getCurrentUserLocalStorage();
  // console.log(localUser);
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
          <div className="break-items-container">
            {row?.usedbreaks?.map((item, index) => (
              <div className="break-item-row" key={index}>
                <div className="break-key-pill">
                  {item.breakKey === 21 ? 20 : item.breakKey}
                </div>
                <div className="break-equals">=</div>
                <div
                  className={`break-value-pill ${
                    item.breakKey + 0.3 < item.breakValue
                      ? "break-overtime"
                      : "break-ontime"
                  }`}
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
            className={`total-time-pill ${
              totalTimeUsed(row.shiftHours, row.totalBreakTime)
                ? "break-overtime"
                : "break-ontime"
            }`}
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
    const dataObj = {
      ...data,
      _id: Number(data._id),
      floorId: Number(data.floorId),
    };
    // console.log(dataObj);
    props.dailyBreaks(dataObj);
  };

  useEffect(() => {
    props.getFloor();
    props.dailyBreaks({ floorId: localUser._id });
  }, []);

  useEffect(() => {
    setfloorList(props?.floorList);
    setbreakList(props?.breakList);
    // console.log(props?.breakList);
  }, [props?.floorList, props?.breakList]);

  useEffect(() => {
    const updatedExportHeaders = headers?.map((h) => ({
      key: h.id,
      label: h.name,
    }));
    setExportHeaders(updatedExportHeaders);
  }, []);

  return (
    <div className="report-container">
      {!props.loading ? (
        <>
          <div className="report-header">
            <h3 className="page-title">Daily Report</h3>
            <div className="report-actions">
              <Button
                className="export-button"
                onClick={() => {
                  exportToExcelDaily(
                    breakList,
                    exportHeader,
                    `${localUser?.floorName} Daily Break Report`
                  );
                }}
              >
                <i className="fa-solid fa-download me-2"></i>
                Export CSV
              </Button>
            </div>
          </div>

          <div className="filter-card">
            <div className="filter-header">
              <h4 className="filter-title">
                <i className="fa-solid fa-filter me-2"></i>
                Filter
              </h4>
            </div>
            <Form
              noValidate
              className="filter-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <FormLabel>User ID</FormLabel>
                    <Form.Control
                      type="number"
                      className="form-control-modern"
                      {...register("_id", {
                        pattern: {
                          value: /^[^\s]+(?:$|.*[^\s]+$)/,
                          message: "Enter a valid number",
                        },
                      })}
                      placeholder="Enter User ID"
                    />
                  </div>
                </div>
                {localUser.role === roleType.SUPER_ADMIN ? (
                  <div className="col-lg-6 col-md-6 mt-3 mt-md-0">
                    <div className="form-group">
                      <FormLabel>Floor</FormLabel>
                      <Form.Select
                        className="form-control-modern"
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

              <div className="row mt-3 mb-3">
                <div className="col-lg-6">
                  <div className="form-group">
                    <FormLabel>Date</FormLabel>
                    <div className="date-picker-container">
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
                            className="date-picker-input"
                          />
                        )}
                      />
                      <i className="fa-regular fa-calendar date-picker-icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-actions">
                <button type="submit" className="search-button">
                  <i className="fas fa-search me-2"></i>
                  Search
                </button>
              </div>
            </Form>
          </div>

          <div className="data-section">
            <div className="data-header">
              <h3 className="section-title">
                Breaks <span className="data-count">{breakList?.length || 0}</span>
              </h3>
            </div>

            <div className="table-container">
              <ReactTable
                columns={headers}
                items={breakList}
              />
            </div>
          </div>

          <CustomModal
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
              <div className="modal-loading">
                <HashLoader color="#4361ee" size={42} speedMultiplier={2} />
              </div>
            )}
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
