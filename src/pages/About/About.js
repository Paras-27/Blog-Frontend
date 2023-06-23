import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <p>Welcome to Gunjan's Bhajan Blog!</p>
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