import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeReviews, openReviews, setFormModal } from "./actions";
import { MONTHS } from "../../constants.js";
//css
import "./services.css";

//assets
import tab1 from "../../assets/services/tab1.svg";
import plusIcon from "../../assets/services/plusIcon.png";
import tempService from "../../assets/services/tempService.png";
import fivestars from "../../assets/icons/fivestars.svg";


//components
import NewService from "../../components/newServiceForm";
import ServiceCard from "../../components/serviceCard";
import { IoIosArrowBack } from "react-icons/io";
import { MdOpenInFull } from "react-icons/md";
import { MdCloseFullscreen } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import ReviewCard from "../../components/serviceReviewCard/serviceReviewCard.js";

function Services() {
  const [serviceForm, setServiceForm] = useState({
    serviceType: { value: "", placeholder: "New Service" },
    serviceImage: { value: "", filepath: "" },
  });

  const [fullScreen, setFullScreen] = useState({
    name: "Full Screen",
    state: "inActive",
  });

  const [barData, setBarData] = useState({
    labels: MONTHS,
    datasets: [
      {
        label: "Customers",
        maxBarThickness: "44",
        data: [120, 150, 50, 100, 200, 230, 100, 80, 134, 200, 50, 100],
        backgroundColor: "#E6AA55",
        hoverBackgroundColor: "#E6AA5580",
        borderWidth: 1,
      },
    ],
  });

  const [ratingData, setRatingData] = useState({
    labels: [5, 4, 3, 2, 1],
    datasets: [
      {
        label: "Ratings",
        maxBarThickness: "34",
        data: [2034, 546, 127, 100, 20],
        backgroundColor: "#E6AA55",
        hoverBackgroundColor: "#E6AA5580",
        borderWidth: 1,
      },
    ],
  });

  const [ratingOptions, setRatingOptions] = useState({
    indexAxis: "y",
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  });
  const dispatch = useDispatch();
  const openReview = useSelector((state) => state.services.openReview);
  const heading = useSelector((state) => state.services.heading);
  const openForm = useSelector((state) => state.services.openServiceForm);
  const toggleTab = (e) => {
    document
      .getElementsByClassName("cusineTab active")[0]
      .classList.remove("active");
    e.currentTarget.classList.add("active");
  };

  const [barOptions, setBarOptions] = useState({
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  });

  const handleFullScreen = (e)=>{
    if(fullScreen.state==='active'){
        setFullScreen({...fullScreen,name:'Full Screen',state:'inActive',})
    }else{
        setFullScreen({...fullScreen,name:'Exit Full Screen',state:'active',})
    }
  }

  useEffect(() => {
    dispatch({ type: "ON_SERVICE_LOAD" });
  }, []);

  return (
    <div className="servicesMainContainer">
      <div className="screenTitleContainer">
        <div>
          {openReview && (
            <IoIosArrowBack
              className="goBack"
              onClick={() => {
                dispatch(closeReviews());
              }}
            />
          )}
          <p className="screenHeadName">{heading}</p>
        </div>

        {!openReview && (
          <div className="btnservesHolder">
            <button
              onClick={() => {
                dispatch(setFormModal(true));
              }}
            >
              <img src={plusIcon} />
              New Occasion
            </button>
            <button>
              <img src={plusIcon} />
              New Cusinies
            </button>
            <button>
              <img src={plusIcon} />
              New Meal Type
            </button>
          </div>
        )}
      </div>
      {!openReview && (
        <div className="cusineTabs">
          <div
            className="cusineTab active"
            onClick={(e) => {
              toggleTab(e);
            }}
          >
            <div>
              <img src={tab1} alt="cusineTabImg" />
              <p>Occasions</p>
            </div>
            <p>7</p>
          </div>
          <div
            className="cusineTab"
            onClick={(e) => {
              toggleTab(e);
            }}
          >
            <div>
              <img src={tab1} alt="cusineTabImg" />
              <p>Cusines</p>
            </div>
            <p>8</p>
          </div>{" "}
          <div
            className="cusineTab"
            onClick={(e) => {
              toggleTab(e);
            }}
          >
            <div>
              <img src={tab1} alt="cusineTabImg" />
              <p>Meal type</p>
            </div>
            <p>9</p>
          </div>
        </div>
      )}{" "}
      {!openReview && (
        <div className="serviceCardContainer">
          <ServiceCard onReviewClick={(str) => dispatch(openReviews(str))} />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      )}
      <NewService
        title="New Service"
        showDisplay={(e) => {
          dispatch(setFormModal(e));
        }}
        showModal={openForm}
        formObj={serviceForm}
        setFormObj={setServiceForm}
      />
      {openReview && (
        <div style ={{position:'relative'}}>
          <div className="reviewsfirstContainer">
            <div className="serviceBarGraphContainer">
              <div className="barHeader">
                <p>Growth</p>
                <select>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <Bar data={barData} options={barOptions} />
            </div>

            <div className="serviceRatingContainer">
              <div>
                <p>4.3</p>
                <img src={fivestars} alt="fivestars" />
              </div>
              <Bar data={ratingData} options={ratingOptions} />
            </div>
          </div>
          <div className={"reviewsSecondContainer " + fullScreen.state}>
            <div className='reviewsSecondContainerHeader'>
              {fullScreen.state === "inActive" ? (
                <MdOpenInFull
                  style={{ color: "var(--white)",cursor:'pointer' }}
                  onClick={() => handleFullScreen()}
                />
              ) : (
                <MdCloseFullscreen
                  style={{ color: "var(--white)",cursor:'pointer' }}
                  onClick={() => handleFullScreen()}
                />
              )}
              <p>{fullScreen.name}</p>
            </div>
            <div>
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
