import { FaStore, FaPoll, FaUser } from "react-icons/fa";
export const sidebarMenuItem = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaStore />,
  },
  {
    path: "/user",
    name: "User",
    icon: <FaUser />,
  },
  {
    path: "/dailyReport",
    name: "Daily Report",
    icon: <FaPoll />,
  },
  {
    path: "/monthlyReport",
    name: "Monthly Report",
    icon: <FaPoll />,
  },
  // {
  //   path: "/test",
  //   name: "Test",
  //   icon: <FaPoll />,
  // },
];
export const localStorageConstants = {
  CURRENT_USER: "currentUser",
};
export const modalConstants = {
  ModalOpen: "modalOpen",
  SEARCH_MODAL: "searchModal",
};
export const action = {
  Create: "create",
  Update: "update",
  Delete: "delete",
  Details: "details",
  Search: "search",
  Break: "break",
  Project: "project",
  User: "user",
};
export const shiftHours = {
  Eight: "8 Hours",
  Ten: "10 Hours",
  Twelve: "12 Hours",
};
export const genderList = [
  { id: 2, label: "Male", value: "Male" },
  { id: 3, label: "Female", value: "Female" },
  { id: 4, label: "Other", value: "Other" },
];
export const projectList = [
  { id: 2, label: "Project 1", value: "Project 1" },
  { id: 3, label: "Project 2", value: "Project 2" },
  { id: 4, label: "Project 3", value: "Project 3" },
];
export const floorList = [
  { id: 2, label: "Floor 1", value: "Floor 1" },
  { id: 3, label: "Floor 2", value: "Floor 2" },
  { id: 4, label: "Floor 3", value: "Floor 3" },
];
export const breakListEight = [
  { id: 30, label: "30 Minutes", value: "30 Minutes" },
  { id: 20, label: "20 Minutes", value: "20 Minutes" },
];
export const breakListsEight = [
  { id: 30, label: "30 Minutes", value: "30 Minutes" },
  { id: 20, label: "20 Minutes", value: "20 Minutes" },
];
export const breakListTwelve = [
  { id: 30, label: "30 Minutes", value: "30 Minutes" },
  { id: 20, label: "20 Minutes", value: "20 Minutes" },
  { id: 21, label: "20 Minutes", value: "20 Minutes" },
];
export const breakListTen = [
  { id: 30, label: "30 Minutes", value: "30 Minutes" },
  { id: 20, label: "20 Minutes", value: "20 Minutes" },
  { id: 10, label: "10 Minutes", value: "10 Minutes" },
];
export const supervisorList = [
  { id: 1, label: "user1", value: "user1" },
  { id: 2, label: "user2", value: "user2" },
  { id: 3, label: "user3", value: "user3" },
];
export const shiftHoursList = [
  { id: 1, label: "8 Hours", value: "8 Hours" },
  { id: 2, label: "10 Hours", value: "10 Hours" },
  { id: 3, label: "12 Hours", value: "12 Hours" },
];
export const breakType = [
  { id: 1, label: "Short Break", value: "Short Break" },
  { id: 2, label: "Emergency Short Break", value: "Emergency Short Break" },
];
export const reportType = {
  SINGLE_USER: "singleUser",
  TEAM: "team",
};

export const breakTypeCheck = {
  EMERGENCY_BREAK: "Emergency Short Break",
};
export const reportTypeList = [
  { id: 1, label: "Single User", value: "singleUser" },
  { id: 2, label: "Team", value: "team" },
];
export const usersList = [
  {
    userId: 1,
    name: "user12",
    breakType: "Short Break",
    shiftHours: "8 Hours",
    usedBreaks: [30, 15, 5],
    totalBreakTime: "60 Minutes",
    fine: "300",
  },
  {
    userId: 1,
    name: "user12",
    breakType: "Emergency Short Break",
    shiftHours: "8 Hours",
    usedBreaks: [30, 15, 5],
    totalBreakTime: "60 Minutes",
    fine: "300",
  },
  {
    userId: 1,
    name: "user12",
    breakType: "Short Break",
    shiftHours: "8 Hours",
    usedBreaks: [30, 15, 5],
    totalBreakTime: "60 Minutes",
    fine: "300",
  },
];
export const Url = {
  BASE_URL: process.env.REACT_APP_BASE_API_URL,
  CREATE_USER: "createUser",
  DELETE_USER: "deleteUser",
  GET_USER: "getUser",
  GET_USERS: "getUsers",
  GET_FLOOR: "getFloor",
  CREATE_BREAK: "createBreak",
  UPDATE_BREAK: "updateBreak",
  GET_DAILY_BREAKS: "getBreaksDaily",
  GET_CURRENT_BREAK: "getCurrentBreak",
  GET_MONTHLY_BREAKS: "getBreaksMonthly",
  LOGIN: "login",
  SIGNUP: "signup",
  AUTH: "auth",
  USER: "user",
  BREAK: "break",
  CLOCK: "clock",
  UPDATE_FLOOR: "updateFloor",
  START_CLOCK: "startClock",
  STOP_CLOCK: "stopClock",
  GET_CLOCK: "getClock",
  DELETE_CLOCK: "deleteClock",
};
export const authConstants = {
  Failed: "failed",
  Success: "success",
};
export const status = {
  Failed: "failed",
  Success: "success",
};
export const userConstants = {
  USER_CREATED: "UserCreated",
  GET_USER: "GetUser",
  GET_USERS: "GetUsers",
  GET_USERSLIST: "GetUsersList",

  LOADING: "Loading",
};
export const breakConstants = {
  BREAK_DAILY: "breakDaily",
  BREAK_MONTHLY: "breakMonthly",
  LOADING: "Loading",
};
export const clockConstants = {
  LOADING: "Loading",
};
export const LoginConstants = {
  Login: "login",
  GET_FLOOR: "getFloor",
  SignUp: "signup",
  Created: "Created",
  CURRENT_USER: "LocalUser",
  LOADING: "Loading",
};
export const roleType = {
  SUPER_ADMIN: "superAdmin",
  SUPERVISOR: "superVisor",
};
export const clock = {
  START_INTERVAL: "START_INTERVAL",
  STOP_INTERVAL: "STOP_INTERVAL",
  INCREMENT_COUNT: "INCREMENT_COUNT",
};
