import React, { useState, useEffect } from "react";
import "./loader.css"
import {FiLoader} from "react-icons/fi"

function Loader() {
  return (
      <>
        <div className="loadcontainer">
          <FiLoader className="loadimg"/>
        </div>
      </>

  );
}

export default Loader;
