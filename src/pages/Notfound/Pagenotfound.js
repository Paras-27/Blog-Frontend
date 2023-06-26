import React from "react";
import { Link } from "react-router-dom";
import "./Pagenotfound.css";
import { Helmet } from "react-helmet";

const Pagenotfound = () => {
  return (
    <div className="pnf">
      <Helmet>
        <title>Page Not Found</title>
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <h1 className="pnf-title">404</h1>
      <h2 className="pnf-heading">Oops ! Page Not Found</h2>
      <Link to="/" className="pnf-btn">
        Go Back
      </Link>
    </div>
  );
};

export default Pagenotfound;
