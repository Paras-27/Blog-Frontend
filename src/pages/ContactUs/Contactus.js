import React from "react";
import { BiMailSend } from "react-icons/bi";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-image">
        <img src="/img/contactus.avif" alt="contactus" />
      </div>
      <div className="contact-details">
        <h1 className="contact-heading">CONTACT US</h1>
        <p className="contact-text">
          We would love to hear from you! If you have any questions, feedback,
          or inquiries about our products and services, please don't hesitate to
          get in touch with us.
        </p>
        <p>
          <BiMailSend />: kingp272003@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Contact;
