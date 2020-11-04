import React from "react";
import WidgetData from "./WidgetData";

function SimpleDataWidget(props) {
  console.log(props.pageViews);
  return (
    <div
      className={`px-2 py-2 h-100 ${
        props.isLight ? "widget-bg-light" : "widget-bg-dark"
      }`}
    >
      <h3 className={props.isLight ? "text-dark" : "text-light"}>Sources</h3>
      <WidgetData
        title="Page Views"
        isLight={props.isLight}
        date={props.date}
        pageViews={props.completeData.pageViews}
      />

      <WidgetData
        title="Sessions per page"
        isLight={props.isLight}
        date={props.date}
        pageViews={props.completeData.pagePerSession}
      />
    </div>
  );
}

export default SimpleDataWidget;
