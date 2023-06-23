import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">All Right Reserved &copy; Paras Upadhyay</h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|
        <a href="https://youtube.com/@bhajan_sangeet27?sub_confirmation=1">
          You Tube
        </a>
      </p>
    </div>
  );
};

export default Footer;
