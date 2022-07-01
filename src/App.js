import React from "react";
import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

//components
import NavBar from "./components/navBar/index";
import DashBoard from "./screens/dashboard";
import Leads from "./screens/leads/leads";
import Myteam from "./screens/Myteam";

// Screens
import Services from "./screens/services/services";
import Pricing from "./screens/pricing";
import UserFeed from "./screens/userFeed";
import ChefAttendance from "./screens/chefAttendance/chefAttendance";
import ClientOverview from "./screens/clientOverview/clientoverview";
import Settingscreen from "./screens/settingscreen/settingscreen";
import Login from "./components/login/login";
import localStorageService from "./utils/localStorageService";

function App() {
  const { setToken, getAccessToken } = localStorageService;
  const [isToken, setIsToken] = React.useState(false);
  const routes = [
    { path: "/", element: <DashBoard /> },
    { path: "/leads", element: <Leads /> },
    { path: "/myteam", element: <Myteam /> },
  ];

  const Wrapper = () => {
    return useRoutes(routes);
  };

  React.useEffect(() => {
    getRoutes();
  }, [isToken]);
  const getRoutes = () => {
    if (localStorageService.getAccessToken()) {
      let tokenObj = localStorageService.getTokenDecode();
     // console.log(tokenObj)
    }
    }

  if (!getAccessToken()) {
    return <Login setToken={setToken} setIsToken={setIsToken} />;
  } else {
    return (
      <>
        {(isToken || getAccessToken() !== null) && (
          <Router>
            <NavBar />
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
