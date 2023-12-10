import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer-section set-bg">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="logo">
              <p className="footer-main-logo" href="/">
                Bhajan Sangeet
              </p>
            </div>
            <div className="footer-social">
              <a
                className="instagram"
                href="https://www.instagram.com/bhajan_sangeet_official/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare className="topIcon" />
              </a>
              <a
                className="twitter"
                href="https://www.twitter.com/_Paras_2003_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="topIcon" />
              </a>
              <a
                className="linkedin"
                href="https://www.linkedin.com/in/paras-upadhyay-/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="topIcon" />
              </a>
              <a
                className="youtube"
                href="https://youtube.com/@bhajan_sangeet27?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="topIcon" />
              </a>
              <a
                className="facebook"
                href="https://www.facebook.com/profile.php?id=100080166353435"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="topIcon" />
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-lg-right">
            <ul className="footer-menu">
              <li>
                <Link className="link" to="/about">
                  About Us
                </Link>
                |
              </li>
              <li>
                <Link className="link" to="/privacy-policy">
                  Privacy-Policy
                </Link>
                |
              </li>
              <li>
                <Link className="link" to="/Contact-Us">
                  Contact Us
                </Link>
              </li>
            </ul>
            <p className="copyright">
              Copyright © 2023 Paras Upadhyay. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
