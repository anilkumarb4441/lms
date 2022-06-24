import React,{useState,useEffect} from 'react'
import "./index.css"
import {Link} from 'react-router-dom'


//assets
import card1 from '../../assets/dashboard/card1.svg'
import card2 from '../../assets/dashboard/card2.svg'
import card3 from '../../assets/dashboard/card3.svg'
import card4 from '../../assets/dashboard/card4.svg'
import fullScreen from "../../assets/dashboard/fullScreen.svg"
import ticketPhotoTemp from "../../assets/dashboard/ticketPhotoTemp.png"
import tempPhoto from "../../assets/dashboard/tempPhoto.png"


import {MONTHS} from "../../utils/constants.js"
import {WEEKDAYS} from "../../utils/constants.js"

//components
import { Chart, registerables, ArcElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
Chart.register(...registerables);
Chart.register(ArcElement);



function DashBoard() {

    // Array for Tickects

    const tempTicketsArray = [
      {
        type:"Client",
        data:[
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
      },
      {
        type:"Chef",
        data:[
          {
            img:ticketPhotoTemp,
            name:"Ghosh Ankita ",
            descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
          },
          {
            img:ticketPhotoTemp,
            name:"Ghosh Ankita ",
            descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
          },
          {
            img:ticketPhotoTemp,
            name:"Ghosh Ankita ",
            descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
          }
        ]
      }
    ]


  const tabrecnetOrder = [
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
  const [recentTabdta, setrecentTabdta] =  useState(tabrecnetOrder);
  const [checkBoxValue, setcheckBoxValue] = useState(false);
  const [ticketDisplay, setticketDisplay] = useState("Client");
  const [ticketsData, setticketsData] = useState(tempTicketsArray[0].data)

  const DgraphHeader = ({name,handleSelect})=>{
    
    return(<div className = 'dgraphHeader'>
    <p>{name}</p>
    <select onChange ={(e)=>handleSelect(e)}>
      <option>Monthly</option>
      <option>Yearly</option>
    </select></div>)
  }
    
  const [barData, setBarData] = useState({
   
    labels: WEEKDAYS,
    datasets: [
      {
        label: "Customers",
        maxBarThickness: "44",
        data: [
          40, 60, 20,40,50,80,25
        ],
        backgroundColor: "#E6AA55",
        hoverBackgroundColor: "#E6AA5580",
        borderWidth: 1,
      },
    ],
  });
  const [lineData, setLineData] = useState({
    labels: MONTHS,
    datasets: [
      {
        label: "Revenue",
        data: [
          2000, 3000, 4000, 5000, 1300, 3000, 6000, 2000, 3000, 4000, 1000, 500,
        ],
        backgroundColor: "#302C30",
        hoverBackgroundColor: "rgba(188, 0, 203, 0.21)",
        fill: true,
        borderWidth: 3,
       
      },
      
    ],
  });

  const [barOptions, setBarOptions] = useState({
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  });
  const [lineOptions, setLineOptions] = useState({
    elements:{
      line:{
        cubicInterpolationMode:'monotone'
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  });

  const  handleSelect = ()=>{

  }



  // CheckBox onchange Function

  function ticketsDisplay(e){
    // console.log(ticketDisplay,"Before");
    ticketDisplay==="Client"?setticketDisplay("Chef"):setticketDisplay("Client");
    ticketDisplay==="Client"?setticketsData(tempTicketsArray[1].data):setticketsData(tempTicketsArray[0].data)
  }
  


    return (
        <div className = 'dashBoardScreen'>
            <div className = 'screenTitleContainer'>
            <p className = 'screenTitle'>
                Dashboard
            </p>
            </div>
            <div className = 'dashboardCardContainer'>
               <div className = 'dashboardCard'>
                 <img src = {card1} alt = 'cardImg'/>
                 <div>
                     <p>89</p>
                     <p>Total Chefs</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 <img src = {card2} alt = 'cardImg'/>
                 <div>
                     <p>206</p>
                     <p>Total Clients</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 <img src = {card3} alt = 'cardImg'/>
                 <div>
                     <p>206</p>
                     <p>Total Bookings</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 <img src = {card3} alt = 'cardImg'/>
                 <div>
                     <p>26</p>
                     <p>Pending Bookings</p>
                 </div>
               </div>
            </div>
            <div className='flexedgrapghParent'>
              <div className = 'dboardGraphContainer'>
                <DgraphHeader name = {'Total Revenue'} handleSelect = {(e)=>handleSelect(e)}/>
                <Line  data={lineData} options={lineOptions}/>
              </div>
              <div className = 'dboardGraphContainer'>
                <DgraphHeader name = {'Total Customers'} handleSelect = {(e)=>handleSelect(e)}/>
                <Bar data={barData} options={barOptions}/>
              </div>
            </div>
            <div className='ticketsGrapghParent'>
              <div className='chartPieConatiner'>
                <div className='ticketHead'>
                  <h4>Order Ratings Graph</h4>
                </div>
                <div className='pieParent'>
                  <div>
                    <Doughnut
                      data={{
                        labels:["Food Satisfaction"],
                        datasets:[
                          {
                            data:[75],
                            backgroundColor:"red",
                            circumference:300,
                            cutout:80,
                            borderColor:"transparent",
                          }
                        ],
                      }}
                    >
                      
                    </Doughnut>
                    <h2 className='abstexd'>83%</h2>
                    <h2 className='pieName'>Food Satisfaction</h2>
                  </div>
                  <div>
                    <Doughnut
                      data={{
                        labels:["Chef Review"],
                        datasets:[
                          {
                            data:[75],
                            backgroundColor:"skyblue",
                            circumference:330,
                            cutout:80,
                            borderColor:"transparent",
                          }
                        ],
                      }}
                    >
                      
                    </Doughnut>
                    <h2 className='abstexd'>91%</h2>
                    <h2 className='pieName'>Food Satisfaction</h2>
                  </div>
                </div>
              </div>
              <div className='userTicketsSection'>
                <div className='ticketHead'>
                  <h4>User Tickets</h4>
                  <div className='checkParentBox'>
                    <div className='checkBox'>
                      <label>
                        <div className='flexedtoggle'>
                          <p className={ticketDisplay==="Client"?"active":null}>Client</p>
                          <p className={ticketDisplay==="Client"?null:"active"}>Chef</p>
                        </div>
                        <input checked={ticketDisplay==="Client"?false:true} type="checkbox" className='visbilityNone' onChange={(e)=>ticketsDisplay(e)} />
                      </label>
                    </div>
                    <Link to="#" className='linkfull'>
                      <img src={fullScreen} alt="FullIcon" />
                      <p>Full Screen</p>
                    </Link>
                  </div>
                </div>
                <div className='tickets'>
                  {
                    ticketsData.map((val,key)=>{
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
                  }
                </div>
              </div>
            </div>
            <div className='recentConatiner'>
              <h4>Recent Booking list</h4>
              <table>
                    <thead>
                        <tr>
                            <th>preview</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Time</th>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTabdta.map((val,key)=>{
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
              </table>
            </div>
        </div>
    )
}

export default DashBoard
