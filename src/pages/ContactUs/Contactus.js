import React from "react";
import "./Contact.css";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <div className="contact-container">
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="contact-image">
        <img
          src="/img/contactus.avif"
          alt="contactus"
          width={620}
          height={348}
        />
      </div>
      <div className="contact-details">
        <h1 className="contact-heading">CONTACT US</h1>
        <p className="contact-text">
          We would love to hear from you! If you want to make such cool and
          responsive website for your buisness or any other thing than mail me
          at the following email address
        </p>
        <p>
          <img className="svg" src="/svg/email.svg" alt="" /> :
          parasbupadhyay2003@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Contact;
