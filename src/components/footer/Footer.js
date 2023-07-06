import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer-container footer">
      <h1 className="text-center">All Right Reserved &copy; Paras Upadhyay</h1>
      <p className="text-center mt-3">
        <Link to="/about">About Us</Link>|
        <Link to="/privacy-policy">Privacy-Policy</Link>|
        <Link to="/Contact-Us">Contact Us</Link>
      </p>
    </div>
  );
};

export default Footer;
