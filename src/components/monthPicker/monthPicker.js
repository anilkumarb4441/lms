import React, { useState, useRef, useEffect } from "react";
import calendarIcon from "../../assets/icons/calendarIcon.svg";
import "./monthPicker.css";
import { MONTHS } from "../../constants.js";

function MonthPicker({
  defaultMonth,
  monthPickerClass = "",
  onMonthChange = () => {},
}) {
  const monthBody = useRef();
  const [monthArr, setMonthArr] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ]);

  const [monthValue, setMonthValue] = useState(defaultMonth);

  useEffect(() => {
    onMonthChange(monthValue);
  }, [monthValue]);

  return (
    <div className={"monthPickerWrapper " + monthPickerClass}>
      <div className="monthPickerHeader">
        {monthValue === undefined ? (
          <p>Choose Month</p>
        ) : (
          <p>{MONTHS[monthValue].slice(0, 3)}</p>
        )}
        <img
          onClick={() => {
            monthBody.current.classList.toggle("active");
          }}
          src={calendarIcon}
          alt="calendar-icon"
        />
      </div>
      <div ref={monthBody} className="monthPickerBody">
        {monthArr &&
          monthArr.map((item, i) => {
            return (
              <p
                className="monthPickerLabel"
                onClick={() => {
                  setMonthValue(item);
                  monthBody.current.classList.remove("active");
                }}
                key={i}
              >
                {MONTHS[item].slice(0, 3)}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default MonthPicker;
