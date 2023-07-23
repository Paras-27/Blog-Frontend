import React from "react";
import { Link } from "react-router-dom";
import "./Pagenotfound.css";
import { Helmet } from "react-helmet";

const Pagenotfound = () => {
  return (
    <div className="pnf">
      <Helmet>
        <title>Post Not Found</title>
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <img src={"/img/notfound.jpg"} alt="Not Found" className="pnf-image" />
      <Link to="/" className="pnf-btn">
        Go Back
      </Link>
    </div>
  );
};

export default Pagenotfound;
