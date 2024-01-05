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
          data-ad-client="ca-pub-6606321105150999"
          data-ad-slot="6145627987"
          data-matched-content-ui-type="image_card_stacked,image_card_stacked"
          data-matched-content-rows-num="4,2"
          data-matched-content-columns-num="1,2"
          data-ad-format="autorelaxed"
        />
      </div>
    );
  }
}
