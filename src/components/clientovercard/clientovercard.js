import React,{useState,useEffect} from "react";

import "./clientovercard.css"

// Components

import DoughnutComp from "../../components/doughnut/doughnut"


// Assets


function Clientcard({...val}){


  

    return(
        <div className="clientCardProgress">
            <div className="idorder">
                <h3>Order-{val.orderId}</h3>
                <p className={val.issue?"coloredP":null}>
                    {val.issue?"Has Issue":"Booked"}
                </p>
            </div>
            <div className="doughFlex">
                <DoughnutComp issue={val.issue} donughtfor="clientprogress"/>
                <div className="detailedOrder">
                    <div className="perDetailContainer">
                        <div className="perDetail">
                            <h3>Booked on:</h3>
                            <p>{val.bookedOn}</p>
                        </div>
                        <div className="perDetail">
                            <h3>Delivered on:</h3>
                            <p>{val.deliveredon}</p>
                        </div>
                    </div>
                    <div className="perDetailContainer">
                        <div className="perDetail">
                            <h3>Assigned Chef:</h3>
                            <p>{val.assignedChef}</p>
                        </div>
                        <div className="perDetail">
                            <h3>Order Total:</h3>
                            <p>{val.amountTotal}</p>
                        </div>
                    </div>
                    <div className="perDetailContainer">
                        <div className="perDetail">
                            <h3>Occassion:</h3>
                            <p>{val.occasion}</p>
                        </div>
                        <div className="perDetail">
                            <h3>Total person:</h3>
                            <p>{val.totalPersons}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="progressBarClient">
                <p className={val.ordered?"completed":val.ordered===false?"issue":null}>1</p>
                <div></div>
                <p className={val.pending?"completed":val.pending===false?"issue":null}>2</p>
                <div></div>
                <p className={val.chefAssign?"completed":val.chefAssign===false?"issue":null}>3</p>
                <div></div>
                <p className={val.shipping?"completed":val.shipping===false?"issue":null}>4</p>
                <div></div>
                <p className={val.done?"completed":val.done===false?"issue":null}>5</p>
            </div>
            <div className="progressDescription">
                <p>Ordered</p>
                <p>Pending</p>
                <p>Chef Assigned</p>
                <p>Shipping</p>
                <p>Done</p>
            </div>
        </div>
    )
}


export default Clientcard