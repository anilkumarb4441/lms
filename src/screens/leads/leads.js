import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./actions.js";
import * as utils from "../../utils/constants";
import { URLS } from "../../utils/urlConstants";
import { initialState } from "./reducer";
import API_SERVICES from "../../utils/API";
import localStorageService from "../../utils/localStorageService.js";
//css
import "./leads.css";

//assets
import undo from '../../assets/undo.svg'

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
  const { userId } = localStorageService.getTokenDecode();
  const reducer = useSelector((state) => state.leads);
  const [tableLoading, setTableLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showPhoneNu, setShowPhoneNu] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [whatsAppNo, setwhatsAppNo] = useState(false);
  const [targetValue, setTargetValue] = useState('');
  const [assignRevert, setAssignRevert] = useState(false);
  const [counter, setCounter] = useState(0);
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

  const assignFilterArr = [
    { name: "Assigned", value: "assigned" },
    { name: "Unassigned", value: "unAssined" },
  ];

  const generalFilterArr = [
    { name: "All", value: "all" },
    { name: "Self Generated", value: "self" },
    { name: "CGFL", value: "cgfl" },
    { name: "Facebook-JobGuarantee", value: "facebookJobGuarantee" },
    { name: "Facebook-Internship", value: "facebookInternsheep" },
    { name: "Facebook-IBM", value: "facebookIBM" },
    { name: "Facebook-CA", value: "facebookCA "},
    { name: "Email", value: "email" },
    { name: "Website-InternShip", value: "websiteInternship" },
    { name: "Website-IBM", value: "websiteIMB" },
    { name: "Website-ProDegree", value: "websiteProDegree" },
    { name: "Google", value: "google" },
  ];

  const callFilterArr = [
    { name: "All", value: "all" },
    { name: "Attempting", value: "Attempting" },
    { name: "Interested", value: "Interested" },
    { name: "Call Back", value: "Call Back" },
  ];

  const lostFilterArr = [
    { name: "L1", value: "L1" },
    { name: "L2", value: "L2" },
  ];

  const paidFilterArr = [
    { name: "Pre Registration", value: "preRegistration" },
    { name: "Full Payment", value: "fullPayment" },
  ];

  const preRegCallStatusArr = [
    { name: "Call Back", value: "Call Back" },
    { name: "Cant Afford", value: "Cant Afford" },
    { name: "Not Answered", value: "Not Answered" },
    { name: "Switched Off", value: "Switched Off" },
    { name: "Not Interested Right Now", value: "Not Interested Right Now" },
  ];

  const originalCallStatusArr = [
    ...preRegCallStatusArr,
    { name: "Language Barrier", value: "Language Barrier" },
    { name: "Junk Lead", value: "Junk Lead" },
    { name: "Wrong Number", value: "Wrong Number" },
    { name: "Interested", value: "Interested" },
    { name: "Taken Up Some Other Course", value: "Taken Up Some Other Course" },
  ];


  // lead details form Data
  const [formData, setFormData] = useState([
    {
      name: "name",
      value: "",
      type: "text",
      label: "Lead Name",
      required: false,
    },
    {
      name: "phone",
      value: "",
      type: "phone",
      label: "Mobile No*",
      pattern: "([0]|+91)?[789]d{9}",
      required: true,
    },

    {
      name: "whatsAppNo",
      value: "",
      type: "phone",
      label: "WhatsApp No",
      required: false,
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
      name: "year",
      value: "",
      placeholder: "2nd year",
      type: "text",
      label: "Current Year",
      required: false,
    },
  ]);

  // call form Data
  const [callFormData, setCallFormData] = useState([
    {
      _index: 0,
      name: "status",
      value: "",
      required: true,
      label: "Call Status",
      element: "select",
      selectHeading: " Select Call Status",
      selectArr: originalCallStatusArr,
    },
    {
      _index: 1,
      name: "response",
      value: "",
      required: true,
      label: "Call Response",
      type: "text",
    },
    // {
    //   _index:2,
    //   name: "isCampusAmbassador",
    //   value: false,
    //   required: false,
    //   label: "Campus Ambassador",
    //   type: "checkbox",
    // },
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

  const  setPhone=(props)=>{
    setShowPhoneNu(true); 
    setShowEmail(false)
    setwhatsAppNo(false);
    setTargetValue(props.cell.row.original.leadId)
   
  }

  const  onShowEmail=(props)=>{
    setShowEmail(true); 
    setShowPhoneNu(false)
    setwhatsAppNo(false);
    setTargetValue(props.cell.row.original.leadId)
    
  }

  const onShowWatsApp = (props)=>{
    setwhatsAppNo(true);
    setShowEmail(false); 
    setShowPhoneNu(false)
    setTargetValue(props.cell.row.original.leadId)

  }

  const originalColumns =[
  
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
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Phone",
      accessor: "phone",
      Cell:(props)=>{ 
        return(
          <p style={{cursor: "pointer"}} onClick={(e)=>setPhone(props)}>
            {
            targetValue===props.cell.row.original.leadId && showPhoneNu?props.cell.row.original.phone:'**********'}
            </p>
        )
      }
    },
    {
      Header: "Department",
      accessor: "department",
    },
    {
      Header: "Technical Program",
      accessor: "technicalProgram",
    },
    {
      Header: "Certifications",
      accessor: "certifications",
    },

    {
      Header: "Email",
      accessor: "email",
      Cell:(props)=>{
        return(
          <>{props.cell.row.original.email?<p style={{cursor: "pointer"}} onClick={()=>onShowEmail(props)}>{targetValue===props.cell.row.original.leadId && showEmail?props.cell.row.original.email:'*******.com'}</p>:null}</>
        )
      }
    },
    
    {
      Header: "College",
      accessor: "college",
    },
    {
      Header: "Year of Pass Out",
      accessor: "yearOfPassOut",
    },
    {
      Header: "Whats App No",
      accessor: "whatsAppNo",
      Cell:(props)=>{
        return(
          <>{props.cell.row.original.whatsAppNo?<p style={{cursor: "pointer"}} onClick={()=>onShowWatsApp(props)}>{targetValue===props.cell.row.original.leadId && whatsAppNo?props.cell.row.original.whatsAppNo:'**********'}</p>:null}</>
        )
      }
    },
    {
      Header: "Current Year",
      accessor: "year",
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
      Header: "Referral Code",
      accessor: "referralCode",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (props) => {
        return (
         <>
         {reducer.filter.mainFilter ==='workInProgress'?  
           <Dots
                options={openactionOptions}
                onclick={(name) => handleAction(name, props.cell.row.original)}
              /> 
              :reducer.filter.mainFilter==='new'|| reducer.filter.subFilter==='L2'|| reducer.filter.subFilter==='preRegistration'?
            <Dots
            options={actionOptions}
            onclick={(name) => handleAction(name, props.cell.row.original)}
             />
            :reducer.filter.mainFilter ==='lost' && reducer.filter.mainFilter === 'paid'?null:reducer.filter.subFilter==='L1'|| reducer.filter.subFilter==='fullPayment'?null:null}  
         </>
        );
      },
    },
  ];
  // const [columns, setColumns] = useState([]);


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

        let callStatusInput = callFormData.find((el) => el.name === "status");
        let newCallFormData = callFormData.filter((el) => el.name !== "status");

        if (rowData.category === "preRegistration") {
          newCallFormData = [...newCallFormData, { ...callStatusInput, selectArr: [...preRegCallStatusArr, { name: "Others", value: "Others" }] }]
        }
        else {
          newCallFormData = [...newCallFormData, { ...callStatusInput, selectArr: originalCallStatusArr }]
        }

        newCallFormData.sort((a, b) => a._index - b._index);

        dispatch(actions.updateCallResponse(rowData, newCallFormData));
        return;
    }
  };

  const openInner = (rowObj) => {
    dispatch(actions.openInner(rowObj));
  };

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
    setFormLoading(true);
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

    const callback = (err, res) => {
      setFormLoading(false);
      if (res && res.status === 201) {
        getLeadsByFilters(reducer.filter);
        dispatch(actions.closeForm());
        utils.toastSuccess("Lead Succesfully Created");
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.createLead, data, callback);
  };

  //function to edit lead
  const editLead = (data) => {
    const callback = (err, res) => {
      setFormLoading(false);
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

    data =
      reducer.filter.subFilter === "preRegistration"
        ? { ...data, isPreg: true }
        : data;
    const callback = (err, res) => {

      setFormLoading(false);
      if (res && res.status === 200) {
        if (res.data?.callLogs?.status === "Interested") {
          createLeadBussiness(res.data);
        }
        getLeadsByFilters(reducer.filter);
        utils.toastSuccess("Call Status Updated in Lead DashBoard");
        dispatch(actions.closeForm());

      }

      if (err) {
        utils.toastError(err?.response.data);
      }

    };
    API_SERVICES.httpPOSTWithToken(URLS.updateCallLog, data, callback);
  };

  // update call status in customer dashboard if lead is interseted
  const createLeadBussiness = (data) => {
    let { name, email, phone } = data;
    // che king
    let newData = { name, email, phone };
    newData.leadby = data.currentOwner;
    newData.referenceid = data.referenceId;
    newData.leadid = data.leadId;
    const callback = (err, res) => {

      if (err) {
        utils.toastError(err?.response.data.msg);
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
  const bulkUploadCallBack = () => {
    getLeadsByFilters(reducer.filter);
    dispatch(actions.toggleBulkModal());
  };

  // assign leads undo api
  const getAssignUndo = () => {
    setAssignRevert(false);
    const callback = (err, res) => {
      
      if (err) {
          utils.toastError(err);
          return;
       }
      if (res.data=='SUCCESS' && res.status === 200) {
        utils.toastSuccess("Assigned leads undo successfully");
        return;
      }
      if(res.data=='FAILED' && res.status === 200)
    return  utils.toastError("assign undo failed", res.data);

      // }

    };
    API_SERVICES.httpGETWithToken(URLS.undoAssignedLeads, callback);
  };

  // function to change columns after switching b/w main Tabs
  // useEffect(() => {
       
  //   switch (reducer.filter.mainFilter) {
  //     case "workInProgress":
  //       let newCol2 = originalColumns.filter(
  //         (obj) => obj.accessor !== "actions"
  //       );
  //       let actionCol2 = {
  //         Header: "Actions",
  //         accessor: "actions",
  //         Cell: (props) => {
  //           return (
  //             <Dots
  //               options={openactionOptions}
  //               onclick={(name) => handleAction(name, props.cell.row.original)}
  //             />
  //           );
  //         },
  //       };
  //       newCol2 = [...newCol2, actionCol2];
  //       setColumns(newCol2);
  //       return;

  //     case "lost":
  //       return;

  //     case "paid":
  //       return;

  //     default:
  //       setColumns(originalColumns);
  //       return;
  //   }
  // }, [reducer.filter.mainFilter, reducer.filter.range,]);

  // function to change columns and call Status DropDown when main filter is paid/lost  after switching b/w sub Tabs
  // useEffect(() => {

  //   let subFilter = reducer.filter.subFilter;
  //   let nonActionCol = originalColumns.filter(
  //     (obj) => obj.accessor !== "actions"
  //   );

  //   if (subFilter === "L1" || subFilter === "fullPayment") {
  //     setColumns(nonActionCol);
  //   }

  //   if (subFilter === "L2" || subFilter === "preRegistration") {

  //     setColumns(originalColumns);
  //   }
  // }, [reducer.filter.subFilter]);

  // debounce function when we are searching for data in the table using search bar
  const debounceGetLeads = useCallback(
    utils.debounce((filter) => {
      getLeadsByFilters(filter);
    }, 1000),
    []
  );

  // calling Leads Filter API when any filter value is changing
  useMemo(() => {
    wrapperRef?.current?.scrollTo(0, 0);
    if (reducer.filter.searchData) {
      debounceGetLeads(reducer.filter);
      return;
    }
    getLeadsByFilters(reducer.filter);
  }, [
    reducer.filter.mainFilter,
    reducer.filter.subFilter,
    reducer.filter.pageRows,
    reducer.filter.pageNumber,
    reducer.filter.range,
    reducer.filter.searchData,
    reducer.filter.dateFilter,
    reducer.filter.source,
    reducer.filter.assigns,
  ]);

  // setting reducer state to default after component gets unmounted
  useEffect(() => {
    return () => {
      dispatch(actions.setDefaultState());
    };
  }, []);


  const onassignUndo = (e)=>{
    setTimeout(() => {
      setAssignRevert(false);
    }, 15000)
  }

useEffect(() => {
  if (counter > 0) {
    setTimeout(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
  }
}, [counter]);

  return (
    <>
      {/* {reducer.title && <p className="screenTitle">{reducer.title}</p>}Leads */}
      <h3 className="screenTitl">Leads</h3>
      <div className="leadsScreen">
        {/* MAIN LEAD PAGE */}
        {!reducer.openInner && (
          <div>
            <div className="lead-main-filter-header">
              <Tabs
                tabsClass="leads-main-tab"
                activeValue={reducer.filter.mainFilter}
                tabArr={mainFilterArr}
                handleTab={(item) =>
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
              {assignRevert && 
              <div className="assignUndo" onClick={()=>getAssignUndo()}>
                <p>Undo</p>
                <img src={undo} alt="undoImg"/>
                <p>{counter}</p>
              </div>}
              <div className="horizontalBaseLine"></div>
            </div>
            <div className="filterContainer">
              <div className="filtersWraper">
                <Dropdown
                  dropdownClass="lead-main-drop-down"
                  value={reducer.filter.source}
                  options={generalFilterArr}
                  onchange={(item) =>
                    dispatch(
                      actions.setFilter({
                        ...reducer.filter,
                        source: item.value,
                        searchData: "",
                        pageNumber: 1,
                        pageRows: 10,
                        range: null,
                      })
                    )
                  }
                />
                {reducer.filter.mainFilter === "paid" && (
                  <div className="lead-main-filter-header">
                    <Tabs
                      tabArr={paidFilterArr}
                      activeValue={reducer.filter.subFilter}
                      handleTab={(item) => {
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
                {/* {reducer.filter.mainFilter === "new" && (
                  <div className="lead-main-filter-header">
                    <Tabs
                      tabArr={assignFilterArr}
                      activeValue={reducer.filter.assigns}
                      handleTab={(item) => {
                        dispatch(
                          actions.setFilter({
                            ...reducer.filter,
                            assigns: item.value,
                            searchData: "",
                            pageNumber: 1,
                            pageRows: 10,
                            range: null,
                          })
                        );
                      }}
                    />
                  </div>
                )} */}
                {reducer.filter.mainFilter === "lost" && (
                  <div className="lead-main-filter-header">
                    <Tabs
                      tabArr={lostFilterArr}
                      activeValue={reducer.filter.subFilter}
                      handleTab={(item) => {
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
                      tabArr={callFilterArr}
                      activeValue={reducer.filter.subFilter}
                      handleTab={(item) => {
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
              </div>
              <div>
                <button
                  className="leadbtnPrimary"
                  onClick={() => {
                    dispatch(actions.addLead(formData));
                  }}
                >
                  Add Lead
                </button>
                <button
                  className="leadbtnPrimary"
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
                  className="leadbtnPrimary"
                >
                  Assign Leads
                </button>
              </div>
            </div>
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
                <p className="countlead">
                  Total Count : <span>{totalCount}</span>
                </p>
              </div>


            </div>

            <div>
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
                columns={[...originalColumns]}
                data={tableData}
                tClass="leadTable actionsTable"
                columnHide={true}
              />
            </div>

            {reducer.openForm && (
              <AddEditLeadForm
                show={reducer.openForm}
                loading={formLoading}
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
                assignLeadCallBack={assignLeadCallBack}
                rowObj={{ ...reducer.rowObj }}
                assignType={reducer.assignType}
                show={reducer.openAssignModal}
                handleDisplay={() => dispatch(actions.closeAssignModal())}
                setAssignRevert={setAssignRevert}
                onassignUndo={onassignUndo}
                setCounter={setCounter}
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
        {reducer.showBulkModal && (
          <BulkUpload
            show={reducer.showBulkModal}
            handleDisplay={() => dispatch(actions.toggleBulkModal())}
            callback={bulkUploadCallBack}
            userId={userId}
          />
        )}
      </div>
    </>
  );
}

export default Leads;
