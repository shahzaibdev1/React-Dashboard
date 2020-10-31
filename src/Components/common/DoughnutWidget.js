import React from "react";

// Importing charts
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function DoughnutWidget(props) {
  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    title: props.title,
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "300", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        bgColor: "#2a2a2a",
        xAxisName: "Country", //Set the x-axis name
        yAxisName: "Reserves (MMbbl)", //Set the y-axis name
        numberSuffix: "K",
        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: props.data,
    },
  };

  return (
    <div>
      <ReactFC {...chartConfigs} />
    </div>
  );
}

export default DoughnutWidget;
