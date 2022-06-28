import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./actions.js";
import { camelToSentence } from "../../utils/constants";
import axios from "axios"

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
import AddEditLeadForm from "../../components/addEditLeadForm/addEditLeadForm.js";
import AssignToModal from "../../components/assignToModal/assignToModal.js";
import BulkUpload from "../../components/bulkUpload/bulkupload.js";

function Leads() {
  const reducer = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  const mainTabArr = [
    { name: "Open Leads", value: "openLeads" },
    { name: "Untouched Leads", value: "untouchedLeads" },
    { name: "Closed Leads", value: "closedLeads" },
  ];
  const subTabArr = [
    { name: "Today Leads", value: "openLeads" },
    { name: "Old Leads", value: "oldLeads" },
  ];

  const statusArr = [
    { name: "All", value: "all" },
    { name: "Cold Lead", value: "coldLead" },
    { name: "Hot Lead", value: "hotLead" },
  ];

  const [formData, setFormData] = useState([
    {
      name: "name",
      value: "",
      type: "text",
      placeholder: "Lead Name*",
    },
    {
      name: "phone",
      value: "",
      type: "phone",
      placeholder: "Mobile No*",
      pattern: "[6-9]{1}[0-9]{9}",
    },

    {
      name: "college",
      value: "",
      type: "text",
      placeholder: "College",
      required: false,
    },
    {
      name: "branch",
      value: "",
      type: "text",
      placeholder: "Branch Name",
    },
    {
      name: "year_of_pass_out",
      value: "",
      type: "number",
      placeholder: "Year Of Pass Out",
      required: false,
    },
    {
      name: "source",
      value: "",
      type: "text",
      placeholder: "Source*",
    },
  ]);

  const [actionOptions, setActionOptions] = useState([
    {
      name: "Edit Lead",
      color: "orange",
    },
    {
      name: "Assign To",
      color: "green",
    },
    {
      name: "Delete Lead",
      color: "red",
    },
  ]);

  // Temp
  const [openactionOptions, setopenactionOptions] = useState([
    {
      name: "Edit Lead",
      color: "orange",
    },
    {
      name: "Add Response",
      color: "green",
    },
    {
      name: "Delete",
      color: "red",
    },
  ]);

  const [originalColumns, setOriginalColumns] = useState(
    [
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
      accessor: "experience",
    },
    {
      Header: "Lead Response",
      accessor: "leadResponse",
    },

    {
      Header: "Call Count",
      accessor: "callCount",
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
      Cell: (props) => {
        return (
          <Dots
          // options={reducer.mainLeadTab==="untouchedLeads"?actionOptions:openactionOptions}
            options={actionOptions}
            onclick={(name) => handleAction(name, props.cell.row.original)}
          />
        );
      },
    },
  ]);


  // Temp Columns

  var tempCol =    [
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
      Header: "Lead Response",
      accessor: "leadResponse",
    },

    {
      Header: "Call Count",
      accessor: "callCount",
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
      Cell: (props) => {
        return (
          <Dots
            options={openactionOptions}
            onclick={(name) => handleAction(name, props.cell.row.original)}
          />
        );
      },
    },
  ]

  // 
  const [openColumns, setopenColumns] = useState(tempCol)

  const [originalData, setOriginalData] = useState([
    {
      leadId: "#58797",
      name: "Nirmal Rajana",
      phone: "9999999999",
      college: "VVVSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: "2 months",
      status: "hotLead",
      leadResponse: "Not Answered",
      callCount: 2,
    },
    {
      leadId: "#58797",
      name: "Manoj Kumar",
      phone: "9999999999",
      college: "SS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: "2 months",
      status: "coldLead",
      leadResponse: "Not Answered",
      callCount: 2,
    },
    {
      leadId: "#58797",
      name: "Karthik S",
      phone: "9999999999",
      college: "VVSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: "2 months",
      status: "coldLead",
      leadResponse: "Not Answered",
      callCount: 2,
    },
    {
      leadId: "#58797",
      name: "Tanisha G",
      phone: "9999999999",
      college: "VSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2022,
      experience: "2 months",
      status: "hotLead",
      leadResponse: "Not Answered",
      callCount: 2,
    },
    {
      leadId: "#58797",
      name: "Nirmal Rajana",
      phone: "9999999999",
      college: "VVVSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: "2 months",
      status: "hotLead",
      leadResponse: "Not Answered",
      callCount: 2,
    },
    {
      leadId: "#58797",
      name: "Nirmal Rajana",
      phone: "9999999999",
      college: "VVVSS College of Engineering",
      branch: "Computer Science",
      year_of_pass_out: 2019,
      experience: "2 months",
      status: "coldLead",
      leadResponse: "Not Answered",
      callCount: 2,
    },
  ]);

  const [columns, setColumns] = useState(originalColumns);

  const [tableData, setTableData] = useState(originalData);

  // function to handle table row action btns
  const handleAction = (name, rowData) => {
    switch (name) {
      case "Edit Lead":
        dispatch(actions.editLead(rowData, formData));
        return;
      case "Assign To":
        dispatch(actions.assignLead(rowData));

    }
  };
  const openInner = (rowObj) => {
    dispatch(actions.openInner(rowObj));
  };

  const menuArr = [
    "product ID # jkahd1t645",
    "product ID # kjg4uyy265v",
    "product ID # skjjhdu3vg",
    "product ID # zgdg6geku8",
  ];

  // submit add edit lead form
  const submitForm = (e) => {
    e.preventDefault();
    return
    let leadObject = formData.reduce(
      (prev, current) => {
        return { ...prev, [current.name]: current.value };
      },
      {}
    );
    axios({
      url:'',
      method:'',
      data:leadObject
    }).then((res)=>{
         
    }).catch((err)=>{
      console.log(err)
    })
  };

  //settig  columns change function
  useEffect(() => {
    switch (reducer.mainLeadTab) {
      case "closedLeads":
        let newCol = columns.filter((obj) => obj.accessor !== "actions");
        setColumns(newCol);
        return;
      case "openLeads":
        setColumns(openColumns);
        return;
      case "untouchedLeads":
        setColumns(originalColumns);
        return;
      default:
        setColumns(originalColumns);
        return;
    }
  }, [reducer.mainLeadTab]);



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
      <div className="leadsScreen">
        {/* MAIN LEAD PAGE */}
        {!reducer.openInner && (
          <div>
            <Tabs
              tabArr={mainTabArr}
              tabsClass="leadTabs"
              handleTab={(item) => dispatch(actions.handleMainTab(item))}
            />

            <Tabs
              tabArr={subTabArr}
              tabsClass="leadTabs"
              handleTab={(item) => dispatch(actions.handleSubTab(item))}
            />
            <div className="lead-filter-header">
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
              {reducer.mainLeadTab === "untouchedLeads" && (
                <div>
                  <button
                    className="btnPrimary"
                    onClick={() => {
                      dispatch(actions.addLead(formData));
                    }}
                  >
                    Add Lead
                  </button>
                  <button  onClick = {()=>dispatch(actions.openBulkModal())} className="btnPrimary">Bulk Upload</button>
                </div>
              )}
            </div>

            <div>
              <Table
                search={true}
                columns={[...columns]}
                data={tableData}
                tClass="leadTable actionsTable"
              />
            </div>

            {reducer.openForm && (
              <AddEditLeadForm
                show={reducer.openForm}
                handleInputChange={(e, i) =>
                  dispatch(actions.changeInput(e, i, [...reducer.formData]))
                }
                formData={[...reducer.formData]}
                handleDisplay={() => dispatch(actions.closeForm())}
                heading={reducer.formHeading}
                submitForm = {submitForm}
              /> 
            )}
            { 
               reducer.openBulkModal && (
                 <BulkUpload
                 show  ={reducer.openBulkModal}
                 handleDisplay = {()=>dispatch(actions.closeBulkModal())}
                
                 />
               )
            }
            {reducer.openAssignModal &&
              <AssignToModal
               rowObj = {{...reducer.rowObj}}
               callback = {()=>{
                 console.log('callback')
               }}
               show = {reducer.openAssignModal}
               handleDisplay = {()=>dispatch(actions.closeAssignModal())}
              />
              }
          </div>
        )}

        {/* LEAD INNER PAGE */}
        {reducer.openInner && (
          <div className="leadsInner">
            <IoIosArrowBack
              className="goBack"
              onClick={() => {
                dispatch(actions.closeInner());
              }}
            />
            <div className="leadsInnerWrapper">
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
                    <p>Product's</p>
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
                    <p>Product Details</p>
                    <div>
                      <img src={clientProfile} alt="clientProfile" />
                      <div>
                        <p>Internship - Machine Learning - Self-Paced</p>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam nonumy eirmod tempor invidunt ut
                          labore et Lorem ipsum dolor sit amet, consetetur
                          sadipscing elitr, sed diam nonumy eirmod tempor
                          invidunt ut labore et consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et
                        </p>
                        <p style={{marginTop:'10px' , borderRadius:'15px' , paddingLeft:'10px' , paddingRight:'10px' , paddingTop:'2px' , paddingBottom:'2px' , fontSize:'14px' , backgroundColor:'red' , display:'inline-block'}} > Pending </p>
                      </div>
                    </div>
                  </div>
                  <div className="feedBackCard">
                    <p>Product Details</p>
                    <div>
                      <img src={clientProfile} alt="clientProfile" />
                      <div>
                        <p>Internship - Web Development - Mentorled</p>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam nonumy eirmod tempor invidunt ut
                          labore et Lorem ipsum dolor sit amet, consetetur
                          sadipscing elitr, sed diam nonumy eirmod tempor
                          invidunt ut labore et consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et
                        </p>
                        <p style={{marginTop:'10px' , borderRadius:'15px' , paddingLeft:'10px' , paddingRight:'10px' , paddingTop:'2px' , paddingBottom:'2px' , fontSize:'14px' , backgroundColor:'green' , display:'inline-block'}} > Paid </p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Leads;
