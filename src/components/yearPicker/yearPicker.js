import React, { useState, useEffect, useRef } from "react";
import calendarIcon from "../../assets/icons/calendarIcon.svg";
import "./yearPicker.css";

function YearPicker({
  minYear ,
  maxYear ,
  yearPickerClass = "",
  onYearChange=()=>{}
}) {
  const [yearArray, setYearArr] = useState([]);
  const [yearValue, setYearValue] = useState();
  const yearBody = useRef();
  const generateYearArr = () => {
    let newArr = [];
    let range = maxYear - minYear + 1;
    for (let i = 0; i < range; i++) {
      newArr[i] = minYear + i;
    }
    setYearArr(newArr);
  };

  useEffect(()=>{
    onYearChange(yearValue)
  },[yearValue])

  useEffect(() => {
    generateYearArr();
  }, []);
  return (
    <div className={"yearPickerWrapper " + yearPickerClass}>
      <div className="yearPickerHeader">
        {yearValue === undefined ? <p>Choose Year</p> : <p>{yearValue}</p>}
        <img
          onClick={() => {
            yearBody.current.classList.toggle("active");
          }}
          src={calendarIcon}
          alt="calendar-icon"
        />
      </div>
      <div ref={yearBody} className="yearPickerBody">
        {yearArray &&
          yearArray.map((item, i) => {
            return (
              <p
                className="yearPickerLabel"
                onClick={() => {
                  setYearValue(item);
                  yearBody.current.classList.remove("active");
                }}
                key={i}
              >
                {item}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default YearPicker;
