import React from "react";
import PropTypes from "prop-types";

function TextWidget(props) {
  return (
    <div
      className={`widget-wrap h-100 ${
        props.isLight ? "widget-bg-light" : "widget-bg-dark"
      }`}
    >
      <div
        className={`widget-title ${props.isLight ? "text-dark" : "text-light"}`}
      >
        {props.title}
      </div>
      <div
        className={`widget-value d-flex align-items-end h-75 ${
          props.isLight ? "text-dark" : "text-light"
        }`}
      >
        <div className={`value ${props.isLight ? "text-dark" : "text-light"}`}>
          {props.value}
        </div>
        <div
          className={`description lead ${
            props.isLight ? "text-dark" : "text-light"
          }`}
        >
          {props.text}
        </div>
      </div>
    </div>
  );
}

TextWidget.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  isLight: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

export default TextWidget;
