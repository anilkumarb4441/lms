//assets
import Dashboard from "./assets/navbar/dashboard.svg";
import Bookings from "./assets/navbar/bookings.svg";
import ChefView from "./assets/navbar/chefview.svg";

//components
import DashBoard from "./screens/dashboard";
import Leads from "./screens/leads/leads";
import Myteam from "./screens/Myteam";
import LeadsUpload from "./screens/leadsUpload/leadsUpload";
import SetPassword from './components/setPassword/setPassword'

const routes = [
    { name:"Dashboard",path: "/",img:Dashboard, element: <DashBoard /> },
    { name:"Leads",path: "/leads",img:Bookings, element: <Leads /> },
    { name:"My Team",path: "/myteam",img:ChefView, element: <Myteam /> },
    {name:"Upload Leads",path:'/',img:Bookings,element:<LeadsUpload/>},
    // {path:'/setPassword',element:<SetPassword />}
  ];

export default routes