import React, { useState } from "react";
//css
import "./index.css";

//assets
import logo from "../../assets/navbar/logo.svg";


import { Link, useLocation } from "react-router-dom";
import localStorageService from "../../utils/localStorageService";
import { URLS } from "../../utils/urlConstants";
import API_SERVICES from "../../utils/API"

function NavBar({routeData}) {
  const [navData, setNavData] = useState([routeData]);

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
          { <p style = {{fontSize:'13px'}}>Hello, {localStorageService.getTokenDecode()?.name}</p>}
          <span></span>
        </div>
        <div className="navLinkContainer">
          {routeData &&
            routeData.map((item, i) => {
              return (item.name &&<>
              <div key = {i} className="paAnchor">
                <p className={location.pathname===item.path?"active":""}></p>
                <Link to={item.path} key={item.name} className={location.pathname===item.path?"active":""}>
                  <img alt="navIcon" src={item.img}/>
                  <p className={location.pathname===item.path?"active":""}>{item.name}</p>
                </Link>
              </div>
              </>);
            })}
        </div>
          <div className = "navButtons">
          <button onClick = {Redirect}>Customer Dashboard</button>
          <button onClick = {logOut}>Logout</button> 
          </div>
      </div>
    </div>
  );
}

export default NavBar;
