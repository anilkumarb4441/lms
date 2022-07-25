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
      userId === "62d2567927ac212513541269" ||
      userId === "62d256b227ac21251354126a"
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
