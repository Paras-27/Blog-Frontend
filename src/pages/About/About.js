import React, { useEffect } from "react";
import "./About.css";
import { Helmet } from "react-helmet";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about">
      <Helmet>
        <title>About Us</title>
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <h1>About Us</h1>
      <p>Welcome to Gunjan's Bhajan Blog!</p>
      <img
        className="sideImg"
        src="/img/prof.avif"
        alt=""
        width={248}
        height={250}
      />
      <p>
        This blog is dedicated to sharing the lyrics of bhajans, devotional
        songs, and spiritual music. We aim to provide a collection of meaningful
        and soul-stirring bhajans that inspire and uplift the spirit.
      </p>
      <p>
        Our blog is designed to help bhajan enthusiasts connect with the rich
        tradition of devotional music. Whether you are a singer, musician, or
        simply someone who appreciates bhajans, you'll find a treasure trove of
        lyrics and melodies to explore.
      </p>
      <p>
        In addition to the blog, we also have a YouTube channel where we bring
        these bhajans to life through captivating performances. We invite you to
        subscribe to our channel and join our community of bhajan lovers. By
        subscribing, you'll receive notifications about our latest bhajan
        releases, live performances, and other exciting content.
      </p>
      <p>
        Subscribe to our YouTube channel and embark on a divine musical journey!
      </p>
      <div className="subscribe-button">
        <a
          href="https://youtube.com/@bhajan_sangeet27?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe Now
        </a>
      </div>
    </div>
  );
};

export default About;
