import React, { useState, useEffect, useRef,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./actions.js";
import * as utils from "../../utils/constants";
import { URLS } from "../../utils/urlConstants";
import { initialState } from "./reducer";
import API_SERVICES from "../../utils/API";
import localStorageService from "../../utils/localStorageService.js";
//css
import "./leads.css";

//components
import Input from "../../components/Input";
import Table from "../../components/Table";
import Dots from "../../components/dots/dots.js";
import AddEditLeadForm from "../../components/addEditLeadForm/addEditLeadForm.js";
import AssignToModal from "../../components/assignToModal/assignToModal.js";
import LeadsInner from "../leadsInner/leadsInner.js";
import Dropdown from "../../components/dropdown/dropdown.js";
import CustomDateRange from "../../components/dateRangePicker/dateRangePicker";
import Tabs from "../../components/tabs/tabs.js";
import BulkUpload from "../../components/bulkUpload/bulkupload.js";


function Leads() {
  const { userId } = localStorageService.getTokenDecode()
  const reducer = useSelector((state) => state.leads);
  const [tableLoading, setTableLoading] = useState(true);
  const [formLoading,setFormLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();
  const wrapperRef = useRef(); //Table Wrapper Ref
  
  const mainFilterArr = [
    { name: "New", value: "new" },
    { name: "Work In Progress ", value: "workInProgress" },
    { name: "Lost Leads", value: "lost" },
    { name: "Paid Leads", value: "paid" },
  ];
  
  const dateFilterArr = [
    { name: "Today", value: "todayLeads" },
    { name: "Old", value: "oldLeads" },
  ];

  const callFilterArr = [
    { name: "All", value: "all" },
    { name: "Attempting", value: "Attempting" },
    { name: "Interested", value: "Interested" },
    { name: "Call Back", value: "Call Back" },
  ];

  const lostFilterArr = [
  { name: "L1", value: "L1" },
  { name: "L2", value: "L2" },]

  const paidFilterArr = [
    { name: "Pre Registration", value: "preRegistration" },
    { name: "Full Payment", value: "fullPayment" },
  ]

  const callStatusArr = [
    { name: "Not Answered", value: "Not Answered" },
    { name: "Switched Off", value: "Switched Off" },
    { name: "Language Barrier", value: "Language Barrier" },
    { name: "Junk Lead", value: "Junk Lead" },
    { name: "Call Back", value: "Call Back" },
    { name: "Wrong Number", value: "Wrong Number" },
    { name: "Interested", value: "Interested" },
    { name: "Cant Afford", value: "Cant Afford" },
    { name: "Not Interested Right Now", value: "Not Interested Right Now" },
    { name: "Taken Up Some Other Course", value: "Taken Up Some Other Course" },
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
      label: "Email*",
      required: true,
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
  ]);

  // call form Data
  const [callFormData, setCallFormData] = useState([
    {
      name: "status",
      value: "",
      required: true,
      label: "Call Status",
      element: "select",
      selectHeading: " Select Call Status",
      selectArr: callStatusArr,
    },
    {
      name: "response",
      value: "",
      required: true,
      label: "Call Response",
      type: "text",
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
      Header: "Call Task",
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
      Header: "Actions",
      accessor: "actions",
      Cell: (props) => {
        return (
          <Dots
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

        return;

      case "Assign To":
        dispatch(actions.assignLead(rowData, "single"));
        return;

      case "Update Call Response":
        if (rowData.callLogs?.status === "Interested") {
          utils.toastWarning(
            "Interested leads call response cannot be updated"
          );
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
    setTableLoading(true);
    let postObj = data;

    if (data.range) {
      console.log(data.range[0], data.range[1]);
    }
    let callback = (err, res) => {
      setTableLoading(false);
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
    setFormLoading(true)
    let leadObject = reducer.formData.reduce((prev, current) => {
      return { ...prev, [current.name]: current.value };
    }, {});
    switch (reducer.formHeading) {
      case "Add Lead":
        createLead({ ...leadObject, source: "self", isCampaign: false });
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
    
    console.log(data, "checking for refrence ids");
    const callback = (err, res) => {
       setFormLoading(false)
      if (res && res.status === 201) {
        getLeadsByFilters(reducer.filter)
        dispatch(actions.closeForm());
        utils.toastSuccess("Lead Succesfully Created");
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.createLead, data, callback);
  };

  //function to edit lead
  const editLead = (data) => {
   
    const callback = (err, res) => {
      setFormLoading(false)
      if (res && res.status === 200) {
        let index = tableData.findIndex(
          (obj) => obj.leadId === res.data.leadId
        );
        let newData = [...tableData];
        newData[index] = { ...res.data };
        setTableData(newData);
        utils.toastSuccess("Lead got updated");
        dispatch(actions.closeForm());
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.editLead, data, callback);
  };

  // function to update call status
  const updateCallStatus = (data) => {
  
    const callback = (err, res) => {
      setFormLoading(false)
      if (res && res.status === 200) {
        if (res.data?.callLogs?.status === "Interested") {
          createLeadBussiness(res.data);
        }
        // let index = tableData.findIndex(
        //   (obj) => obj.leadId === res.data.leadId
        // );
        // let newData = [...tableData];
        // if (reducer.filter.mainFilter === "workInProgress") {
        //   newData[index] = { ...res.data };
        // } else {
        //   newData.splice(index, 1);
        // }
        // setTableData(newData);
        getLeadsByFilters(reducer.filter)
        utils.toastSuccess("Call Status Updated in Lead DashBoard");
        dispatch(actions.closeForm());
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.updateCallLog, data, callback);
  };

  // update call status in customer dashboard if lead is interseted
  const createLeadBussiness = (data) => {
    let { name, email, phone } = data;
    let newData = { name, email, phone };
    newData.leadby = data.currentOwner;
    newData.referenceid = data.referenceId;
    newData.leadid = data.leadId;
    const callback = (err, res) => {
      if (err) {
        utils.toastError(err?.msg);
      }
      if (res && res.status === 200) {
        utils.toastSuccess("Lead updated in Customer DashBoard");
      }
    };
    API_SERVICES.httpPOST(URLS.createLeadBussiness, newData, callback);
  };

 // call back after assigning leads
  const assignLeadCallBack = (err, res) => {
    getLeadsByFilters(reducer.filter);
    dispatch(actions.closeAssignModal());
  };

  // call back after bulk uploading of leads
 const bulkUploadCallBack = ()=>{
    getLeadsByFilters(reducer.filter);
    dispatch(actions.toggleBulkModal());
  }

  // function to change columns after switching b/w main Tabs
  useEffect(() => {  
    switch (reducer.filter.mainFilter) {
      case "paid":
        let newCol1 = originalColumns.filter(
          (obj) => obj.accessor !== "actions"
        );
        setColumns(newCol1);
        return;

      case "workInProgress":
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

      case "new":
        setColumns(originalColumns);
        return;

      default:
        setColumns([]);
        return;
    }
  }, [reducer.filter.mainFilter]);

// function to change columns after switching b/w sub Tabs
  useEffect(()=>{
    let subFilter = reducer.filter.subFilter
    if(subFilter!=="L2" && subFilter!=="L1") return
    if(subFilter==="L1"){
          let newCol4 = originalColumns.filter(
            (obj) => obj.accessor !== "actions"
          );
          setColumns(newCol4);
         
        }else if(subFilter==="L2"){
          setColumns(originalColumns);
        }
  },[reducer.filter.subFilter])

  // debounce function when we are searching for data in the table using search bar
  const debounceGetLeads = useCallback(utils.debounce((filter)=>{
    getLeadsByFilters(filter);
  },1000),[])
  
  

  // status change function
  useEffect(() => {
    wrapperRef?.current?.scrollTo(0, 0);
    if(reducer.filter.searchData){
      debounceGetLeads(reducer.filter);
      return
    }
    getLeadsByFilters(reducer.filter);
   
  }, [reducer.filter]);

  // setting reducer state to default after component gets unmounted
  useEffect(() => {
    return () => {
      dispatch(actions.setDefaultState());
    };
  }, []);

  return (
    <>
      {reducer.title && <p className="screenTitle">{reducer.title}</p>}
      <div className="leadsScreen">
        {/* MAIN LEAD PAGE */}
        {!reducer.openInner && (
          <div>
            <div className="lead-main-filter-header">
              <Tabs
              tabsClass = "leads-main-tab"
              activeValue = {reducer.filter.mainFilter}
              tabArr = {mainFilterArr}
              handleTab = {(item) =>
                dispatch(
                  actions.setMainFilter({
                    ...initialState.filter,
                    mainFilter: item.value,
                    searchData: "",
                    pageNumber: 1,
                    pageRows: 10,
                    range: null,
                  })
                )
              }
              />
            
              <Dropdown
                dropdownClass="lead-main-drop-down side-drop-down"
                value={reducer.filter.dateFilter}
                options={dateFilterArr}
                onchange={(item) =>
                  dispatch(
                    actions.setFilter({
                      ...reducer.filter,
                      dateFilter: item.value,
                      searchData: "",
                      pageNumber: 1,
                      pageRows: 10,
                      range: null,
                    })
                  )
                }
              />
            </div>

            {reducer.filter.mainFilter === "paid" && (
              <div className="lead-main-filter-header">
                <Tabs
                tabArr = {paidFilterArr}
                activeValue = {reducer.filter.subFilter}
                handleTab = {(item) => {
                  dispatch(
                    actions.setFilter({
                      ...reducer.filter,
                      subFilter: item.value,
                      searchData: "",
                      pageNumber: 1,
                      pageRows: 10,
                      range: null,
                    })
                  );
                }}
                />
               
              </div>
            )}

            {reducer.filter.mainFilter === "lost" && (
              <div className="lead-main-filter-header">
                <Tabs
                tabArr ={lostFilterArr}
                activeValue = {reducer.filter.subFilter}
                handleTab = {(item) => {
                  dispatch(
                    actions.setFilter({
                      ...reducer.filter,
                      subFilter: item.value,
                      searchData: "",
                      pageNumber: 1,
                      pageRows: 10,
                      range: null,
                    })
                  );
                }}
                />
              
              </div>
            )}

             {reducer.filter.mainFilter === "workInProgress" && (
              <div className="lead-main-filter-header">
                <Tabs
                tabArr ={callFilterArr}
                activeValue = {reducer.filter.subFilter}
                handleTab = {(item) => {
                  dispatch(
                    actions.setFilter({
                      ...reducer.filter,
                      subFilter: item.value,
                      searchData: "",
                      pageNumber: 1,
                      pageRows: 10,
                      range: null,
                    })
                  );
                }}
                />
              
              </div>
            )}

            <div className="lead-filter-header">
              <div>
                <Input
                  placeholder="Search By Name/Email/Phone"
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
                {reducer.filter.dateFilter === "oldLeads" && (
                  <CustomDateRange
                    range={reducer.filter.range}
                    onChange={(arr) => {
                      dispatch(
                        actions.setFilter({
                          ...reducer.filter,
                          range: arr ? [...arr] : null,
                          pageNumber: 1,
                          pageRows: 10,
                        })
                      );
                    }}
                  />
                )}

                <button
                  className="btnPrimary"
                  onClick={() => {
                    dispatch(actions.addLead(formData));
                  }}
                >
                  Add Lead
                </button>
                <button
                  className="btnPrimary"
                  onClick={() => {
                    dispatch(actions.toggleBulkModal());
                  }}
                >
                  Bulk Upload
                </button>
                <button
                  onClick={() => {
                    dispatch(actions.assignLead(null, "bulk"));
                  }}
                  className="btnPrimary"
                >
                  Assign Leads
                </button>
              </div>
            </div>

            <div>
              <p className="count">
                Total Count <span>{totalCount}</span>
              </p>
              <Table
                wrapperRef={wrapperRef}
                search={false}
                pagination={true}
                tableLoading={tableLoading}
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
                loading = {formLoading}
                handleInputChange={(e, i) =>
                  dispatch(actions.changeInput(e, i, [...reducer.formData]))
                }
                formData={[...reducer.formData]}
                handleDisplay={() => dispatch(actions.closeForm())}
                heading={reducer.formHeading}
                submitForm={submitForm}
              />
            )}

            {reducer.openAssignModal && (
              <AssignToModal
              assignLeadCallBack = {assignLeadCallBack}
                rowObj={{ ...reducer.rowObj }}
                assignType={reducer.assignType}
                show={reducer.openAssignModal}
                handleDisplay={() => dispatch(actions.closeAssignModal())}
              />
            )}
          </div>
        )}

        {/* LEAD INNER PAGE */}
        {reducer.openInner && (
          <LeadsInner
            leadObj={reducer.rowObj}
            goBack={() => dispatch(actions.closeInner())}
          />
        )}
        {reducer.showBulkModal &&<BulkUpload
          show = {reducer.showBulkModal}  
          handleDisplay={() =>  dispatch(actions.toggleBulkModal())}
          callback = {bulkUploadCallBack}
          userId = {userId}
        />}
      </div>
    </>
  );
}

export default Leads;
