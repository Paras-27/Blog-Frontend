import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="Header">
      <div className="headerTitles">
        <span className="headerTitleSm"> Gunjan's</span>
        <span className="headerTitleLg"> Blog</span>
      </div>
      <img className="headerImg" src="img/back.jpg" alt="" />
    </div>
  );
};

export default Header;
