import React from "react";
import PropTypes from "prop-types";

function TextWidget(props) {
  return (
    <div className="widget-wrap">
      <div className="widget-title">{props.title}</div>
      <div className="widget-value">
        <div className="value">{props.value}</div>
        <div className="description">{props.text}</div>
      </div>
    </div>
  );
}

TextWidget.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  text: PropTypes.string,
};

export default TextWidget;
