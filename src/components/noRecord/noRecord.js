import React from 'react'
import noRecordImg from "../../assets/icons/noRecord.svg"
import "./noRecord.css"

function NoRecord() {
    return (
        <div className="norecordMain ">
            <div className="noimgparent">
                <img src={noRecordImg} alt="No-Data Image" className="imgNodata"/>
                </div>
                    <p className="textNo">No Records Found</p>
                    </div>
    )
}

export default NoRecord
