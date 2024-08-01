import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useScreenSize } from "../../../shared/hooks/hooks";
import hungerRushLogo from "../../../assets/images/hungerRushLogo.webp";
import NavBar from "../navBar/navBar";
import sort from "../../../assets/images/sort.png";
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

      <div className={`sidebar ${isOpen ? "width-200" : "width-75"} `}>
        <div
          className={`bars ${
            isOpen ? "bars-open-margin" : "bars-close-margin "
          } `}
        >
          <img
            className="pointer "
            src={sort}
            alt=""
            width="30px"
            height="30px"
            onClick={toggle}
          />
        </div>
        <div className="top_section margin-top-n13">
          <h1 className="logo">
            <img src={hungerRushLogo} alt="" width="50px" height="50px" />
            <span
              className={`logo-text   ${isOpen ? "d-block-inline" : "d-none"} `}
            >
              D-Hoppers
            </span>
          </h1>
        </div>

        <ul className="nav-list">
          {sidebarMenuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="linknav mt-1"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                className={`link_text ${
                  isOpen ? "display-block " : "display-none "
                } `}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
          <li
            className={`linknav fixed-bottom  ${
              isOpen ? "bottom-open-width" : "bottom-close-width"
            } `}
          >
            <div className="pointer" onClick={handleLogout}>
              <i class="fa-solid fa-right-from-bracket" />
              <span
                className={`link_text ms-1 ${
                  isOpen ? "d-block-inline" : "d-none"
                } `}
              >
                Logout
              </span>
            </div>
          </li>
        </ul>
      </div>
      <main
        className={`container-backGround-color mt-5 ${
          screenWidth <= 768
            ? isOpen
              ? "margin-left-90 width-100-90"
              : "margin-left-90 width-100-90"
            : isOpen
            ? "margin-left-220 width-100-220"
            : "margin-left-90 width-100-90"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
