import React, { useState, useEffect } from "react";

//assets
import calendarIcon from "../../assets/icons/calendarIcon.svg";

//css
import "./generateReport.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

//components
import Modal from "../modal/modal.js";
import { DateRangePicker } from "react-date-range";
import { Calendar } from "react-date-range";
import Input from "../Input";

function GenerateReport({ show, handleDisplay }) {
  const [reportType, setReportType] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [singleDate, setSingleDate] = useState(new Date());
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleRadioInput = (e) => {
    setReportType(e.target.value);
    setShowPicker(false);
  };

  const handleSelectRange = (e) => {
    setSelectionRange({ ...e.selection });
  };

  const onCalendarIconClick = () => {
    if (reportType === "") {
      alert("SelectReportType");
      return;
    }
    setShowPicker((val) => !val);
  };
  return (
    <Modal
      show={show}
      handleDisplay={handleDisplay}
      bodyClick={true}
      header={false}
      modalClass={"generateReport"}
      body={
        <div>
          <p className="generateModalHeading">Generate Modal</p>
          <div className="innerBody">
            <div className="generateReportRadioContainer">
              <Input
                type="radio"
                inputClass="generateReportInput"
                change={(e) => handleRadioInput(e)}
                name="reportType"
                value="single"
                label="Single Day Report"
              />
              <img
               style={{ cursor: "pointer" }}
                className={reportType === "single" ? "" : "disabled"}
                src={calendarIcon}
                alt="calendarIcon"
                onClick = {()=>onCalendarIconClick()}
              />
              {showPicker && reportType === "single" && (
                <Calendar
                  date={singleDate}
                  className="genReportDateRange"
                  onChange={(e) => setSingleDate(e)}
                />
              )}
            </div>
            <div className="generateReportRadioContainer">
              <Input
                type="radio"
                inputClass="generateReportInput"
                change={(e) => handleRadioInput(e)}
                name="reportType"
                value="multiple"
                label="Multiple Day Report"
              />
              
              <img
                style={{ cursor: "pointer" }}
                className={reportType === "multiple" ? "" : "disabled"}
                onClick={() => {
                  onCalendarIconClick();
                }}
                src={calendarIcon}
                alt="calendarIcon"
              />

              {showPicker && reportType === "multiple" && (
                <DateRangePicker
                  ranges={[selectionRange]}
                  className="genReportDateRange"
                  onChange={(e) => handleSelectRange(e)}
                />
              )}
            </div>

            <button className="generateReportBtn">Generate Report</button>
          </div>
        </div>
      }
    />
  );
}

export default GenerateReport;
