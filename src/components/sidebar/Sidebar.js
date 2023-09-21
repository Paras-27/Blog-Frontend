import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { FaInstagramSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
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
          I am Gunjan, the founder of this bhajan blog. My passion for bhajans
          and spirituality has inspired me to create this platform to share the
          beauty and power of devotional music. Through this blog and{" "}
          <a
            className="channel"
            href="https://youtube.com/@bhajan_sangeet27?sub_confirmation=1"
          >
            {" "}
            YouTube channel{" "}
          </a>
          , I aim to spread the joy and peace that bhajans bring to our lives.
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
            href="https://www.instagram.com/bhajansangeet2611/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagramSquare className="topIcon" />
          </a>
          <a
            href="https://www.twitter.com/_Paras_2003_"
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
