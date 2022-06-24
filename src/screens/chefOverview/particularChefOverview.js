import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
// import { Chart, registerables, ArcElement } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { Line } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";
// import { Pie } from "react-chartjs-2";

//css
import "./particularChefOverview.css";

//assets
import dummy from "../../assets/chefview/dummy.png"
import mailIcon from "../../assets/chefview/mailIcon.svg"
import phoneIcon from "../../assets/chefview/phoneIcon.svg"
import ticketPhotoTemp from "../../assets/dashboard/ticketPhotoTemp.png"
import fullScreen from "../../assets/dashboard/fullScreen.svg"
import tempPhoto from "../../assets/dashboard/tempPhoto.png"
import {IoIosArrowBack} from "react-icons/io";

//components
import DoughnutComp from "../../components/doughnut/doughnut"
import Input from "../../components/Input/index"
import Table from "../../components/Table";

// Chart.register(...registerables);
// Chart.register(ArcElement);

function ParticularChef({chefId,setParticularChef}) {

  const[pieData,setpieData] = useState({
    
    labels: [
      'Pending',
      'Closed',
      'Untouched'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'red',
        'green',
        'skyblue'
      ],
      hoverOffset: 4
    }]
  
})

// Table

const [originalData, setOriginalData] = useState([
  {
    memId: "NAN54163",
    memberName: "Manu",
    email: "manojkumarobulasetty785@gmail.com",
    phone: 7729088005,
  },
  {
    memId: "NAN",
    memberName: "Manu",
    email: "manojkumarobulasetty785@gmail.com",
    phone: 7729088005,
  },
  {
    memId: "NAN",
    memberName: "Manu",
    email: "manojkumarobulasetty785@gmail.com",
    phone: 7729088005,
  },
  {
    memId: "NAN",
    memberName: "Manu",
    email: "manojkumarobulasetty785@gmail.com",
    phone: 7729088005,
  },
  {
    memId: "NAN",
    memberName: "Manu",
    email: "manojkumarobulasetty785@gmail.com",
    phone: 7729088005,
  },
  {
    memId: "NAN",
    memberName: "Manu",
    email: "manojkumarobulasetty785@gmail.com",
    phone: 7729088005,
  },
]);
const [tableData,setTableData] = useState(originalData);
const [columns, setColumns] = useState([
  {
    Header: "Member Id",
    accessor: "memId",
    Cell:(props)=>{
      return <Link to="#" target="_blank" style={{color:"white"}}>{props.cell.row.original.memId}</Link>
    }
  },
  {
    Header: "Member Name",
    accessor: "memberName",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone Number",
    accessor:'phone'
  },
  // {
  //   Header: "Options",
  //   accessor:'options',
  // },
]);

  const[checkArray,setcheckArray] = useState({profileVisibility:false,taskNotification:false})
  const tempTicketsArray = [

        {
          img:ticketPhotoTemp,
          name:"Ankita Ghosh",
          descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
        },
        {
          img:ticketPhotoTemp,
          name:"Ankita Ghosh",
          descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
        },
        {
          img:ticketPhotoTemp,
          name:"Ankita Ghosh",
          descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
        }
  ]

  const chefTasksList = [
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    }
  ]

  const [dataTickets, setDataTickets] = useState(tempTicketsArray);
  const [chefTasks, setChefTasks] = useState(chefTasksList);
  const [profileScreen, setProfileScreen] = useState(false);
  const [formData,setFormData] = useState(
  [
    {
      name: "userName",
      value: "",
      type: "text",
      placeholder: "User name",
    },
    {
      name: "password",
      value: "",
      type: "password",
      placeholder: "Password",
    },
    {
      name: "newpassword",
      value: "",
      type: "password",
      placeholder: "New Password",
    },
    {
      name: "profileVisibility",
      value: "",
      type: "checkbox",
      label:"Profile visibility for Everyone",
    },
    {
      name: "taskNotification",
      value: "",
      type: "checkbox",
      label:"New Task Notification",
    }
  ]);

  const handleInputChange = (e,i)=>{
    // console.log(e.target.type,"xxxxxxxxxxx");
    if(e.target.type==="checkbox"){
      setcheckArray({...checkArray,[e.target.name]:e.target.checked})
    }
    else{
      let newArr = [...formData];
      let formObj = { ...newArr[i] };
      formObj.value = e.target.value;
      newArr.splice(i, 1, formObj);
      setFormData([...newArr]);
    }
  }

  const submitForm = (e)=>{
    e.preventDefault();
    let newArr = [];
    formData.forEach((obj) => {
      if(obj.name!="profileVisibility" && obj.name!="taskNotification"){
        let newObj = {};
        newObj.name = obj.name;
        newObj.value = obj.value;
        newArr = [...newArr, newObj]; 
      }
    });
    newArr.push(checkArray);
  console.log(newArr);

  }

  return (
      <div className="mainParticular">
        <div className="flexalign">
          <IoIosArrowBack className = 'goBack' onClick={(e)=>setParticularChef(false)}/>
          <h1>ChefId-#{chefId}</h1>
        </div>
        {/* <div className="chefNav">
          <button onClick={(e)=>setProfileScreen(false)} className={profileScreen?null:"active"}>Chef Profile</button>
          <button onClick={(e)=>setProfileScreen(true)} className={profileScreen?"active":null}>Profile Settings</button>
        </div> */}
        {
          profileScreen?
          <div className="profileParent">
            <form onSubmit={(e)=>submitForm(e)}>
            {formData &&
            formData.map((item, i) => {
              if(item.type==="checkbox"){
                return(
                  <Input key={i} {...item} required={false} inputClass = 'addChefInput' checked = {item.name==="profileVisibility"?checkArray.profilevisibility:checkArray.newTask} change = {(e)=>handleInputChange(e,i)}/>
                )
              }
              else{
                return (
                  <Input key={i} {...item} required = {true} inputClass = 'addChefInput' change={(e) => handleInputChange(e, i)} />
                );
              }
            })}
              <button type="submit">Save</button>
            </form>
          </div>:
          <div>
            <div className="sPOne">
              <div className="ParchefOverView">
                <div className="fPDiv">
                  <img src={dummy} alt="Dummy Image" />
                  <div className="InfoChef">
                    <h2>Ekka Singh</h2>
                  </div>
                </div>
                <p className="chefPInfo">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                </p>
                <div className="sPflexDiv">
                  <img src={mailIcon} alt="MailIcon" />
                  <a href="mailto:Enakshi@gmail.com">Enakshi@gmail.com</a>
                </div>
                <div className="sPflexDiv">
                  <img src={phoneIcon} alt="MailIcon" />
                  <a href="tel:9123456789">9123456789</a>
                </div>
              </div>
              <div className='userTicketsSection'>
                    <div className='ticketHead'>
                      <h4>Tickets Raised</h4>
                        {/* <Link to="#" className='linkfull'>
                          <img src={fullScreen} alt="FullIcon" />
                          <p>Full Screen</p>
                        </Link> */}
                    </div>
                    <div className='tickets'>
                      <div>
                        <DoughnutComp donughtfor="Pie" pieData={pieData} />
                      </div>
                      {/* {
                        dataTickets.map((val,key)=>{
                          return(
                            <div className='tickectParent' key={key}>
                              <div className='tickImg'>
                                <img src={val.img} alt="Photo" />
                              </div>
                              <div className='ticketContentHolder'>
                                <h3 className='TuserName'>{val.name}</h3>
                                <p className='ticketDescript'>{val.descrip}</p>
                              </div>
                            </div>
                          )
                        })
                      } */}
                    </div>
              </div>
            </div>

            {/* Total Tasks */}
            <div className="totalTasksPart">
              <h4>Total Tasks List</h4>
              <div className="tableParent">
                {/* <Table /> */}
                <Table search = {true} columns={columns} data={tableData} tClass="bTable" />
                {/* <table>
                  <thead>
                    <tr>
                      <th>preview</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Time</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chefTasks.map((val,key)=>{
                      return(
                        <tr key={key} >
                            <td><img src={val.img} /></td>
                            <td>{val.ID}</td>
                            <td>{val.Name}</td>
                            <td>{val.Time}</td>
                            <td>{val.Date}</td>
                            <td>{val.Price}</td>
                            <td>{val.Status}</td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table> */}
              </div>
            </div>

            {/* Dought Nut */}
            {/* <div className="ChefReview">
              <div className="subparent">
                <h3>Ratings</h3>
                <DoughnutComp type="Ratings" digit="3.5" subtext="(11)" />
              </div>
              <div className="subparent">
                <h3>Ratings</h3>
                <DoughnutComp type="Total Coupons" digit="105" subtext="Coupons" />
              </div>
              <div className="subparent">
                <h3>Ratings</h3>
                <DoughnutComp type="Total Bookings" digit="21" subtext="Houses" />
              </div>
              <div className="subparent">
                <h3>Ratings</h3>
                <DoughnutComp type="Attendance" digit="80" subtext="Presence"/>
              </div>
            </div> */}
          </div>
        }


      </div>
  );
}

export default ParticularChef;
