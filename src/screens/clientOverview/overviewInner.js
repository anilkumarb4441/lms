import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
//assets
import mailIcon from "../../assets/chefview/mailIcon.svg"
import phoneIcon from "../../assets/chefview/phoneIcon.svg"
import locationIcon from "../../assets/clientView/locationIcon.svg"
// import booked from "../../assets/clientView/booked.svg"


//css
import './overviewInner.css'


// Components
import Clientcard from "../../components/clientovercard/clientovercard"
import DoughnutComp from '../../components/doughnut/doughnut';
import { Chart, registerables, ArcElement } from "chart.js";
import { Doughnut } from 'react-chartjs-2';


const OverViewInner = ({ particularChef,chefId, setParticularChef }) =>
{
  Chart.register(...registerables);
  Chart.register(ArcElement);
  const [tickets, setTickets] = useState([]);
  const trackValue = 30;


  const objTemp = [
    {
      orderId:"#12345",
      issue:false,
      bookedOn:"09.02.22",
      deliveredon:"11.02.22",
      assignedChef:"NA",
      amountTotal:"1500 INR",
      occasion:"House Party",
      totalPersons:"20",
      ordered:true,
      pending:true,
      chefAssign:true,
      shipping:true,
      done:""
    },
    {
      orderId:"#12345",
      issue:false,
      bookedOn:"09.02.22",
      deliveredon:"11.02.22",
      assignedChef:"NA",
      amountTotal:"1500 INR",
      occasion:"House Party",
      totalPersons:"20",
      ordered:true,
      pending:true,
      chefAssign:true,
      shipping:true,
      done:true
    },
    {
      orderId:"#12345",
      issue:true,
      bookedOn:"09.02.22",
      deliveredon:"11.02.22",
      assignedChef:"NA",
      amountTotal:"1500 INR",
      occasion:"House Party",
      totalPersons:"20",
      ordered:true,
      pending:true,
      chefAssign:true,
      shipping:true,
      done:true
    },
    {
      orderId:"#12345",
      issue:false,
      bookedOn:"09.02.22",
      deliveredon:"11.02.22",
      assignedChef:"NA",
      amountTotal:"1500 INR",
      occasion:"House Party",
      totalPersons:"20",
      ordered:true,
      pending:true,
      chefAssign:true,
      shipping:true,
      done:true
    }
  ]

  const [dataOrder, setdataOrder] = useState(objTemp)


  return (
      <div className="overviewInner">
                  <div className="flexalign">
          <IoIosArrowBack className = 'goBack' onClick={(e)=>setParticularChef(false)}/>
          <h1>Client-{chefId}</h1>
        </div>
      <div className="section1">
              <div className="clientInfoCard">
                <div className="clientInfo">
            <div className="imgHold">
                  </div>
            <h2>Ekka Singh</h2>
            <p>{chefId}</p>
                </div>
                <div className="clientContact">
            <div className="contactItem">
              <img src={mailIcon} alt="MailIcon" />
                  <a href="mailto:Enakshi@gmail.com">Enakshi@gmail.com</a></div>
            <div className="contactItem">
              <img src={phoneIcon} alt="MailIcon" />
                  <a href="tel:9123456789">9123456789</a>
                      </div>
              <div className="contactItem">
                         <img src={locationIcon} alt="MailIcon" style={{width: "76px"}}/>
                  <a href="tel:9123456789">Sed ut perspiciatis unde omnis iste natus error sit voluptatem  doloremque laudantium, totam rem aperiam.</a>
                      </div>
                </div>
              </div>
              <div className='userTicketsSection'>
                    <div className='ticketHead'>
                      <h4>Tickets </h4>
                    </div>
                    <div className='tickets'>
                    </div>
              </div>
      </div>

      {/* Section 2 */}
      <div className='CardinClient'>
        {
          dataOrder.map((val,key)=>{
            return(
              <Clientcard {...val} />
            )
          })
        }
      </div>
        
     </div>
  )
}

export default OverViewInner
