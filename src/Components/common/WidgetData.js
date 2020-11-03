import React from "react";

function WidgetData(props) {
  let text = props.isLight ? "text-dark" : "text-light";
  return (
    <div className="border-dashed rounded mb-2">
      <div className="widget-txt p-2 d-inline-block">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#FFE03F" />
          <path
            d="M11 17L20 10L29 17V28C29 28.5304 28.7893 29.0391 28.4142 29.4142C28.0391 29.7893 27.5304 30 27 30H13C12.4696 30 11.9609 29.7893 11.5858 29.4142C11.2107 29.0391 11 28.5304 11 28V17Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 30V20H23V30"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={`p-2 d-inline-block widget-txt widget-detail font-weight-bold ${text}`}
      >
        <p>{props.title}</p>
        <small>{props.date}</small>
      </div>
      <div
        className={`d-inline-block px-2 text-right w-50 ml-auto widget-txt font-weight-bold ${text}`}
      >
        <small>{props.pageViews}</small>
      </div>
    </div>
  );
}

export default WidgetData;
