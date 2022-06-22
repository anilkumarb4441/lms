import './App.css';
import {BrowserRouter as Router,useRoutes} from 'react-router-dom'
import { Link, useLocation } from "react-router-dom";

//components
import NavBar from "./components/navBar/index"
import DashBoard from './screens/dashboard';
import Leads from './screens/leads/leads';
import ChefOverView from './screens/chefOverview';

// Screens
import Services from "./screens/services/services"
import Pricing from './screens/pricing';
import UserFeed from './screens/userFeed';
import ChefAttendance from './screens/chefAttendance/chefAttendance';
import ClientOverview from './screens/clientOverview/clientoverview';
import Settingscreen from './screens/settingscreen/settingscreen';

function App() {
  const routes = [{path:'/',element:<DashBoard/>},
  {path:'/leads',element:<Leads/>},
   {path:'/chefOverview',element:<ChefOverView/>},
   {path:'/chefAttendance',element:<ChefAttendance/>},
  {path:'/services',element:<Services/>},
  {path:'/feed',element:<UserFeed/>},
  {path:'/pricing',element:<Pricing/>},
  {path:'/clientOverview',element:<ClientOverview/>},
  {path:'/settings',element:<Settingscreen/>},
]

  const Wrapper = ()=>{
    return useRoutes(routes)
  }
  // const location = useLocation();

  return (
    <Router>
      <NavBar/>
      <div className = "wrapperContainer">
      <Wrapper/>
      </div>
   
    </Router>
    
  );
}

export default App;
