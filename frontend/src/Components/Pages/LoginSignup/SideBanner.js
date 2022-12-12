import React from "react";
import './SideBanner.css';
import banner from "../../../assets/loginPage.svg";

const SideBanner = () => {
  return (
    <div className="sidebanner-container">
      <h1>Let's Chat</h1>
      <img src={banner} alt="" />
    </div>
  );
};

export default SideBanner;
