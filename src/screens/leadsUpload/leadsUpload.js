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

  var headerLabels = {
    name:true,
    id:true,
    email:true,
    phone:false,
    level:true,
    status:false,
  }
  const [tableHeader, setTableHeader] = useState(headerLabels)
// console.log(tableHeader.name, 'ddddddddd')

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



  const [originalColumns, setOriginalColumns] = useState([
    {
      Header: "Lead Id",
      accessor: "leadId",
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
  ]);

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

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setState(prevState => ({
  //       ...prevState,
  //       [name]: value
  //   }));
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
              {/* {
                userId === '627906f71f94140a082ef297'&& <div className="optionWraper">
                <div className="headerOption" onClick={()=>setTableOption(!tableOption)}>Options</div>
                {tableOption&&  
                  <div className="optionDropdown">{tableHeader.name&& 'ddddddddd'}
                  <div>
                    <input type='checkbox' name="name" checked={tableHeader.name}/>
                    <label>Name</label>
                  </div>
                  <div>
                    <input type='checkbox' />
                    <label>email</label>
                  </div>
                  <div>
                    <input type='checkbox' />
                    <label>id</label>
                  </div>
                </div>
                }
              </div>
              } */}

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
