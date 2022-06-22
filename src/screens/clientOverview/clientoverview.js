import React, { useState } from "react";
//css
import "./clientoverview.css";

// Components
import Table from "../../components/Table";
import Dots from "../../components/dots/dots"
import OverViewInner from "./overviewInner";



function ClientOverview() {

    const [columns, setColumns] = useState([
        {
          Header: "Client Id",
          accessor: "clientId",
          Cell:(props)=>{
            return <p style = {{textDecoration:'underline',cursor:'pointer'}} className = {props.cell.row.original.clientId} onClick={()=>setSelectedClient(props.cell.row.original.clientId)}>{props.cell.row.original.clientId}</p>
            }
        },
        {
          Header: "Client Name",
          accessor: "clientName",
        },
        {
            Header: "Email Id",
            accessor: "emailID",
        },
        {
          Header: "Location",
          accessor: "location",
        },
        {
          Header: "Total Spent",
          accessor: "totalspent",
        },
        {
          Header: "Last Booking",
          accessor:'lastbooking',
        },
        {
            Header: "Options",
            accessor:'options',
            Cell:(props)=>{
              return (
                <Dots />
                // <Dots chefObj={props.row.original} setFormData={setFormData} formData={formData} setOpenForm={setOpenForm} setChefId={setChefId} chefId={props.cell.row.original.chefId} setParticularChef={setParticularChef} />
              )
            }
        },
      ]);

      const [selectedclient,setSelectedClient]=useState("")
      const [originalData, setOriginalData] = useState([
        {
            clientId: "#58797",
            clientName: "Manish Arora",
            emailID:"manojkumar.o@verzeo.com",
            location: "HSR Layout, Sec 3, 500102",
            totalspent: "1700 INR",
            lastbooking: "12-03-2022",
        },
        {
            clientId: "#58797",
            clientName: "Manish Arora",
            emailID:"manojkumar.o@verzeo.com",
            location: "HSR Layout, Sec 3, 500102",
            totalspent: "1700 INR",
            lastbooking: "12-03-2022",
        },
        {
            clientId: "#58797",
            clientName: "Manish Arora",
            emailID:"manojkumar.o@verzeo.com",
            location: "HSR Layout, Sec 3, 500102",
            totalspent: "1700 INR",
            lastbooking: "12-03-2022",
        },
        {
            clientId: "#58797",
            clientName: "Kandukuri",
            emailID:"manojkumar.o@verzeo.com",
            location: "HSR Layout, Sec 3, 500102",
            totalspent: "1700 INR",
            lastbooking: "12-03-2022",
        },
        {
            clientId: "#58797",
            clientName: "Manish Arora",
            emailID:"manojkumar.o@verzeo.com",
            location: "HSR Layout, Sec 3, 500102",
            totalspent: "1700 INR",
            lastbooking: "12-03-2022",
        },
        {
            clientId: "#58797",
            clientName: "Manish Arora",
            emailID:"manojkumar.o@verzeo.com",
            location: "HSR Layout, Sec 3, 500102",
            totalspent: "1700 INR",
            lastbooking: "12-03-2022",
        },
        {
            clientId: "#58797",
            clientName: "Manish Arora",
            emailID:"manojkumar.o@verzeo.com",
            location: "HSR Layout, Sec 3, 500102",
            totalspent: "1700 INR",
            lastbooking: "12-03-2022",
        },
        {
            clientId: "#58797",
            clientName: "Manish Arora",
            emailID:"manojkumar.o@verzeo.com",
            location: "HSR Layout, Sec 3, 500102",
            totalspent: "1700 INR",
            lastbooking: "12-03-2022",
        },
        {
            clientId: "#58797",
            clientName: "Manish Arora",
            emailID:"manojkumar.o@verzeo.com",
            location: "HSR Layout, Sec 3, 500102",
            totalspent: "1700 INR",
            lastbooking: "12-03-2022",
        },
      ]);

  return (
    <>{selectedclient ? <OverViewInner selectedclient={selectedclient} setSelectedClient={setSelectedClient} /> :
      <div className="clientOverview">
          <div className="clienttopNav">
              <h1>Client Overview</h1>
              <select name="cars" id="cars">
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
                <option value="Yearly">Yearly</option>
              </select>
          </div>
          <div>
            <Table search = {true} columns={columns} data={originalData} tClass="bTable" />
          </div>
      </div>}</>
  );
}

export default ClientOverview;
