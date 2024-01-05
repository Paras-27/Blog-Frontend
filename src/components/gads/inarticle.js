import React from "react";
import "./style.css";
export default class InArAdComponent extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    const adStyle = {
      display: "block",
      textAlign: "center",
    };
    return (
      <div className="adcontainer">
        <ins
          className="adsbygoogle"
          style={adStyle}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-6606321105150999"
          data-ad-slot="6798867122"
          data-full-width-responsive="false"
        />
      </div>
    );
  }
}
