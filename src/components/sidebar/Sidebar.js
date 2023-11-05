import React, { useEffect, useState } from "react";
import "./sidebar.css";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/categories`);
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          className="sideImg"
          src="/img/prof.avif"
          alt=""
          width={248}
          height={250}
        />
        <p className="intro">
          Hello Friends My name is Gunjan, the writer of this bhajan blog. In
          this blog there will be lyrics of almost every bhajan. and you can
          also listen to the tune of the bhajan on our{" "}
          <a
            className="channel"
            href="https://youtube.com/@bhajan_sangeet27?sub_confirmation=1"
          >
            {" "}
            YouTube channel{" "}
          </a>
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORY</span>
        <ul className="sidebarList">
          <li>
            {cats.map((c) => (
              <Link to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))}
          </li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow us</span>
        <div className="sidebarSocial">
          <a
            className="instagram"
            href="https://www.instagram.com/bhajan_sangeet_official/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagramSquare className="topIcon" />
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
      {/* <div
        className="googleAdContainer"
        style={{
          margin: "20px 0px",
        }}
      >
        <SideAd />
      </div> */}
    </div>
  );
};

export default Sidebar;
