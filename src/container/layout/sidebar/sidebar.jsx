import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useScreenSize } from "../../../shared/hooks/hooks";
import hungerRushLogo from "../../../assets/images/hungerRushLogo.webp";
import NavBar from "../navBar/navBar";
import { sidebarMenuItem } from "../../../system/constants/globleConstants/globleConstants";
import { clearStorage } from "../../../system/storageUtilites/storageUtilities";

const Sidebar = ({ children, sidebar }) => {
  const [screenWidth] = useScreenSize();
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    clearStorage();
    navigate("/login");
  };

  useEffect(() => {
    if (screenWidth <= 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [screenWidth]);

  return (
    <div>
      <NavBar />

      <div className={`sidebar ${isOpen ? "width-200" : "width-75"}`}>
        <div className="top_section">
          <div className="logo">
            <img 
              src={hungerRushLogo} 
              alt="D-Hoppers Logo" 
              className="logo-image"
            />
            <span className={`logo-text ${!isOpen ? "display-none" : ""}`}>
              D-Hoppers
            </span>
          </div>
          <div className="bars" onClick={toggle}>
            <i className={`fa-solid ${isOpen ? "fa-chevron-left" : "fa-chevron-right"}`}></i>
          </div>
        </div>

        <ul className="nav-list">
          {sidebarMenuItem.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  isActive ? "linknav active" : "linknav"
                }
              >
                <div className="icon">
                  {item.icon}
                  {!isOpen && <div className="tooltip">{item.name}</div>}
                </div>
                <div className={`link_text ${!isOpen ? "display-none" : ""}`}>
                  {item.name}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* <div className="fixed-bottom">
          <div className="linknav logout-btn" onClick={handleLogout}>
            <div className="icon">
              <i className="fa-solid fa-right-from-bracket"></i>
              {!isOpen && <div className="tooltip">Logout</div>}
            </div>
            <div className={`link_text ${!isOpen ? "display-none" : ""}`}>
              Logout
            </div>
          </div>
        </div> */}
      </div>
      
      <main
        className={`container-backGround-color ${
          isOpen 
            ? "margin-left-220 width-100-220" 
            : "margin-left-90 width-100-90"
        }`} style={{ marginTop: "55px" }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
