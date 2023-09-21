import React from "react";
import "./style.css";
export default class AdComponent extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6606321105150999"
        data-ad-slot="4055051300"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  }
}
