import React from "react";
import "./tabs.css";

function Tabs({ tabArr, handleTab, activeValue='',  tabsClass = "" }) {
 
 
  
  
  
  return (
    <div className={"tabsSection " + tabsClass}>
      {tabArr &&
        tabArr.map((item, i) => {
          return (
            <button
              className={item.value === activeValue ? "active" : ""}
              key={i}
              onClick={() =>handleTab(item)}
            >
              {item.name}
            </button>
          );
        })}
    </div>
  );
}

export default Tabs;
