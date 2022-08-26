import React, { useState, useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./routes.js";
import localStorageService from "./utils/localStorageService";

//components
import NavBar from "./components/navBar/index";
import Login from "./components/login/login";

function App() {
  const { setToken, getAccessToken, getTokenDecode } = localStorageService;
  const [isToken, setIsToken] = useState(false);
  const [routeData, setRouteData] = useState([]);
  const Wrapper = () => {
    return useRoutes(routeData);
  };

  useEffect(() => {
    const userId = getTokenDecode()?.userId;
    let newRoutes = [];
    if (!userId) {
      setRouteData([]);
      return;
    }

    if (
      userId === "630760fd92b9e26cc6572a76" ||
      userId === "627906f71f94140a082ef297"

      // userId === "62e8ff859bdb428db493cf69" ||
      // userId === "62e8ffb79bdb428db493cf6a"
    ) {
      //For Chanukya and Shivam
      newRoutes = routes.filter((val) =>val.name==="Upload Leads");
    } else {
      newRoutes = routes.filter((val) =>val.name!== "Upload Leads");
    }
    setRouteData(newRoutes);
  }, [isToken]);

  if (!getAccessToken()) {
    return <Login setToken={setToken} setIsToken={setIsToken} />;
  } else {
    return (
      <>
        {(isToken || getAccessToken() !== null) && (
          <Router>
            <NavBar routeData = {[...routeData]} />
            <div className="wrapperContainer">
              <Wrapper />
            </div>
          </Router>
        )}
      </>
    );
  }
}

export default App;
