import React from "react";
import "./feedCard.css";
import clientProfile from "../../assets/icons/clientProfile.png";
import userPic from "../../assets/userFeed/userPic.png";

//components
import { TiLocation } from "react-icons/ti";

function FeedCard() {
  return (
    <div className="feedCard">
      <div className="feedCardBody">
        <div className="profileHolder">
          <img src={clientProfile} alt="userProfile" />
        </div>
        <div className="contentHolder">
          <p className="userName">Rahul Kumar</p>
          <p className="userContent">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum d
          </p>
        </div>
        <div className="userPicHolder">
          <img src={userPic} alt="uploaded pic" />
        </div>
      </div>
      <div className="feedCardFooter">
        <p>25 Jan</p>
        <div>
          <TiLocation style={{ color: "red" }} />
          <p>Bangalore</p>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
