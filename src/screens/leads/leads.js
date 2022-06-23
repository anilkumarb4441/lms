import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openBooking, closeBooking, setStatus } from "./actions.js";
import { IoIosArrowBack } from "react-icons/io";
import { camelToSentence } from "../../constants";
//css
import "./leads.css";

//assets
import clientProfile from "../../assets/bookings/clientProfile.png";
import locIcon from "../../assets/bookings/location.svg";

//components
import Input from "../../components/Input";
import Table from "../../components/Table";

import AssignChef from "../../components/assignChef/index.js";
import Tabs from "../../components/tabs/tabs.js";

function Leads() {
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.leads);
  // const [openModal, setOpenModal] = useState(false);
  const [mainTabArr, setMainTabArr] = useState([
    { name: "Normal Leads", value: "normalLeads" },
    { name: "Normal Leads", value: "normalLeads" },
  ]);
  const [statusArr, setStatusArr] = useState([
    { name: "All", value: "all" },
    { name: "Cold Lead", value: "hotLead" },
    { name: "Hot Lead", value: "coldLead" },
  ]);

  const [columns, setColumns] = useState([
    {
      Header: "Lead Name",
      accessor: "name",
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
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Client Name",
      accessor: "clientName",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (props) => {
        return (
          <p className={props.cell.row.original.status}>
            {camelToSentence(props.cell.row.original.status)}
          </p>
        );
      },
    },
  ]);

  const [originalData, setOriginalData] = useState([
    {
      leadId: "#58797",
      date: "26 Feb 2022, 11:30am",
      clientName: "Manish Arora",
      location: "HSR Layout, Sec 3, 500102",
      amount: "1700 INR",
      status: "newOrder",
    },
    {
      leadId: "#58796",
      date: "26 Feb 2022, 11:30am",
      clientName: "Manish Arora",
      location: "HSR Layout, Sec 3, 500102",
      amount: "1700 INR",
      status: "onDelivery",
    },
    {
      leadId: "#58796",
      date: "26 Feb 2022, 11:30am",
      clientName: "Manish Arora",
      location: "HSR Layout, Sec 3, 500102",
      amount: "1700 INR",
      status: "newOrder",
    },
    {
      leadId: "#58796",
      date: "26 Feb 2022, 11:30am",
      clientName: "Manish Arora",
      location: "HSR Layout, Sec 3, 500102",
      amount: "1700 INR",
      status: "reschedule",
    },
    {
      leadId: "#58796",
      date: "26 Feb 2022, 11:30am",
      clientName: "Manish Arora",
      location: "HSR Layout, Sec 3, 500102",
      amount: "1700 INR",
      status: "newOrder",
    },
    {
      leadId: "#58796",
      date: "26 Feb 2022, 11:30am",
      clientName: "Manish Arora",
      location: "HSR Layout, Sec 3, 500102",
      amount: "1700 INR",
      status: "newOrder",
    },
  ]);
  const [tableData, setTableData] = useState(originalData);

  const openInner = (rowObj) => {
    dispatch(openBooking(rowObj));
  };

  const [formObj, setFormObj] = useState({
    chefs: [""],
    clientName: "",
    address: "",
    date: "",
    time: "",
    people: "",
    ingredientsList: "",
  });
  const menuArr = [
    "Item 1(Starter)",
    "Item 2(Starter)",
    "Item 3(Main Course)",
    "Item 4(Main Course)",
  ];

  const handleStatus = (status) => {
    if (status === "all") {
      setTableData(originalData);
      return;
    }
    let newArr = originalData.filter((obj) => obj.status === status);
    setTableData(newArr);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formObj);
  };

  useEffect(() => {
    handleStatus(reducer.status);
  }, [reducer.status]);
  return (
    <>
      <p className="screenTitle">{reducer.title}</p>

      <Tabs tabArr={mainTabArr} handleTab={handleMainTab} />
      {
        <div className="bookingsScreen">
          <div className="screenTitleContainer">
            <div>
              {reducer.openInvoice ? (
                <IoIosArrowBack
                  className="goBack"
                  onClick={() => {
                    dispatch(closeBooking());
                  }}
                />
              ) : (
                <div className="btnFlexLead">
                  <button className="normLead">Create Normal Lead</button>
                  <button className="normLead">Bulk Upload</button>
                </div>
              )}
            </div>

            <div>
              {!reducer.openInvoice && (
                <Input
                  value={reducer.status}
                  element="select"
                  inputClass="bTable"
                  change={(e) => {
                    dispatch(setStatus(e.target.value));
                  }}
                  selectHeading={"Status"}
                  selectArr={statusArr}
                />
              )}
              {reducer.openInvoice && (
                <button className="btnPrimary">
                  {camelToSentence(reducer.status)}
                </button>
              )}
            </div>
          </div>
          {!reducer.openInvoice && (
            <div>
              <Table
                search={true}
                columns={columns}
                data={tableData}
                tClass="bTable"
              />
            </div>
          )}
          {reducer.openInvoice && (
            <div className="bookingInner">
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
                    <p>Menu</p>
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
                    <p>Client's FeedBack</p>
                    <div>
                      <img src={clientProfile} alt="clientProfile" />
                      <div>
                        <p>Manish Arora</p>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam nonumy eirmod tempor invidunt ut
                          labore et Lorem ipsum dolor sit amet, consetetur
                          sadipscing elitr, sed diam nonumy eirmod tempor
                          invidunt ut labore et consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="feedBackCard">
                    <p>Chef's FeedBack</p>
                    <div>
                      <img src={clientProfile} alt="clientProfile" />
                      <div>
                        <p>Manish Arora</p>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam nonumy eirmod tempor invidunt ut
                          labore et Lorem ipsum dolor sit amet, consetetur
                          sadipscing elitr, sed diam nonumy eirmod tempor
                          invidunt ut labore et consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </>
  );
}

export default Leads;
