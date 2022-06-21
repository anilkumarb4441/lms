import React from 'react'
import bday from "../../assets/services/birthday.png"
import './index.css'

function ServiceCard({
    onReviewClick
}) {
    return (
        <div className = 'serviceCard'>
            <div className = 'serviceCardHead'>
                <img src = {bday} alt = 'cardImg'/>
                <hr/>
            </div>
            <div className = 'serviceCardBody' >
                <p>Birthday</p>
                <div>
                    <p>4589</p>
                    <p>Orders Completed</p>
                </div>
                <p onClick={()=>onReviewClick('Birthday')}>Reviews and Ratings</p>
            </div>
        </div>
    )
}

export default ServiceCard
