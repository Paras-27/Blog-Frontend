import React, { useContext, useEffect, useState } from "react";
import "../Navbar/Navbar.css";
import {
  FaInstagramSquare,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import SearchInput from "../search/SearchInput";

const Navbar = () => {
  const { user } = useContext(Context);
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/categories`);
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="header-section">
      <div className="header-top">
        <div className="header-social">
          <a
            className="instagram"
            href="https://www.instagram.com/bhajansangeet2611/"
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
        <div className="user-panel">
          {user ? (
            <div className="userlogo">
              <Link className="user-name-div link" to={"/settings"}>
                <img className="topImg" src="/img/user.webp" alt="" />
                <p className="user-name">{user.username}</p>
              </Link>
            </div>
          ) : (
            <ul className="topList">
              <li className="login-register">
                <Link to="/register" className="link">
                  Register /
                </Link>
              </li>
              <li className="login-register">
                <Link to="/login" className="link">
                  Login
                </Link>
              </li>
            </ul>
          )}
          {/* <div className="userMain">{user && user.username}</div> */}
        </div>
      </div>
      <div className="header-bottom">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className="logo">
              <p className="navbar-brand main-logo" href="/">
                Gunjan's Blog
              </p>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu-item spacing">
                <li className="nav-item spacing">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item spacing">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                {user && user.role === 1 && (
                  <li className="nav-item spacing">
                    <Link to="/write" className="nav-link">
                      Write
                    </Link>
                  </li>
                )}
                <li className="nav-item spacing dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    {cats.map((c) => (
                      <li>
                        <Link
                          to={`/?cat=${c.name}`}
                          className="link dropdown-item spacing nav-link"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item spacing">
                  <a
                    className="nav-link"
                    href="https://youtube.com/@bhajan_sangeet27?sub_confirmation=1"
                  >
                    Youtube
                  </a>
                </li>
              </ul>
              <SearchInput />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
