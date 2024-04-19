import React from "react";
import "./style.css";
export default class InArticleAd2Component extends React.Component {
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
          data-ad-slot="5985422798"
          data-full-width-responsive="false"
        />
      </div>
    );
  }
}
