import React, { useState, useEffect } from "react";

import Table from "../../components/Table";
import "./index.css";
import API_SERVICES from "../../utils/API"
import { URLS } from "../../utils/urlConstants"
import {useSelector,useDispatch} from "react-redux"
import * as actions from "./actions.js"
// Components
import ParticularTeamMember from "./ParticularTeamMember"
import Input from "../../components/Input";
import { IoPersonCircleSharp } from "react-icons/io"


function Myteam() {

  // Particular Team Member  State

  const [openInner, setOpenInner] = useState(false);
  const [user, setUser] = useState();
  const [filterQuery, setFilterQuery] = useState({ pageNumber: 1, pageRows: 5, search: '' })
  const [totalCount, setTotalCount] = useState(0)
  const [memberAnalytics, setMemberAnalytics] = useState([])


  const dispatch = useDispatch()
  const teamreducers = useSelector(state=>state.myTeam)

  let usImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2aSUcU-KC_ZGl1KIFES1pwRe4YOMv2gPx_g&usqp=CAU"

  const [tableData, setTableData] = useState([]);
  const [memberTableData, setMemberTableData] = useState([])
  const [columns, setColumns] = useState([
    {
      Header: "name", 
      accessor: "name",
      Cell: (props) => {
        return <div style={{ display: "flex", alignItems: "center", gap: "10px" }} >
          <img src={usImg} style={{ width: "30px", height: "30px", borderRadius: '50%' }} />
          <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={(e) => { setOpenInner(true); dispatch(actions.getTeamMember(props.cell.row.original)); setUser(props.cell.row.original); }}>{props.cell.row.original.name}</p>
        </div>
      }
    },
    {
      Header: "email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: 'phone'
    },
    {
      Header: "Level",
      accessor: 'level'
    },
  ]);

  useEffect(() => {
    getMyTeamData()
  }, [filterQuery]);


  function getMyTeamData() {
    const callback = (err, res) => {
      if (err) {
        setTableData([]);
        setTotalCount(0);
        return
      }

      if (res && res.status === 200) {
        if (res.data[0]?.directMembers) {
          setTableData(res.data[0].directMembers)
          setTotalCount(20)
        } else {
          setTableData([]);
          setTotalCount(0);
        }
      }
    }
    API_SERVICES.httpPOSTWithToken(URLS.myteammembers, { ...filterQuery, userId: '' }, callback)
  }




  useEffect(() => {
    setMemberAnalytics(memberAnalytics);
  }, [])
  return (
    <>
      {
        openInner ? <ParticularTeamMember
          perticularTMember={{...user}}
          setParticularChef={setOpenInner}
          tableData={memberTableData}
          filterQuery={filterQuery}
          totalCount={totalCount}
          setFilterQuery={setFilterQuery}
          setTotalCount={setTotalCount}
          memberAnalytics={memberAnalytics} /> :

          <div className='chefOverviewScreen'>
            <div>
              <div className="myTeam-search-wraper">
                <Input inputClass='leadsSearch' type="search" placeholder="Search By Name/Email/phone" name="search" change={(e) => setFilterQuery({ ...filterQuery, pageNumber: 1, search: e.target.value })} value={filterQuery.search} />
              </div>
              <Table
                pagination={true}
                currentPage={filterQuery.pageNumber}
                pageSize={filterQuery.pageRows}
                totalCount={totalCount} columns={columns}
                onPageChange={(pageNumber, pageRows) => {
                  setFilterQuery({ ...filterQuery, pageNumber: pageNumber, pageRows: pageRows, search: '' })
                }}
                data={tableData} tClass="myteam"
              />
            </div>
          </div>

      }

    </>
  );
}

export default Myteam;
