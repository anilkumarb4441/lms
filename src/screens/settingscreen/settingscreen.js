import React, { useState } from "react";


//css
import "./settingscreen.css";

//assets
import createplan from "../../assets/settings/createplan.svg"
import draft from "../../assets/settings/draft.svg"
import pricingplan from "../../assets/settings/pricingplan.svg"


// Components
import Input from "../../components/Input/index"
import Settingplan from "../../components/settingsplan/settingsplan"
import Createplan from "../../components/createPlan/createplan"


function Settingscreen() {
    
    const [openNav, setOpenNav] = useState("createPlans");

    const objSettings = [
        {
            planName:"Hourly Basis",
            price:"249"
        },
        {
            planName:"Monthly Basis",
            price:"249"
        },
        {
            planName:"Hourly Basis",
            price:"249"
        },
        {
            planName:"Hourly Basis",
            price:"249"
        },
    ]


  return (
      <div className="settingsParent">
          <div className="navSetting">
              <h2>Settings</h2>
              <div className="navList">
                  <button onClick={(e)=>setOpenNav("pricing")} className={openNav==="pricing"?"active":null}>
                      <img src={draft} alt="icon-nav" className="settingIcon" />
                      <p>Pricing Plan</p>
                  </button>
                  <button onClick={(e)=>setOpenNav("draft")} className={openNav==="draft"?"active":null}>
                      <img src={pricingplan} alt="icon-nav" className="settingIcon" />
                      <p>Drafts</p>
                  </button>
                  <button onClick={(e)=>setOpenNav("createPlans")} className={openNav==="createPlans"?"active":null}>
                      <img src={createplan} alt="icon-nav" className="settingIcon" />
                      <p>Create Plan</p>
                  </button>
              </div>
          </div>
          <div className="setNavTab">
              {
                  openNav==="pricing"?
                  <div>
                    <h2>Pricing Plans</h2>
                    {
                        objSettings.map((val,i)=>{
                            return(
                                <div key={i}>
                                    <Settingplan {...val} />
                                </div>
                            )
                        })
                    }

                  </div>
                  :
                  openNav==="createPlans"?
                  <Createplan />
                  :null
              }
          </div>
      </div>
  );
}

export default Settingscreen;
