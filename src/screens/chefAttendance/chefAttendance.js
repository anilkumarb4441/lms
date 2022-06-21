import React, { useState } from "react";
import { camelToSentence } from "../../constants";
import { calendarIcon } from "../../assets/icons/calendarIcon.svg";
import "./chefAttendance.css";

import Table from "../../components/Table";
import Input from "../../components/Input";
import DatePicker from "react-date-picker";
import MonthPicker from "../../components/monthPicker/monthPicker";
import YearPicker from "../../components/yearPicker/yearPicker";
import GenerateReport from "../../components/generateReport/generateReport";

function ChefAttendance() {
  const [dailyColumns, setDailyColumns] = useState([
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Sign In",
      accessor: "signIn",
    },
    {
      Header: "Sign Out",
      accessor: "signOut",
    },
    {
      Header: "Total",
      accessor: "total",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (props) => {
        return (
          <p className={props.cell.row.original.status}>
            {camelToSentence(props.cell.row.original.status)}
          </p>
        );
      },
    },
  ]);
  const [currentYear, setCurrentYear] = useState();
  const [currentMonth, setCurrentMonth] = useState();
  const [dailyData, setDailyData] = useState([
    {
      name: "John Deo",
      signIn: "10:30",
      signOut: "01:00",
      total: "08:02",
      status: "absent",
    },
    {
      name: "John Dpoe Deo",
      signIn: "10:30",
      signOut: "01:00",
      total: "08:02",
      status: "present",
    },
    {
      name: "John Deo",
      signIn: "10:30",
      signOut: "01:00",
      total: "08:02",
      status: "absent",
    },
  ]);
const [showGenerateModal,setShowGenerateModal]  = useState(false)
  
  const [monthlyData, setMonthlyData] = useState([
    {
      1: { value: "P" },
      2: { value: "P" },
      3: { value: "P" },
      4: { value: "P" },
      5: { value: "P" },
      6: { value: "P" },
      7: { value: "P" },
      8: { value: "P" },
      9: { value: "P" },
      10: { value: "P" },
      11: { value: "P" },
      12: { value: "P" },
      13: { value: "P" },
      14: { value: "P" },
      15: { value: "P" },
      16: { value: "P" },
      17: { value: "P" },
      18: { value: "P" },
      19: { value: "P" },
      20: { value: "P" },
      21: { value: "P" },
      22: { value: "P" },
      employee: { name: "Nirmal" },
    },
    {
      1: { value: "P" },
      2: { value: "P" },
      3: { value: "P" },
      4: { value: "P" },
      5: { value: "P" },
      6: { value: "P" },
      7: { value: "P" },
      8: { value: "P" },
      9: { value: "P" },
      10: { value: "P" },
      11: { value: "P" },
      12: { value: "P" },
      13: { value: "P" },
      14: { value: "P" },
      15: { value: "P" },
      16: { value: "P" },
      17: { value: "P" },
      18: { value: "P" },
      19: { value: "P" },
      20: { value: "P" },
      21: { value: "P" },
      22: { value: "P" },
      employee: { name: "Nirmal" },
    },
  ]);
  const [monthlyColumns, setMonthlyColumns] = useState([
    {
      Header: "Employee Name",
      accessor: "employee",
      sticky: "left",
      Cell: ({ cell }) => {
        return cell.row.original.employee.name;
      },
    },
    
    {
        Header: "1",
        accessor: "1",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "2",
        accessor: "2",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "3",
        accessor: "3",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "4",
        accessor: "4",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "5",
        accessor: "5",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "6",
        accessor: "6",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "7",
        accessor: "7",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "8",
        accessor: "8",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "9",
        accessor: "9",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "10",
        accessor: "10",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "11",
        accessor: "11",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "12",
        accessor: "12",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "13",
        accessor: "13",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "14",
        accessor: "14",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "15",
        accessor: "15",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "16",
        accessor: "16",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "17",
        accessor: "17",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "18",
        accessor: "18",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "19",
        accessor: "19",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "20",
        accessor: "20",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "21",
        accessor: "21",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "22",
        accessor: "22",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "23",
        accessor: "23",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "24",
        accessor: "24",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "25",
        accessor: "25",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "26",
        accessor: "26",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "27",
        accessor: "27",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "28",
        accessor: "28",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "29",
        accessor: "29",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },{
        Header: "30",
        accessor: "30",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
      {
        Header: "31",
        accessor: "31",
        Cell: ({ cell }) => {
          return getAttendanceCell(cell);
        },
      },
  ]);

  const getAttendanceCell = (cell)=>{
     
        if(cell.value && cell.value.value){
                return <p>{cell.value.value}</p>
        }else{
            return null
        }
  }

  const [datVal, setDatVal] = useState(new Date());
  const [screenFlag, setScreenFlag] = useState(true);
  const [screenName, setScreenName] = useState(
    `Daily Attendance (${new Date().toString().slice(0, 15)})`
  );
  const handleDate = (dateVal) => {
    setDatVal(dateVal);
    setScreenName(
      `Daily Attendance (${dateVal.toString().slice(0, 15)})`
    );

  };

  const handleAttendanceScreen = () => {
    setScreenFlag((f) => !f);
  };

  const handleMonthlySearch = ()=>{
    if(currentMonth==undefined || currentYear===undefined ){
      alert('Select both Month and Year')
      return
    }
    let days = new Date(currentYear,currentMonth+1,0).getDate()
    console.log(days)
    let newCol  =   monthlyColumns.slice(0,days+1)
    setMonthlyColumns(newCol)
  }

  return (
    <>
      <div className="chefAttendance">
        <div className="screenTitleContainer">
          <div>
            <p className="screenTitle">{screenName}</p>
          </div>
          <div><button className="btnPrimary" onClick = {()=>setShowGenerateModal(true)}>Generate Report</button></div>
        </div>

        <div className="chefAttendanceheader2">
          <button
            className="btnPrimary"
            onClick={() => {
              handleAttendanceScreen();
            }}
          >
            {screenFlag ? "Monthly Attendance" : "Daily Attendance"}
          </button>
          {screenFlag && <DatePicker
            placeholder="Choose Date"
            type="date"
            className='customDatePicker'
            name="date"
            value={datVal}
            onChange={(e) => handleDate(e)}
          />}
          {!screenFlag &&<>
          <MonthPicker onMonthChange = {(val)=>setCurrentMonth(val)}  monthPickerClass = 'attendance'/> 
          <YearPicker onYearChange = {(val)=>setCurrentYear(val)} minYear = {2011} maxYear = {2022} yearPickerClass = 'attendance'/>
        <button className="btnPrimary" onClick = {()=>handleMonthlySearch()}>Search</button>

          </>}
          
        </div>
        {screenFlag && (
          <Table
            columns={dailyColumns}
            data={dailyData}
            tClass="bTable attendanceTable"
          />
        )}
      </div>
      {!screenFlag && (
        <div className="monthlyAttendance">
          <Table tClass="stickyTable monthly" data={monthlyData} columns={monthlyColumns} />
        </div>
      )}

      {showGenerateModal &&
        <GenerateReport show = {showGenerateModal}
        handleDisplay = {(e)=>setShowGenerateModal(e)}
        />
      }
    </>
  );
}

export default ChefAttendance;
