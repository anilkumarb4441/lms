import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./actions.js";
import { camelToSentence } from "../../utils/constants";
import axios from "axios";
import { URLS } from "../../utils/urlConstants";
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
  const wrapperRef = useRef(); //Table Wrapper Ref
  const mainTabArr = [
    { name: "Open Leads", value: "pending" },
    { name: "Untouched Leads", value: "untouched" },
    { name: "Closed Leads", value: "completed" },
  ];

  const callStatusArr = [
    {name:"Untouched",value:'untouched'},
    {name:"Interested",value:'interested'},
    {name:"Not Interested",value:'notInterested'},
    {name:"Not Answered",value:'notAnswered'},
    {name:"Switched Off",value:'switchedOff'},
    {name:"Wrong Number",value:'wrongNumber'},
  ];
  const subTabArr = [
    { name: "Today Leads", value: "todayLeads" },
    { name: "Old Leads", value: "oldLeads" },
  ];

  const leadGenArr = [
    { name: "All", value: "all" },
    { name: "Cold Lead", value: "cold" },
    { name: "Hot Lead", value: "hot" },
  ];

  // lead details form Data
  const [formData, setFormData] = useState([
    {
      name: "name",
      value: "",
      type: "text",
      label: "Lead Name*",
      required: true,
    },
    {
      name: "phone",
      value: "",
      type: "phone",
      label: "Mobile No*",
      pattern: "[6-9]{1}[0-9]{9}",
      required: true,
    },

    {
      name: "email",
      value: "",
      type: "email",
      label: "Email",
      required: false,
    },

    {
      name: "college",
      value: "",
      type: "text",
      label: "College",
      required: false,
    },
    {
      name: "branch",
      value: "",
      type: "text",
      label: "Branch Name",
      required: false,
    },
    {
      name: "yearOfPassOut",
      value: "",
      type: "number",
      label: "Year Of Pass Out",
      required: false,
    },
    {
      name: "source",
      value: "",
      element:'select',
      selectHeading:'Select Source',
      selectArr : [{name:"Facebook",value:'facebook'},{name:"Linkedin",value:'linkedIn'}],
      label: "Source*",
      required: true,
    },
    {
      name: "isCampaign",
      value: true,
      type: "checkbox",
      label: "Campaign Generated",
      required: false,
    },
  ]);

  // call form Data
  const [callFormData, setCallFormData] = useState([
    {
      name: "response",
      value: "",
      required: true,
      label: "Call Response",
      type: "text",
    },

    {
      name: "status",
      value: "",
      required: true,
      label:'Call Status',
      element: "select",
      selectHeading: " Select Call Status",
      selectArr: callStatusArr,
    },
  ]);

  // action options for untouched leads
  const [actionOptions, setActionOptions] = useState([
    {
      name: "Edit Lead",
      color: "orange",
    },
    {
      name: "Assign To",
      color: "green",
    },
  ]);

  // action options for pending leads
  const [openactionOptions, setopenactionOptions] = useState([
    {
      name: "Edit Lead",
      color: "orange",
    },
    {
      name: "Update Call Response",
      color: "green",
    },
  ]);

  const [originalColumns, setOriginalColumns] = useState([
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
    { Header: "Name", 
    accessor: "name" },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: "email",
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
      accessor: "yearOfPassOut",
    },
    {
      Header: "Call Response",
      accessor: (row) => row.callLogs?.response,
    },

    {
      Header: "Call Status",
      accessor: (row) => row.callLogs?.status,
    },

    {
      Header: "Call Count",
      accessor: "callCount",
    },

    {
      Header: "Lead Gen",
      accessor: "leadGen",
      Cell: (props) => {
        return (
          <p className={props.cell.row.original.leadGen}>
            {camelToSentence(props.cell.row.original.leadGen)}
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
  const [originalData, setOriginalData] = useState([]);

  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  // function to handle table row action btns
  const handleAction = (name, rowData) => {
    switch (name) {
      case "Edit Lead":
        //  if(rowData.assignedTo===rowData.)
        dispatch(actions.editLead(rowData, formData));
        return;
      case "Assign To":
        dispatch(actions.assignLead(rowData,'single'));
        return
      case "Update Call Response":
        dispatch(actions.updateCallResponse(rowData,callFormData));
        return
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

  //get leads data based on filter
  const getLeadsByFilters = () => {
    axios({
      method: "post",
      url: URLS.getLeadsBasedOnFilter,
      data: {
        mainFilter: reducer.mainLeadTab,
        subFilter: reducer.subLeadTab,
        subMostFilter: reducer.leadGen,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setTableData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try later");
      });
  };

  // submit add edit lead form/ call update form
  const submitForm = (e) => {
    e.preventDefault();

    let leadObject = reducer.formData.reduce((prev, current) => {
      return { ...prev, [current.name]: current.value };
    }, {});
    switch (reducer.formHeading) {
      case "Add Lead":
        axios({
          url: URLS.createLead,
          method: "post",
          data: leadObject,
        })
          .then((res) => {
            if (res.status === 200) {
              let newData = [...tableData];
              newData[0] = {...res.data};
              setTableData(newData)
              alert("Lead SuccesFully Created");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong. Please try later");
          });
        return;

      case "Edit Lead":
        axios({
          method:'post',
          url:URLS.editLead,
          data:leadObject
        }).then((res)=>{
             if(res.status===200){
               debugger;
               let index = tableData.findIndex(obj=>obj.leadId===res.data.leadId)
               let newData = [...tableData]
                  newData[index] ={...res.data}
                  setTableData(newData)
                  alert("Lead SuccesFully Edited")
                  dispatch(actions.closeForm())
             }
        }).catch((err)=>{
           console.log(err)
           alert("Something went wrong. Please try later");
        })
        return;

      case "Update Call":
        axios({
          method: "post",
          url: URLS.updateCallLog,
          data: leadObject,
        })
          .then((res) => {
            dispatch(actions.closeForm())
          })
          .catch((err) => {
            console.log(err)
            alert("Something went wrong. Please try later");
          });
    }
  };

  //setting  columns change function
  useEffect(() => {
    switch (reducer.mainLeadTab) {
     
      case "completed":
        let newCol1 = originalColumns.filter(
          (obj) => obj.accessor !== "actions"
        );
        setColumns(newCol1);
        return;
     
      case "pending":
        let newCol2 = originalColumns.filter(
          (obj) => obj.accessor !== "actions"
        );
        let actionCol2 = {
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
        };
        newCol2 = [...newCol2, actionCol2];
        setColumns(newCol2);
        return;
      
      case "untouched":
        let newCol3 = originalColumns.filter(
          (obj) => obj.accessor !== "leadResponse"
        );
        setColumns(newCol3);
        return;
      
      default:
        setColumns([]);
        return;
    }
  }, [reducer.mainLeadTab]);

  // status change function
  useEffect(() => {
    getLeadsByFilters();
  }, [reducer.leadGen, reducer.mainLeadTab, reducer.subLeadTab]);

  useEffect(() => {
    wrapperRef?.current?.scrollTo(0, 0);
  }, [reducer.mainLeadTab, reducer.subLeadTab]);

  // default reducer state on load
  useEffect(() => {
    dispatch(actions.setDefaultState());
  }, []);

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
              activeValue={reducer.mainLeadTab}
              handleTab={(item) => dispatch(actions.handleMainTab(item))}
            />

            <Tabs
              tabArr={subTabArr}
              tabsClass="leadTabs"
              activeValue={reducer.subLeadTab}
              handleTab={(item) => dispatch(actions.handleSubTab(item))}
            />
            <div className="lead-filter-header">
              <div>
                <Input
                  value={reducer.leadGen}
                  element="select"
                  inputClass="leadTable"
                  change={(e) => {
                    dispatch(actions.setLeadGen(e.target.value));
                  }}
                  selectHeading={"Status"}
                  selectArr={leadGenArr}
                />
              </div>
              {reducer.mainLeadTab === "untouched" && (
                <div>
                  <button
                    className="btnPrimary"
                    onClick={() => {
                      dispatch(actions.addLead(formData));
                    }}
                  >
                    Add Lead
                  </button>
                  <button
                    onClick={() => dispatch(actions.openBulkModal())}
                    className="btnPrimary"
                  >
                    Bulk Upload
                  </button>
                </div>
              )}
            </div>
            <div className="lead-filter-header">
              <div>
              <Input
                placeholder="Search By Name"
                inputClass="leadsSearch"
                type="search"
                value={reducer.search}
                change={(e) => {
                  dispatch(actions.handleSearch(e));
                }}
              />
              </div>
            
              
             <div>
              {reducer.mainLeadTab==="untouched" && <button onClick = {()=>{dispatch(actions.assignLead(null,'bulk'))}} className = "btnPrimary">Assign Leads</button>}
             </div>
            
            </div>

            <div>
              
              <Table
                wrapperRef={wrapperRef}
                search={false}
                showColumns={false}
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
                submitForm={submitForm}
              />
            )}
            {reducer.openBulkModal && (
              <BulkUpload
                show={reducer.openBulkModal}
                handleDisplay={() => dispatch(actions.closeBulkModal())}
              />
            )}
            {reducer.openAssignModal && (
              <AssignToModal
                rowObj={{ ...reducer.rowObj }}
                assignType = {reducer.assignType}
                callback={() => {
                  console.log("callback");
                }}
                show={reducer.openAssignModal}
                handleDisplay={() => dispatch(actions.closeAssignModal())}
              />
            )}
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
                        <p
                          style={{
                            marginTop: "10px",
                            borderRadius: "15px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                            fontSize: "14px",
                            backgroundColor: "red",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          Pending{" "}
                        </p>
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
                        <p
                          style={{
                            marginTop: "10px",
                            borderRadius: "15px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                            fontSize: "14px",
                            backgroundColor: "green",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          Paid{" "}
                        </p>
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
/*
branch: "branch 1"
college: "College 11234"
date: "2022-06-28T18:30:00.000Z"
email: "hr@smackhire.com"
isAssigned: false
isCampaign: "true"
isCustomer: false
leadGen: "cold"
leadId: "96OS8"
name: "NIRMAL"
occurrence: 1  
phone: "8374370427"
callLogs :    // Open Leads
{
status: "untouched","interested","notInterested","notAnswered","switchedOff","wrongNumber"
response:""
}
callCount:''  // Open Leads
yearOfPassOut: "2020"
_id: "62badb71323fbc8e11aa716a"


Leads filter data
{mainFilter:'untouched'||'completed'||'pending'}
{subFilter:'todayLeads'||'oldLeads'}
{subMostFilter:'all'||'hot'||'cold'}
*/
