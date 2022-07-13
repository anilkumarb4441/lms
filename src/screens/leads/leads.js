import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./actions.js";
import * as utils from "../../utils/constants";
import { URLS } from "../../utils/urlConstants";
import { initialState } from "./reducer";
import localStorageService from "../../utils/localStorageService";
import API_SERVICES from "../../utils/API";

//css
import "./leads.css";

//assets
import clientProfile from "../../assets/bookings/clientProfile.png";
import locIcon from "../../assets/bookings/location.svg";
import calendarIcon from "../../assets/icons/calendarIcon.svg";

//components
import Input from "../../components/Input";
import Table from "../../components/Table";
import Tabs from "../../components/tabs/tabs.js";
import Dots from "../../components/dots/dots.js";
import AddEditLeadForm from "../../components/addEditLeadForm/addEditLeadForm.js";
import AssignToModal from "../../components/assignToModal/assignToModal.js";
import BulkUpload from "../../components/bulkUpload/bulkupload.js";
import CalendarModal from "../../components/calendarModal/calendarModal.js";
import LeadsInner from "../leadsInner/leadsInner.js";
import Dropdown from "../../components/dropdown/dropdown.js";

function Leads() {
  const reducer = useSelector((state) => state.leads);
  const [totalCount, setTotalCount] = useState(0);
  const [openCalendar, setOpenCalendar] = useState(false);
  const dispatch = useDispatch();
  const wrapperRef = useRef(); //Table Wrapper Ref
  const mainTabArr = [
    { name: "Open Leads", value: "pending" },
    { name: "Untouched Leads", value: "untouched" },
    { name: "Closed Leads", value: "completed" },
  ];

  const [range, setRange] = useState();

  const callStatusArr = [
    { name: "Interested", value: "interested" },
    { name: "Not Interested", value: "notInterested" },
    { name: "Not Answered", value: "notAnswered" },
    { name: "Switched Off", value: "switchedOff" },
    { name: "Wrong Number", value: "wrongNumber" },
  ];
  const subTabArr = [
    { name: "Today Leads", value: "todayLeads" },
    { name: "Old Leads", value: "oldLeads" },
  ];

  const subMostFilterArr = [
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
      element: "select",
      selectHeading: "Select Source",
      selectArr: [
        { name: "Facebook", value: "facebook" },
        { name: "Email", value: "email" },
        { name: "Self", value: "self" },
        { name: "CGFL", value: "cgfl" },
      ],
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
      label: "Call Status",
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
    {
      name: "Update Call Response",
      color: "red",
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
      color: "red",
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
    { Header: "Name", accessor: "name" },
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
            {utils.camelToSentence(props.cell.row.original.leadGen)}
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
            // options={reducer.filter.mainFilter==="untouchedLeads"?actionOptions:openactionOptions}
            options={actionOptions}
            onclick={(name) => handleAction(name, props.cell.row.original)}
          />
        );
      },
    },
  ]);

  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  // function to handle table row action btns
  const handleAction = (name, rowData) => {
    switch (name) {
       case "Edit Lead":
         dispatch(actions.editLead(rowData, formData));
        // let tokenObj = localStorageService.getTokenDecode();
        //   if(rowData.generatedBy===tokenObj.userId){
        //
        //   }
        return;
   
        case "Assign To":
         dispatch(actions.assignLead(rowData, "single"));
        return;
     
        case "Update Call Response":
         if (rowData.callLogs?.status === "interested"){
          utils.toastWarning("Interseted leads call response cannot be updated");
          return;
        }
         dispatch(actions.updateCallResponse(rowData, callFormData));
        return;
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
  const getLeadsByFilters = (data) => {
    let postObj = data;

    if (data.range) {
      console.log(data.range[0], data.range[1]);
    }
    let callback = (err, res) => {
      if (err) {
        setTableData([]);
        setTotalCount(0);
      }
      if (res && res.status === 200) {
        setTableData(res.data.data);
        setTotalCount(res.data.total);
      }
    };
    API_SERVICES.httpPOSTWithToken(
      URLS.getLeadsBasedOnFilter,
      postObj,
      callback
    );
  };

  // submit add edit lead form/ call update form
  const submitForm = (e) => {
    e.preventDefault();
    let leadObject = reducer.formData.reduce((prev, current) => {
      return { ...prev, [current.name]: current.value };
    }, {});
    switch (reducer.formHeading) {
      case "Add Lead":
        createLead(leadObject);
        return;

      case "Edit Lead":
        editLead(leadObject);
        return;

      case "Update Call":
        updateCallStatus(leadObject);
        return;
    }
  };

  // function to create new lead
  const createLead = (data) => {
    console.log(data,"checking for refrence ids")
    const callback = (err, res) => {
      if (res && res.status === 201) {
        let newData = [...tableData];
        newData[0] = { ...res.data };
        setTableData(newData);
        dispatch(actions.closeForm());
        utils.toastSuccess("Lead SuccesFully Created");
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.createLead, data, callback);
  };

  //function to edit lead
  const editLead = (data) => {
    const callback = (err, res) => {
      if (res && res.status === 200) {
        let index = tableData.findIndex(
          (obj) => obj.leadId === res.data.leadId
        );
        let newData = [...tableData];
        newData[index] = { ...res.data };
        setTableData(newData);
        utils.toastSuccess("Lead SuccesFully Edited");
        dispatch(actions.closeForm());
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.editLead, data, callback);
  };

  // function to update call status
  const updateCallStatus = (data) => {

    const callback = (err, res) => {
      if (res && res.status === 200) {
        if (res.data?.callLogs?.status === "interested") {
          console.log(res.data,"update call lofg")
          createLeadBussiness(res.data);
        }
        let index = tableData.findIndex(
          (obj) => obj.leadId === res.data.leadId
        );
        let newData = [...tableData];
        if (reducer.filter.mainFilter === "pending") {
          newData[index] = { ...res.data };
        } else {
          newData.splice(index, 1);
        }
        setTableData(newData);
        utils.toastSuccess("Call Status Updated in Lead DashBoard");
        dispatch(actions.closeForm());
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.updateCallLog, data, callback);
  };

  // update call status in customer dashboard if lead is interseted
  const createLeadBussiness = (data) => {
    
    let  { name, email, phone } = data;
    let newData = { name, email, phone };
    newData.leadby = data.generatedBy;
    newData.referenceid = data.referenceId;
    newData.leadid = data.leadId;
    const callback = (err, res) => {
      if (err) {
        utils.toastError("Could not update lead in Customer DashBoard");
      }
      if (res && res.status === 200) {
        utils.toastSuccess("Lead updated in Customer DashBoard");
      }
    };
    API_SERVICES.httpPOST(URLS.createLeadBussiness,newData, callback);
  };

  //call back after assigning leads
  const assignLeadCallBack = (err, res) => {
    getLeadsByFilters(reducer.filter);
    if (reducer.assignType === "single") {
      dispatch(actions.closeAssignModal());
    }
  };

  // function to change columns after switching b/w main Tabs
  useEffect(() => {
    switch (reducer.filter.mainFilter) {
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
        setColumns(originalColumns);
        return;

      default:
        setColumns([]);
        return;
    }
  }, [reducer.filter.mainFilter]);

  // status change function
  useEffect(() => {
    getLeadsByFilters(reducer.filter);
    wrapperRef?.current?.scrollTo(0, 0);
  }, [reducer.filter]);

  // setting reducer state to default after component gets unmounted
  useEffect(() => {
    return () => {
      dispatch(actions.setDefaultState());
    };
  }, []);

  return (
    <>
      <p className="screenTitle">{reducer.title}</p>
      <div className="leadsScreen">
        {/* MAIN LEAD PAGE */}
        {!reducer.openInner && (
          <div>
            <div className = 'lead-main-filter-header'>
            <Dropdown
             dropdownClass = 'lead-main-drop-down'
             value = {reducer.filter.mainFilter}
             options = {mainTabArr}
             onchange={(item) =>
              dispatch(
                actions.setFilter({
                  ...initialState.filter,
                  mainFilter: item.value,
                })
              )
            }
            />
           <Dropdown
             dropdownClass = 'lead-main-drop-down'
             value = {reducer.filter.subFilter}
             options = {subTabArr}
             onchange={(item) =>
              dispatch(
                actions.setFilter({
                  ...reducer.filter,
                  subFilter: item.value,
                  searchData: "",
                  pageNumber: 1,
                  pageRows: 10,
                  range: null,
                })
              )
            }
            />
            </div>
          

           
            <div className="lead-filter-header">
              <div>
                <Input
                  value={reducer.filter.subMostFilter}
                  element="select"
                  inputClass="leadTable"
                  change={(e) => {
                    dispatch(
                      actions.setFilter({
                        ...reducer.filter,
                        subMostFilter: e.target.value,
                        searchData: "",
                        pageNumber: 1,
                        pageRows: 10,
                      })
                    );
                  }}
                  selectHeading={"Status"}
                  selectArr={subMostFilterArr}
                />
              </div>
              {reducer.filter.mainFilter === "untouched" && (
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
                  placeholder="Search By Name/Email"
                  inputClass="leadsSearch"
                  type="search"
                  value={reducer.filter.searchData}
                  change={(e) => {
                    dispatch(
                      actions.setFilter({
                        ...reducer.filter,
                        searchData: e.target.value,
                        pageNumber: 1,
                        pageSize: 10,
                      })
                    );
                  }}
                />
              </div>

              <div>
                {reducer.filter.range && (
                  <>
                    <p className="dateBlock">
                      {utils.DateObjectToString(reducer.filter.range[0])}
                    </p>
                    <span style={{ color: "#fff" }}>-</span>
                    <p className="dateBlock">
                      {utils.DateObjectToString(reducer.filter.range[1])}
                    </p>
                  </>
                )}
                {reducer.filter.subFilter === "oldLeads" && (
                  <img
                    className = "calendar-icon"
                    alt  ='calendar-icon'
                    src={calendarIcon}
                    onClick={() => setOpenCalendar((open) => !open)}
                  />
                )}
                {reducer.filter.mainFilter === "untouched" && (
                  <button
                    onClick={() => {
                      dispatch(actions.assignLead(null, "bulk"));
                    }}
                    className="btnPrimary"
                  >
                    Assign Leads
                  </button>
                )}
              </div>
            </div>

            <div>
              <p className="count">Total Count: {totalCount}</p>
              <Table
                wrapperRef={wrapperRef}
                search={false}
                pagination={true}
                currentPage={reducer.filter.pageNumber}
                pageSize={reducer.filter.pageRows}
                totalCount={totalCount}
                onPageChange={(pageNumber, pageRows) => {
                  dispatch(
                    actions.setFilter({
                      ...reducer.filter,
                      pageNumber: pageNumber,
                      pageRows: pageRows,
                    })
                  );
                }}
                pageSizeOptions={[5, 10, 15, 20, 50, 100]}
                page
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
                callback={() => {
                  getLeadsByFilters(reducer.filter);
                }}
              />
            )}
            {reducer.openAssignModal && (
              <AssignToModal
                rowObj={{ ...reducer.rowObj }}
                assignType={reducer.assignType}
                assignLeadCallBack={assignLeadCallBack}
                show={reducer.openAssignModal}
                handleDisplay={() => dispatch(actions.closeAssignModal())}
              />
            )}
             <CalendarModal
        show={openCalendar}
        handleDisplay={(e) => setOpenCalendar(e)}
        value={reducer.filter.range}
        onChange={(arr) => {
          setOpenCalendar(false);
          // console.log(arr)
          dispatch(
            actions.setFilter({
              ...reducer.filter,
              range: [...arr],
              pageNumber: 1,
              pageSize: 10,
            })
          );
          // setRange([...arr])
        }}
      />
          </div>
        )}

        {/* LEAD INNER PAGE */}
        {reducer.openInner && <LeadsInner leadObj = {reducer.rowObj} goBack = {()=>dispatch(actions.closeInner())}/>}
      </div>    
    </>
  );
}

export default Leads;
