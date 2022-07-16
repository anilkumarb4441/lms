import React,{useState,useEffect} from 'react'
import "./doughnut.css"

import generalorder from "../../assets/clientView/generalorder.svg"
import Issue from "../../assets/clientView/Issue.svg"
import { Chart, registerables, ArcElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
Chart.register(...registerables);
Chart.register(ArcElement);


function DoughnutComp({type,digit,subtext,donughtfor,issue,pieData}){

    return(
            donughtfor==="clientprogress"?
            <div className='doughParentnew'>
                <Doughnut  
                    data={{

                        datasets:[
                            {
                                data:[75,25],
                                backgroundColor:(issue?["red","#63626A"]:["skyblue","#63626A"]),
                                circumference:360,
                                cutout:50,
                                borderColor:"transparent",
                                
                            }
                            ],
                        }}
                >
                        
                </Doughnut>
                <div className='imgHolderClient'>
                    <img src={issue?Issue:generalorder} alt="Book-Icon" />
                </div>
            </div>
            :
            donughtfor==="doughnut"?
            <>
                <Doughnut id="myChart"  data = {pieData} 
                />
            </>:
            <div className='doughParent'>
              
                <Doughnut

                    data={{
                       
                        datasets:[
                            {
                                data:(type==="Ratings"?[75,25]:[digit,100-digit]),
                                backgroundColor:(type==="Ratings"?["red","#63626A"]:type==="Total Coupons"?["skyblue","#63626A"]:type==="Total Bookings"?["red","#63626A"]:type==="Attendance"?[(digit>70?"green":digit<70&&digit>50?"red":null),"#63626A"]:null),
                                circumference:360,
                                cutout:100,
                                borderColor:"transparent",
                            }
                            ],
                        }}
                >
                        
                </Doughnut>
                <p className='absD1'>{digit}{type==="Attendance"?"%":null}</p>
                <p className='absD2'>{subtext}</p>
            </div>
    )
}

export default DoughnutComp;