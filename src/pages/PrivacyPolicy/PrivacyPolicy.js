import React, { useEffect } from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">Privacy Policy</h1>

      <p className="privacy-policy-text">
        Your privacy is important to us. It is our policy to respect your
        privacy regarding any information we may collect from you across our
        website, including the blog application.
      </p>

      <h2 className="privacy-policy-subtitle">Information We Collect</h2>

      <p className="privacy-policy-text">
        We may collect personal information from you, such as your name and
        email address, when you interact with our blog application, such as when
        you subscribe to our newsletter or leave a comment on a blog post.
      </p>

      <h2 className="privacy-policy-subtitle">How We Use Your Information</h2>

      <p className="privacy-policy-text">
        We may use the information we collect from you to:
      </p>

      <ul className="privacy-policy-list">
        <li>Personalize your experience on our blog application</li>
        <li>Send you periodic emails, such as newsletters or updates</li>
        <li>Respond to your comments or inquiries</li>
      </ul>

      <h2 className="privacy-policy-subtitle">Third-Party Services</h2>

      <p className="privacy-policy-text">
        We may use third-party services, such as analytics tools or advertising
        networks, that collect, monitor, and analyze user data to improve the
        functionality and performance of our blog application.
      </p>

      <h2 className="privacy-policy-subtitle">Cookies</h2>

      <p className="privacy-policy-text">
        We may use cookies to enhance your experience on our blog application.
        You can set your browser to refuse all cookies or to indicate when a
        cookie is being sent. However, if you do not accept cookies, you may not
        be able to use some features of our blog application.
      </p>

      <h2 className="privacy-policy-subtitle">Data Security</h2>

      <p className="privacy-policy-text">
        We take reasonable measures to protect the security of your personal
        information and ensure it is not accessed, disclosed, altered, or
        destroyed.
      </p>

      <h2 className="privacy-policy-subtitle">
        Changes to This Privacy Policy
      </h2>

      <p className="privacy-policy-text">
        We may update our privacy policy from time to time. We will notify you
        of any changes by posting the new privacy policy on this page. You are
        advised to review this privacy policy periodically for any changes.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
