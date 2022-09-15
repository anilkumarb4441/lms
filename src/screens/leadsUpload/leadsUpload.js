import React, { useState, useEffect, useRef } from "react";
import { URLS } from "../../utils/urlConstants";
import localStorageService from "../../utils/localStorageService";
import API_SERVICES from "../../utils/API";
import * as utils from "../../utils/constants";

//css
import "../leads/leads.css";
import "./leadsUpload.css";

//components
import Input from "../../components/Input";
import Table from "../../components/Table";
import BulkUpload from "../../components/bulkUpload/bulkupload.js";
import Dropdown from "../../components/dropdown/dropdown.js";
import CustomDateRange from "../../components/dateRangePicker/dateRangePicker";
import AssignToModal from "../../components/assignToModal/assignToModal";

function LeadsUpload() {
  const { userId } = localStorageService.getTokenDecode();
  const [totalCount, setTotalCount] = useState(0);

  const [openBulk, setOpenBulk] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [openAssign, setOpenAssign] = useState(false);
  const [search, setSearch] = useState("");
  const [showPhoneNu, setShowPhoneNu] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [targetValue, setTargetValue] = useState('')

  


  const wrapperRef = useRef(); //Table Wrapper Ref
  const [filterObj, setFilterObj] = useState({
    filter: "todayLeads",
    source: "",
    searchData: "",
    pageRows: 100,
    pageNumber: 1,
    range: null,
    // source: 'selfGenerated'
  });

  const [tableOption, setTableOption] = useState(false);
  const [tableHeader, setTableHeader] = useState([])
  // const [tableHeader, setTableHeader] = useState({
  //   name:true,
  //   email:true,
  //   phone:false,
  //   whatsAppNo:true,
  //   college:true,
  //   yearOfPassOut:false,
  //   year:false,
  //   department:true,
  //   technicalProgram:false,
  //   certifications:false,
  //   referralCode:true
  // })

  const mainFilterArr = [
    { name: "Today", value: "todayLeads" },
    { name: "Old", value: "oldLeads" },
  ];

  // const generalFilterArr = [
  //   { name: "Self Generated", value: "selfGenerated" },
  //   { name: "CGFL", value: "CGFL" },
  //   { name: "All", value: "All" },
  //   { name: "Compaign Leads", value: "compaignLeads" },
  // ];

  const [sourceArr, setSourceArr] = useState([
    { name: "Facebook", value: "facebook" },
    { name: "Email", value: "email" },
    { name: "RCB", value: "rcb" },
    { name: "Website", value: "website" },
    { name: "Google", value: "google" },
    { name: "All", value: "all" },
  ]);

  const tableOpt = [
    {
      Header: "Name",
      accessor: "name",
      isChecked:true
    },
    {
      Header: "Phone",
      accessor: "phone",
      isChecked:true,
      Cell:(props)=>{
      console.log(showPhoneNu, '....', targetValue)

        return(
          <p style={{cursor: "pointer"}} onClick={(e)=>{setShowPhoneNu(true); setTargetValue(props.cell.row.original.leadId)}}>{targetValue===props.cell.row.original.leadId && showPhoneNu?props.cell.row.original.phone:'**********'}</p>
        )
      }
    },
    {
      Header: "Email",
      accessor: "email",
      isChecked:true,
      Cell:(props)=>{
        return(
          <>{props.cell.row.original.email?<p style={{cursor: "pointer"}} onClick={()=>{setShowEmail(true); setTargetValue(props.cell.row.original.leadId)}}>{targetValue===props.cell.row.original.leadId && showEmail?props.cell.row.original.email:'*******.com'}</p>:null}</>
        )
      }
    },
    {
      Header: "College",
      accessor: "college",
      isChecked:true
    },
    {
      Header: "Whats App No",
      accessor: "whatsAppNo",
      isChecked:true
    },
    {
      Header: "Year of Pass Out",
      accessor: "yearOfPassOut",
      isChecked:true
    },
    {
      Header: "Year",
      accessor: "year",
      isChecked:true
    },
    {
      Header: "Department",
      accessor: "department",
      isChecked:true
    },
    {
      Header: "Technical Program",
      accessor: "technicalProgram",
      isChecked:true
    },
    {
      Header: "Certifications",
      accessor: "certifications",
      isChecked:true
    },
    {
      Header: "Referral Code",
      accessor: "referralCode",
      isChecked:true
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

//   console.log(hello, 'hlllooooooooooo')


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


  return (
    <>
      <div className="leadsScreen">
        <div>
          <div className="lead-main-filter-header">
            {/* <Dropdown
              dropdownClass="lead-main-drop-down"
              value={filterObj.generalFilter}
              options={generalFilterArr}
              onchange={(item) =>
                setFilterObj({
                  ...filterObj,
                  generalFilter: item.value,

                  searchData: "",
                  pageNumber: 1,
                  pageRows: 10,
                  range: null,
                })
              }
            /> */}
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

          <div className="lead-filter-header">
            <div>
              {sourceArr && sourceArr.length > 0 && (
                <Dropdown
                  value={filterObj.source}
                  options={sourceArr}
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
