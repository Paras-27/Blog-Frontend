import React from "react";
import "./style.css";
export default class MultiplexAdComponent extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <div className="adcontainer">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-6606321105150999"
          data-ad-slot="6145627987"
        />
      </div>
    );
  }
}
