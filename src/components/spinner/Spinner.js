import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="circle-spinner-overlay">
      <div className="circle-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Spinner;
