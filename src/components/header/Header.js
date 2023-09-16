import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="Header">
      <div className="headerTitles">
        <span className="headerTitleSm"> Gunjan's</span>
        <span className="headerTitleLg"> Blog</span>
      </div>
      <link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="img/back.avif"
        type="image/avif"
      ></link>
      <img
        className="headerImg"
        src="img/back.avif"
        alt=""
        width={1263}
        height={419}
      />
    </div>
  );
};

export default Header;
