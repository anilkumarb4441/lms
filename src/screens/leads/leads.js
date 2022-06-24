import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./actions.js";
import { camelToSentence } from "../../utils/constants";

//css
import "./leads.css";

//assets
import clientProfile from "../../assets/bookings/clientProfile.png";
import locIcon from "../../assets/bookings/location.svg";

//components
import Input from "../../components/Input";
import Table from "../../components/Table";
import Tabs from "../../components/tabs/tabs.js";
import { IoIosArrowBack } from "react-icons/io";
import Dots from "../../components/dots/dots.js";

function Leads() {
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.leads);
  // const [openModal, setOpenModal] = useState(false);
  const [mainTabArr, setMainTabArr] = useState([
    { name: "Open Leads", value: "openLeads" },
    { name: "Untouched Leads", value: "untouchedLeads" },
    { name: "Closed Leads", value: "closedLeads" },
  ]);
  const [subTabArr, setSubTabArr] = useState([
    { name: "Today Leads", value: "openLeads" },
    { name: "Old Leads", value: "oldLeads" },
    
  ]);

  const [statusArr, setStatusArr] = useState([
    { name: "All", value: "all" },
    { name: "Cold Lead", value: "coldLead" },
    { name: "Hot Lead", value: "hotLead" },
  ]);

  const handleAction = (name)=>{
    switch(name){
      case 'Edit Lead':
        actions.editLead()  
    }
     
  }
  const [actionOptions, setActionOptions] = useState([
    {
      name: "Edit Lead",
      color: "orange",
    },
    {
      name: "Assign to",
      color: "green",
    },
    {
      name:"Delete Lead",
      color:'red'
    }
  ]);

  const [columns, setColumns] = useState([
    {
      Header: "Lead Id",
      accessor: "leadId",
      Cell: (props) => {
        return (
          <p
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => openInner(props.cell.row.original)}
          >
            {props.cell.row.original.leadId}
          </p>
        );
      },
    },
    { Header: "Name", accessor: "name" },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "College",
      accessor: "college",
    },
    {
      Header: "Branch",
      accessor: "branch",
    },
    {
      Header: "Year of Pass Out",
      accessor: "year_of_pass_out",
    },
    {
      Header: "Experience",
      accessor: (row) =>
        parseInt(row.year_of_pass_out) < new Date().getFullYear()
          ? `${row.experience} yrs`
          : "---",
    },
    {
      Header:'Lead Response',
      accessor:"leadResponse"
    },

    {
      Header:'Call Count',
      accessor:"callCount"
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
    {
      Header: "Actions",
      accessor: "actions",
      Cell: () => {
        return <Dots options={actionOptions} onclick={handleAction} />;
      },
    },
  ]);

  const [originalData, setOriginalData] = useState([
    {
      leadId: "#58797",
      name: "Nirmal Rajana",
      phone: "9999999999",
      college: "VVVSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: 4,
      status: "hotLead",
      leadResponse:'Not Answered',
      callCount:2,
    },
    {
      leadId: "#58797",
      name: "Manoj Kumar",
      phone: "9999999999",
      college: "SS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: 4,
      status: "coldLead",
      leadResponse:'Not Answered',
      callCount:2,
    },
    {
      leadId: "#58797",
      name: "Karthik S",
      phone: "9999999999",
      college: "VVSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: 4,
      status: "coldLead",
      leadResponse:'Not Answered',
      callCount:2,
    },
    {
      leadId: "#58797",
      name: "Tanisha G",
      phone: "9999999999",
      college: "VSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2022,
      experience: 4,
      status: "hotLead",
      leadResponse:'Not Answered',
      callCount:2,
    },
    {
      leadId: "#58797",
      name: "Nirmal Rajana",
      phone: "9999999999",
      college: "VVVSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: 4,
      status: "hotLead",
      leadResponse:'Not Answered',
      callCount:2,
    },
    {
      leadId: "#58797",
      name: "Nirmal Rajana",
      phone: "9999999999",
      college: "VVVSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: 4,
      status: "coldLead",
      leadResponse:'Not Answered',
      callCount:2,
    },
  ]);
  const [tableData, setTableData] = useState(originalData);

  const openInner = (rowObj) => {
    dispatch(actions.openInner(rowObj));
  };

  const [formObj, setFormObj] = useState({
    chefs: [""],
    clientName: "",
    address: "",
    date: "",
    time: "",
    people: "",
    ingredientsList: "",
  });
  const menuArr = [
    "Item 1(Starter)",
    "Item 2(Starter)",
    "Item 3(Main Course)",
    "Item 4(Main Course)",
  ];

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formObj);
  };

  // status change function
  useEffect(() => {
    if (reducer.status === "all") {
      setTableData(originalData);
      return;
    }
    let newArr = originalData.filter((obj) => obj.status === reducer.status);
    setTableData(newArr);
  }, [reducer.status]);
  return (
    <>
      <p className="screenTitle">{reducer.title}</p>

     
        <Tabs
          tabArr={mainTabArr}
          tabsClass = "leadTabs"
          handleTab={(item) => dispatch(actions.handleMainTab(item))}
        />

         <Tabs
          tabArr={subTabArr}
          tabsClass = "leadTabs"
          handleTab={(item) => dispatch(actions.handleSubTab(item))}
        />
     
        <div className="leadsScreen">
          <div className="filter-header">
            <div>
                <Input
                  value={reducer.status}
                  element="select"
                  inputClass="leadTable"
                  change={(e) => {
                    dispatch(actions.setStatus(e.target.value));
                  }}
                  selectHeading={"Status"}
                  selectArr={statusArr}
                />           
            </div>
          
          </div>
         
            <div>
              <Table
                search={true}
                columns={columns}
                data={tableData}
                tClass="leadTable actionsTable"
              />
            </div>
        
          {reducer.openInner && (<>
            <IoIosArrowBack
            className="goBack"
            onClick={() => {
              dispatch(actions.closeInner());
            }}
          />
            <div className="bookingInner">
              <div className="bookingInvoiceContainer">
                <div className="clientProfileContainer">
                  <div className="clientProfile">
                    <img src={clientProfile} alt="clientProfile" />
                    <p>Manish Arora</p>
                  </div>

                  <div className="clientDescription">
                    <p>Description</p>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et
                    </p>
                  </div>
                  <div className="clientLocation">
                    <img src={locIcon} alt="locationIcon" />
                    <p>HSR Layout, Sec 3, 500102</p>
                  </div>
                </div>
                <div className="bookingsInvoice">
                  <p>Booking Invoice</p>
                  <div>
                    <p>Date</p>
                    <p>02.01.2022</p>
                    <p>Time</p>
                    <p>9:30 am</p>
                    <p>Day</p>
                    <p>Sunday</p>
                    <p>People</p>
                    <p>10</p>
                    <p>Requirements</p>
                    <p>1 Cook + 1 helper</p>
                    <p>Total Amount</p>
                    <p>1700</p>
                  </div>
                  <div>
                    <p>Menu</p>
                    <div>
                      {menuArr &&
                        menuArr.map((item, i) => {
                          return <p>{item}</p>;
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="feedBackContainer">
                <div className="feedBackInner">
                  <div className="feedBackCard">
                    <p>Client's FeedBack</p>
                    <div>
                      <img src={clientProfile} alt="clientProfile" />
                      <div>
                        <p>Manish Arora</p>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam nonumy eirmod tempor invidunt ut
                          labore et Lorem ipsum dolor sit amet, consetetur
                          sadipscing elitr, sed diam nonumy eirmod tempor
                          invidunt ut labore et consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="feedBackCard">
                    <p>Chef's FeedBack</p>
                    <div>
                      <img src={clientProfile} alt="clientProfile" />
                      <div>
                        <p>Manish Arora</p>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam nonumy eirmod tempor invidunt ut
                          labore et Lorem ipsum dolor sit amet, consetetur
                          sadipscing elitr, sed diam nonumy eirmod tempor
                          invidunt ut labore et consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>)}
        </div>
      
    </>
  );
}

export default Leads;
