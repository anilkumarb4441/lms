import React, { useState } from "react";
//css
import "./index.css";

//assets
import logo from "../../assets/navbar/codlogo.svg";
import Dashboard from "../../assets/navbar/dashboard.svg";
import Bookings from "../../assets/navbar/bookings.svg";
import ChefView from "../../assets/navbar/chefview.svg";

import { Link, useLocation } from "react-router-dom";
import localStorageService from "../../utils/localStorageService";
import { URLS } from "../../utils/urlConstants";
import API_SERVICES from "../../utils/API"

function NavBar() {
  const [navData, setNavData] = useState([
    { name: "Dashboard", path: "/", img: Dashboard },
    { name: "Leads", path: "/leads", img: Bookings },
    { name: "My Team", path: "/myteam", img: ChefView },
  ]);

  const location = useLocation();

  const logOut = ()=>{
    localStorageService.clearToken()
    window.location = "/"
  }

  const Redirect = ()=>{
    let {email,password} = localStorageService.getTokenDecode()
     const callback = (err,res)=>{
        if(res && res.data.success){
            window.location = res.data.url
         }
     }
    API_SERVICES.httpGET(`${URLS.redirectToCustomerDashBoard}?email=${email}&&password=${password}`,callback)
  }

  return (
    <div className = 'navBar'>
    
      <div className="sideNav">
        <div className="navLogoContainer">
          <img src={logo} alt="logo" />
          <p>Lead Management System</p>
          { <p style = {{fontSize:'14px'}}>Hello, {localStorageService.getTokenDecode()?.name}</p>}
          <span></span>
        </div>
        <div className="navLinkContainer">
          {navData &&
            navData.map((item, i) => {
              return (
              <div key = {i} className="paAnchor">
                <p className={location.pathname===item.path?"active":""}></p>
                <Link to={item.path} key={item.name} className={location.pathname===item.path?"active":""}>
                  <img alt="navIcon" src={item.img}/>
                  <p className={location.pathname===item.path?"active":""}>{item.name}</p>
                </Link>
              </div>
              );
            })}
        </div>
          <div className = "navButtons">
          <button onClick = {Redirect}>Customer DashBoard</button>
          <button onClick = {logOut}>Logout</button> 
          </div>
      </div>
    </div>
  );
}

export default NavBar;
