import React from "react";
import "./style.css";
export default class DisplayAdComponent extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <div className="adcontainer">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6606321105150999"
          data-ad-slot="4055051300"
          data-full-width-responsive="true"
        />
      </div>
    );
  }
}
