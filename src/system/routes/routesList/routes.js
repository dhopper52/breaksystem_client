import Login from "../../../views/login/login";
import Dashboard from "../../../views/dashboard/dashboard";
import ImportUsersComponent from "../../../views/testView/testViews";
import DailyReport from "../../../views/dailyReport/dailyReport";
import MonthlyReport from "../../../views/monthlyReport/monthlyReport";
import User from "../../../views/user/user";
import Profile from "../../../views/profile/profile";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: <Dashboard />,
    protected: true,
    hasSideBar: true,
  },
  {
    path: "/user",
    component: <User />,
    hasSideBar: true,
    protected: true,
  },
  {
    path: "/profile",
    component: <Profile />,
    hasSideBar: true,
    protected: true,
  },
  {
    path: "/dailyReport",
    component: <DailyReport />,
    hasSideBar: true,
    protected: true,
  },
  {
    path: "/monthlyReport",
    component: <MonthlyReport />,
    hasSideBar: true,
    protected: true,
  },
  {
    path: "/test",
    component: <ImportUsersComponent />,
    hasSideBar: true,
    protected: true,
  },

  {
    path: "/login",
    name: "Login",
    component: <Login />,
    protected: false,
    hasSideBar: false,
  },
];

export default routes;
