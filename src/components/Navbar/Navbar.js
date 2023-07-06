import React, { useContext } from "react";
import "../Navbar/Navbar.css";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Navbar = () => {
  const { user } = useContext(Context);

  return (
    <div className="top">
      <div className="topLeft">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagramSquare className="topIcon" />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="topIcon" />
        </a>
        <a
          href="https://www.linkedin.com/in/paras-upadhyay-/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="topIcon" />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="topIcon" />
        </a>
      </div>
      <div className="topCentre">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/about" className="link">
              ABOUT
            </Link>
          </li>
          {user && user.role === 1 && (
            <li className="topListItem">
              <Link to="/write" className="link">
                WRITE
              </Link>
            </li>
          )}
          <a
            className="topListItem youtube"
            href="https://youtube.com/@bhajan_sangeet27?sub_confirmation=1"
          >
            YOUTUBE
          </a>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to={"/settings"}>
            <img className="topImg" src="/img/user.png" alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <div className="userMain">{user && user.username}</div>
      </div>
    </div>
  );
};

export default Navbar;
