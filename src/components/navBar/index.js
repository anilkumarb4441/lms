import React, { useState } from "react";
//css
import "./index.css";

//assets
import logo from "../../assets/navbar/codlogo.svg";
import Dashboard from "../../assets/navbar/dashboard.svg";
import Bookings from "../../assets/navbar/bookings.svg";
import ChefView from "../../assets/navbar/chefview.svg";
import ClientView from "../../assets/navbar/clientview.svg";
import Calendar from "../../assets/navbar/calendar.svg";
import ChatSystem from "../../assets/navbar/chatsystem.svg";
import Services from "../../assets/navbar/services.svg";
import Feed from "../../assets/navbar/feed.svg";
import SocialMedia from "../../assets/navbar/socialmedia.svg";
import Settings from "../../assets/navbar/settings.svg";


import ColorDashboard from "../../assets/navbar/ORANGE/Dashboard.svg";
import ColorBookings from "../../assets/navbar/ORANGE/Bookings.svg";
import ColorChefView from "../../assets/navbar/ORANGE/Chef Overview.svg";
import ColorClientView from "../../assets/navbar/ORANGE/Client Overview.svg";
// import ColorCalendar from "../../assets/navbar/calendar.svg";
// import ColorChatSystem from "../../assets/navbar/chatsystem.svg";
import ColorServices from "../../assets/navbar/ORANGE/Services.svg";
// import ColorFeed from "../../assets/navbar/feed.svg";
// import ColorSocialMedia from "../../assets/navbar/socialmedia.svg";
import ColorSettings from "../../assets/navbar/ORANGE/Settings.svg";
// import servicecolored from "../../assets/navbar/servicecolored.svg"

import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [navData, setNavData] = useState([
    { name: "Dashboard", path: "/", img: Dashboard, Colorimg: ColorDashboard },
    { name: "Leads", path: "/leads", img: Bookings, Colorimg: ColorBookings },
    { name: "My Team", path: "/chefOverview", img: ChefView, Colorimg: ColorChefView },
    // { name: "Chef Attendance", path: "/chefAttendance", img: ChefView, Colorimg: ColorChefView },
    // { name: "Client Overview", path: "/clientOverview", img: ClientView, Colorimg: ColorClientView },
    // { name: "Chat System", path: "/chatSystem", img: Dashboard, Colorimg: Dashboard },
    // { name: "Calendar", path: "/calendar", img: Calendar, Colorimg: Calendar },
    // { name: "Services", path: "/services", img: Services, Colorimg: ColorServices },
    // { name: "Pricing", path: "/pricing", img: Feed, Colorimg: Feed },
    // { name: "Feed", path: "/feed", img: Feed, Colorimg: Feed },
    // { name: "Settings", path: "/settings", img: Settings, Colorimg: ColorSettings },
  ]);

  const location = useLocation();

  return (
    <div className = 'navBar'>
      <div className="horizontalNav"></div>
      <div className="sideNav">
        <div className="navLogoContainer">
          <img src={logo} alt="logo" />
          <p>Lead Management System</p>
          <span></span>
        </div>
        <div className="navLinkContainer">
          {navData &&
            navData.map((item, i) => {
              return (
              <div key = {i} className="paAnchor">
                <p className={location.pathname===item.path?"active":""}></p>
                <Link to={item.path} key={item.name} className={location.pathname===item.path?"active":""}>
                  <img alt="navIcon" src={location.pathname===item.path?item.Colorimg:item.img}/>
                  <p className={location.pathname===item.path?"active":""}>{item.name}</p>
                </Link>
              </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
