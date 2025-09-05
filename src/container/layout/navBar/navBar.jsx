import React from "react";
import { useNavigate } from "react-router-dom";
import useicon from "../../../assets/images/useicon.png";
import {
  clearStorage,
  getCurrentUserLocalStorage,
} from "../../../system/storageUtilites/storageUtilities";
import { roleType } from "../../../system/constants/globleConstants/globleConstants";

const NavBar = () => {
  const localUser = getCurrentUserLocalStorage();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearStorage();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg z-index-1 fixed-top bg-body-tertiary nav-color nav-style">
      <div className="container-fluid">
        <div className="btn-group right-align">
          <button
            type="button"
            className="btn dropdown-toggle custom-button"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
          >
            <div className="user-avatar">
              <img src={useicon} alt="User" />
              <span className="status-indicator"></span>
            </div>
            <span>
              {localUser?.role === roleType.SUPER_ADMIN
                ? "Super Admin"
                : "Supervisor"}
            </span>
            <i className="fa-solid fa-chevron-down ms-2"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <div className="dropdown-header">
              <div className="user-info">
                <span className="user-name">{localUser?.floorName || "User"}</span>
                <span className="user-role">
                  {localUser?.role === roleType.SUPER_ADMIN
                    ? "Super Admin"
                    : "Supervisor"}
                </span>
              </div>
            </div>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => navigate("/profile")}
              >
                <i className="fa-solid fa-user-gear"></i>
                <span>Change Password</span>
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
