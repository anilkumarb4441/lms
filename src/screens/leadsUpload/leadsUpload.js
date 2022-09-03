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
  const wrapperRef = useRef(); //Table Wrapper Ref
  const [filterObj, setFilterObj] = useState({
    filter: "todayLeads",
    source: "",
    searchData: "",
    pageRows: 10,
    pageNumber: 1,
    range: null,
  });

  const [tableOption, setTableOption] = useState(false);

  const [tableHeader, setTableHeader] = useState({
    name:true,
    email:true,
    phone:false,
    whatsAppNo:true,
    college:true,
    yearOfPassOut:false,
    year:false,
    department:true,
    technicalProgram:false,
    certifications:false,
    referralCode:true
  
  
  })

  const mainFilterArr = [
    { name: "Today", value: "todayLeads" },
    { name: "Old", value: "oldLeads" },
  ];

  const [sourceArr, setSourceArr] = useState([
    { name: "Facebook", value: "facebook" },
    { name: "Email", value: "email" },
    { name: "RCB", value: "rcb" },  
    { name: "Website", value: "website" },
    { name: "Google", value: "google" },
    { name: "All", value: "all" },
  ]);


  const tableOpt = [
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
      Header: "Whats App No",
      accessor: "whatsAppNo",
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

  document.addEventListener('change', () => {
    const checkedValues = [...document.querySelectorAll('.tcheck')]
      .filter(input => input.checked)
      .map(input => input.value);
      // console.log(checkedValues, 'yyyyyyyyy')
      // debugger;
    // const filteredStores = tableOpt.filter((val) =>{
      // console.log(val, 'vvvvvvvvv')
    //  let sss = val.accessor?.toLowerCase().includes(checkedValues);
    //  console.log(sss, 'ssssssssssss')
    //  return sss;
    // } );
    // console.log(filteredStores, 'ssssssssssssssssssssssss');
  });
  


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

  useEffect(() => {
    if (!filterObj.source) { return; }

    getLeadsByFilters(filterObj);
  }, [filterObj]);

  useEffect(() => {
    // FOR CHANUKYA 62e8ff859bdb428db493cf69
    // FOR SHUBAM   62e8ffb79bdb428db493cf6a
    let source = userId === "630760fd92b9e26cc6572a76" ? "all" : "cgfl";
    if (source === "cgfl") { setSourceArr([]); }
    setFilterObj({ ...filterObj, source: source });

  }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTableHeader(prevState => ({
//         ...prevState,
//         [name]: value
//     }));
// };

  return (
    <>
      <div className="leadsScreen">
        <div>
          <div className="lead-main-filter-header">
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
            </div>

            <div>
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
              {
                userId === '627906f71f94140a082ef297'&& <div className="optionWraper">
                {/* <div className="headerOption" onClick={()=>setTableOption(!tableOption)}>Options</div> */}
                {tableOption&&  
                <div className="optionDropdown">
                <div>
                  <input className="tcheck" type='checkbox' value='name' name="name" />
                  <label>Name</label>
                </div>
                
                <div>
                  <input className="tcheck" type='checkbox'value='email' name='email' />
                  <label>email</label>
                </div>
                <div>
                  <input className="tcheck" type='checkbox' value='phone'  name='phone' />
                  <label>Phone</label>
                </div>
                <div>
                  <input className="tcheck" type='checkbox' value='whatsAppNo' name="whatsAppNo" />
                  <label>whatsAppNo</label>
                </div>
                <div>
                  <input className="tcheck" type='checkbox' value='college' name='college'/>
                  <label>college</label>
                </div>
                <div>
                  <input className="tcheck" type='checkbox' value='yearOfPassOut'name="yearOfPassOut" />
                  <label>yearOfPassOut</label>
                </div>
                <div>
                  <input className="tcheck" type='checkbox' value='year' name="year" />
                  <label>year</label>
                </div>
                <div>
                  <input className="tcheck" type='checkbox' value='department' name="department" />
                  <label>department</label>
                </div>
                <div>
                  <input className="tcheck" type='checkbox'  value='technicalProgram' name='technicalProgram' />
                  <label>technicalProgram</label>
                </div>
                <div>
                  <input className="tcheck" type='checkbox' value='certifications' name='certifications' />
                  <label>certifications</label>
                </div>
                <div>
                  <input className="tcheck" type='checkbox' value='referralCode' name="referralCode" />
                  <label>referralCode</label>
                </div>
              </div>
                //   <div className="optionDropdown">
                //   <div>
                //     <input className="tcheck" type='checkbox' value='name' name="name" />
                //     <label>Name</label>
                //   </div>
                  
                //   <div>
                //     <input className="tcheck" type='checkbox'value='email' name='email' />
                //     <label>email</label>
                //   </div>
                //   <div>
                //     <input className="tcheck" type='checkbox' checked={tableHeader.phone} name='phone' onChange={(e)=>setTableHeader({...tableHeader, phone:!tableHeader.phone})}/>
                //     <label>Phone</label>
                //   </div>
                //   <div>
                //     <input className="tcheck" type='checkbox' checked={tableHeader.whatsAppNo} onChange={(e)=>setTableHeader({...tableHeader, whatsAppNo:!tableHeader.whatsAppNo})}/>
                //     <label>whatsAppNo</label>
                //   </div>
                //   <div>
                //     <input className="tcheck" type='checkbox' checked={tableHeader.college} onChange={(e)=>setTableHeader({...tableHeader, college:!tableHeader.college})}/>
                //     <label>college</label>
                //   </div>
                //   <div>
                //     <input className="tcheck" type='checkbox' checked={tableHeader.yearOfPassOut} onChange={(e)=>setTableHeader({...tableHeader, yearOfPassOut:!tableHeader.yearOfPassOut})}/>
                //     <label>yearOfPassOut</label>
                //   </div>
                //   <div>
                //     <input className="tcheck" type='checkbox' checked={tableHeader.year} onChange={(e)=>setTableHeader({...tableHeader, year:!tableHeader.year})}/>
                //     <label>year</label>
                //   </div>
                //   <div>
                //     <input className="tcheck" type='checkbox' checked={tableHeader.department} onChange={(e)=>setTableHeader({...tableHeader, department:!tableHeader.department})}/>
                //     <label>department</label>
                //   </div>
                //   <div>
                //     <input className="tcheck" type='checkbox' checked={tableHeader.technicalProgram} onChange={(e)=>setTableHeader({...tableHeader, technicalProgram:!tableHeader.technicalProgram})}/>
                //     <label>technicalProgram</label>
                //   </div>
                //   <div>
                //     <input className="tcheck" type='checkbox' checked={tableHeader.certifications} onChange={(e)=>setTableHeader({...tableHeader, certifications:!tableHeader.certifications})}/>
                //     <label>certifications</label>
                //   </div>
                //   <div>
                //     <input className="tcheck" type='checkbox' value={tableHeader.referralCode} onChange={(e)=>setTableHeader({...tableHeader, referralCode:!tableHeader.referralCode})}/>
                //     <label>referralCode</label>
                //   </div>
                // </div>
                }
              </div>
              }

            </div>
          </div>

          <div>
            <p className="count">
              Total Count <span>{totalCount}</span>
            </p>
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
              columns={[...columns]}
              data={tableData}
              tClass="bulkTable"
              usId='627906f71f94140a082ef297'
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
