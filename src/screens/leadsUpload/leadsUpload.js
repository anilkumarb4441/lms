import React, { useState, useEffect, useRef } from "react";
import { URLS } from "../../utils/urlConstants";
import localStorageService from "../../utils/localStorageService";
import API_SERVICES from "../../utils/API";
import * as utils from "../../utils/constants";

//css
import "../leads/leads.css";
import "./leadsUpload.css";

//assets
import undo from '../../assets/undo.svg'

//components
import Input from "../../components/Input";
import Table from "../../components/Table";
import BulkUpload from "../../components/bulkUpload/bulkupload.js";
import Dropdown from "../../components/dropdown/dropdown.js";
import CustomDateRange from "../../components/dateRangePicker/dateRangePicker";
import AssignToModal from "../../components/assignToModal/assignToModal";
import Tabs from "../../components/tabs/tabs.js";

function LeadsUpload() {
  const { userId } = localStorageService.getTokenDecode();
  const [totalCount, setTotalCount] = useState(0);

  const [openBulk, setOpenBulk] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [openAssign, setOpenAssign] = useState(false);
  const [search, setSearch] = useState("");
  const [showPhoneNu, setShowPhoneNu] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [whatSAppNo, setWhatSAppNo] = useState(false);
  const [targetValue, setTargetValue] = useState('')
  const [assignRevert, setAssignRevert] = useState(false);
  const [counter, setCounter] = useState(0);

  


  const wrapperRef = useRef(); //Table Wrapper Ref
  const [filterObj, setFilterObj] = useState({
    filter: "todayLeads",
    source: "",
    searchData: "",
    pageRows: 100,
    pageNumber: 1,
    range: null,
    assigns:'assigned'
  });

  const [tableOption, setTableOption] = useState(false);
  const [tableHeader, setTableHeader] = useState([])

  const mainFilterArr = [
    { name: "Today", value: "todayLeads" },
    { name: "Old", value: "oldLeads" },
  ];

  const assignFilterArr = [
    { name: "Assigned", value: "assigned" },
    { name: "Unassigned", value: "unAssined" },
  ];

  const [sourceArr, setSourceArr] = useState([
    { name: "Facebook-JobGuarantee", value: "facebookJobGuarantee" },
    { name: "Facebook-Internship", value: "facebookInternsheep" },
    { name: "Facebook-IBM", value: "facebookIBM" },
    { name: "Facebook-CA", value: "facebookCA "},
    { name: "Email", value: "email" },
    { name: "Website-InternShip", value: "websiteInternship" },
    { name: "Website-IBM", value: "websiteIMB" },
    { name: "Website-ProDegree", value: "websiteProDegree" },
    { name: "Website", value: "website" },
    { name: "Google", value: "google" },
    { name: "All", value: "all" },
  ]);

  const tableOpt = [
    {
      Header: "Name",
      accessor: "name",
      
    },
    {
      Header: "Phone",
      accessor: "phone",
      
      Cell:(props)=>{
      console.log(showPhoneNu, '....', targetValue)

        return(
          <p style={{cursor: "pointer"}} onClick={(e)=>{setShowPhoneNu(true); setShowEmail(false); setWhatSAppNo(false); setTargetValue(props.cell.row.original.leadId)}}>{targetValue===props.cell.row.original.leadId && showPhoneNu?props.cell.row.original.phone:'**********'}</p>
        )
      }
    },
    {
      Header: "Email",
      accessor: "email",
      
      Cell:(props)=>{
        
        return(
          <>{props.cell.row.original.email?<p style={{cursor: "pointer"}} onClick={()=>{setShowEmail(true); setShowPhoneNu(false); setWhatSAppNo(false); setTargetValue(props.cell.row.original.leadId)}}>{targetValue===props.cell.row.original.leadId && showEmail?props.cell.row.original.email:'*******.com'}</p>:null}</>
        )
      }
    },
    {
      Header: "College",
      accessor: "college",
      
    },
    {
      Header: "Whats App No",
      accessor: "whatsAppNo",
      Cell:(props)=>{
        return(
          <>{props.cell.row.original.whatsAppNo?
          <p style={{cursor: "pointer"}} 
          onClick={()=>{setShowEmail(false); setWhatSAppNo(true); setShowPhoneNu(false); setTargetValue(props.cell.row.original.leadId)}}>{targetValue===props.cell.row.original.leadId && whatSAppNo?props.cell.row.original.whatsAppNo:'*********'}
          </p>:null}</>
        )
      }
      
    },
    {
      Header: "Year of Pass Out",
      accessor: "yearOfPassOut",
      
    },
    {
      Header: "Year",
      accessor: "year",
      
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
      Header: "Referral Code",
      accessor: "referralCode",
      
    },

  ]
  // const tableTesting = [...tableOpt];


  // const onSelecttableHeader = (i)=>{

  //   tableOpt[i].isChecked = !tableOpt[i].isChecked;
  //   console.log(tableOpt[i],{i});
  //   if(tableOpt[i].isChecked){
  //     tableTesting.splice(i, 0, tableOpt[i])
  //     console.log('of')
  //   }else{
  //     tableTesting.splice(i, 1)
  //     console.log('e')
      
  //   }
  //   setTableOpt([...tableOpt])

  //     // if(e.target.checked==true){
  //     //   setTableHeader([...tableHeader,e.target.value])
  //     // }
  //     // else{
  //     //   let present=tableHeader
  //     //    present = present.filter(item =>item != e.target.value)
  //     //    setTableHeader([...present])
  //     // }
  
  //     console.log(tableTesting.length)
  // }

// console.log(tableOpt, 'tableDatatableData');

// const hello = []

//    tableOpt.map((val)=>{
//     tableHeader.map((item)=>{
//       if(val.accessor === item){
//         hello.push(val)
//       }
//     })
     
//   })


  // console.log(tableHeader, 'tableHeader')

  const [originalColumns, setOriginalColumns] = useState(tableOpt);

  const [columns, setColumns] = useState(originalColumns);
  const [tableData, setTableData] = useState([]);

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
        setTotalCount(res.data.totalCount);
      }
    };
    API_SERVICES.httpPOSTWithToken(
      URLS.getBulkUploadedLeads,
      postObj,
      callback
    );
  };

   // number of leads assign to whom
  // const getLeadsAssignToWhom = (data) => {
  //   setTableLoading(true);
  //   let postObj = data;

  //   // if (data.range) {
  //   //   console.log(data.range[0], data.range[1]);
  //   // }
  //   let callback = (err, res) => {
  //     setTableLoading(false);
  //     if (err) {
  //       // setTableData([]);
  //       // setTotalCount(0);
  //       console.log(err, 'errrrrrrrrrr') 
  //     }
  //     if (res && res.status === 200) {
  //       console.log(res.data, 'getLeadsAssignToWhom')
  //       // setTableData(res.data.data);
  //       // setTotalCount(res.data.totalCount);
  //     }
  //   };
  //   API_SERVICES.httpPOSTWithToken(
  //     URLS.noOfleadsAssignToWhom,
  //     postObj,
  //     callback
  //   );
  // };


  useEffect(() => {
    if (!filterObj.source) { return; }
    getLeadsByFilters(filterObj);
  }, [filterObj]);

  // useEffect(()=>{
  //   getLeadsAssignToWhom(filterObj)
  // },[filterObj]);

  useEffect(() => {
    // FOR CHANUKYA 62e8ff859bdb428db493cf69
    // FOR SHUBAM   62e8ffb79bdb428db493cf6a
    let source = userId === "630760fd92b9e26cc6572a76" ? "all" : "cgfl";
    if (source === "cgfl") { setSourceArr([]); }
    setFilterObj({ ...filterObj, source: source });

  }, []);

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
      <div className="leadsScreen">
        <div>
          <div className="lead-main-filter-header">
            <div className="leadMianFirst">
            <Dropdown
              dropdownClass="lead-main-drop-down"
              value={filterObj.filter}
              options={mainFilterArr}
              onchange={(item) =>
                setFilterObj({
                  ...filterObj,
                  filter: item.value,
                  searchData: "",
                  pageNumber: 1,
                  pageRows: 10,
                  range: null,

                })
              }
            />
           
            {/* <div className="lead-main-filter-header">
                    <Tabs
                      tabArr={assignFilterArr}
                      activeValue={filterObj.assigns}
                      handleTab={(item) => {
                        setFilterObj({
                          ...filterObj,
                          assigns: item.value,
                          searchData: "",
                          pageNumber: 1,
                          pageRows: 10,
                          range: null,
        
                        })
                      }}
                    />
                  </div> */}
            
            {filterObj.filter === "oldLeads" && (
              <CustomDateRange
                range={filterObj.range}
                onChange={(arr) => {
                  setFilterObj({
                    ...filterObj,
                    range: arr ? [...arr] : null,
                    pageNumber: 1,
                    pageRows: 10,
                  });
                }}
              />
            )}
            </div>

             {assignRevert && 
              <div className="assignUndo" onClick={()=>getAssignUndo()}>
                <p>Undo</p>
                <img src={undo} alt="undoImg"/>
                <p>{counter}</p>
              </div>}

          </div>

          <div className="lead-filter-header">
            <div>
              {sourceArr && sourceArr.length > 0 && (
                <Dropdown
                  value={filterObj.source}
                  options={sourceArr}
                  dropdownClass="lead-main-drop-down side-drop-down"
                  onchange={(item) => {
                    setFilterObj({
                      ...filterObj,
                      source: item.value,
                      searchData: "",
                      pageNumber: 1,
                      pageRows: 10,
                    });
                  }}
                />
              )}
              <Input
                placeholder="Search By Name/Email/Phone"
                inputClass="leadsSearch"
                type="search"
                value={filterObj.searchData}
                change={(e) =>
                  setFilterObj({
                    ...filterObj,
                    searchData: e.target.value,
                    pageNumber: 1,
                    pageSize: 10,
                  })
                }
              />
                 <p className="count">
              Total Count : <span>{totalCount}</span>
            </p>
            </div>

            <div>

              <button
                onClick={() => {
                  setOpenBulk(true);
                }}
                className="btnPrimary"
              >
                Bulk Upload
              </button>
              <button
                onClick={() => {
                  setOpenAssign(true);
                }}
                className="btnPrimary"
              >
                Assign Leads
              </button>
              <div className="optionWraper">
                {/* <div className="headerOption" onClick={()=>setTableOption(!tableOption)}>Options</div> */}
                {tableOption&&  
                <div className="optionDropdown">
                  {tableOpt.map((item,i)=>{
                    return(
                      <div>
                    {/* <input className="tcheck"  onChange={(e)=>onSelecttableHeader(i)} type='checkbox' value={item.accessor}  name={item.accessor} checked={item.isChecked} /> */}
                    <label>{item.Header}</label>
                    {/* checked={tableHeader?.includes(item.accessor) ? 'checked' : ''} */}
                </div>
                    )
                  })}
              </div>
               
                }
              </div>

            </div>
          </div>

          <div>
         
            <Table
              wrapperRef={wrapperRef}
              search={false}
              tableLoading={tableLoading}
              pagination={true}
              currentPage={filterObj.pageNumber}
              pageSize={filterObj.pageRows}
              totalCount={totalCount}
              onPageChange={(pageNumber, pageRows) => {
                setFilterObj({
                  ...filterObj,
                  pageNumber: pageNumber,
                  pageRows: pageRows,
                });
              }}
              pageSizeOptions={[5, 10, 15, 20, 50, 100]}
              page
              showColumns={false}
              columns={[...tableOpt]}
              data={tableData}
              tClass="bulkTable"
              columnHide={true}
            />
          </div>

          {openBulk && (
            <BulkUpload
              show={openBulk}
              handleDisplay={() => {
                setOpenBulk(false);
              }}
              callback={() => {
                getLeadsByFilters({ ...filterObj });
              }}
              userId={userId}
            />
          )}

          {openAssign && (
            <AssignToModal
              rowObj={null}
              assignType={"bulk"}
              assignLeadCallBack={() => setOpenAssign(false)}
              show={openAssign}
              setAssignRevert={setAssignRevert}
                onassignUndo={onassignUndo}
                setCounter={setCounter}
              handleDisplay={() => {
                setOpenAssign(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default LeadsUpload;
