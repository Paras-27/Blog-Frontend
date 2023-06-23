import React, { useEffect, useState } from "react";
import "./sidebar.css";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`/categories`);
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className="sideImg" src="/img/prof.png" alt="" />
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
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow us</span>
        <div className="sidebarSocial">
          <FaInstagramSquare className="sidebarIcon" />
          <FaTwitter className="sidebarIcon" />
          <FaLinkedin className="sidebarIcon" />
          <FaFacebook className="sidebarIcon" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;