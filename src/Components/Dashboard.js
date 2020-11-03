// Step 1 - Include react
import React, { Component } from "react";

import TextWidget from "./common/TextWidget";
import BarWidget from "./common/BarWidget";
import DoughnutWidget from "./common/DoughnutWidget";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./dashboard.css";
import { Col, Container, Row } from "react-bootstrap";
import SplineWidget from "./common/SplineWidget";
import SimpleDataWidget from "./common/SimpleDataWidget";
import PieWidget from "./common/PieWidget";
import FunnelWidget from "./common/AreaWidget";

const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg",
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOptions: [],
      selectedValue: null,
      organicSource: null,
      directSource: null,
      referralSource: null,
      items: [],
      pageViews: null,
      users: null,
      newUsers: null,
      sourceArr: [],
      usersArr: [],
      currentMonth: null,
      sessions: [],
      numOfSessionsPerUser: null,
      pagePerSession: null,
      avgSessionTime: null,
      bounceRate: null,
      sessionDataArr: [],
    };
  }

  getData = (arg) => {
    const arr = this.state.items;

    let organicSource = 0;
    let directSource = 0;
    let referralSource = 0;
    let users = 0;
    let pageViews = 0;
    let newUsers = 0;
    let sourceArr = [];
    let usersArr = [];
    let selectedValue = null;
    let currentMonth = null;
    let sessions = [];
    let numOfSessionsPerUser = null;
    let pagePerSession = null;
    let avgSessionTime = null;
    let bounceRate = null;
    let sessionDataArr = [];

    arr.map((data) => {
      usersArr.push({ label: data.month, value: data.new_users });
      sessions.push({ label: data.month, value: data.sessions });

      if (arg === data["month"]) {
        organicSource = data.organic_source;
        directSource = data.direct_source;
        referralSource = data.referral_source;
        pageViews = data.page_views;
        users = data.users;
        newUsers = data.new_users;
        numOfSessionsPerUser = data.number_of_sessions_per_users;
        pagePerSession = data.page_per_session;
        avgSessionTime = data.avg_session_time;
        bounceRate = data.bounce_rate;

        currentMonth = data["month"];
        sourceArr.push(
          {
            label: "Organic Source",
            value: organicSource,
          },
          {
            label: "Direct Source",
            value: directSource,
          },
          {
            label: "Referral Source",
            value: referralSource,
          }
        );

        sessionDataArr.push(
          {
            label: "Sessions per user",
            value: numOfSessionsPerUser,
          },
          { label: "Page per session", value: pagePerSession },
          { label: "Average Session Time", value: avgSessionTime },
          { label: "Bounce Rate", value: bounceRate }
        );
      }
    });

    selectedValue = arg;
    this.setState(
      {
        organicSource,
        directSource,
        referralSource,
        pageViews,
        users,
        newUsers,
        sourceArr,
        usersArr,
        currentMonth,
        sessions,

        numOfSessionsPerUser,
        pagePerSession,
        avgSessionTime,
        bounceRate,
        sessionDataArr,
      },
      () => {
        console.log(this.state.sessionDataArr);
      }
    );
  };

  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value });
  };

  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018",
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {
    let { isLight } = this.props;

    return (
      <div className="py-2">
        <Container>
          <Row>
            <Col>
              <h2
                className={`font-weight-bold ${
                  isLight ? "text-dark" : "text-light"
                }`}
              >
                Dashboard
              </h2>
            </Col>
            <Col xs={3}>
              <Dropdown
                options={this.state.dropdownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="my-2">
            <Col xs={5} md={3}>
              <TextWidget
                title="new users"
                isLight={isLight}
                value={this.state.newUsers}
              />
            </Col>
            <Col xs={6} md={3}>
              <TextWidget
                title="referral source"
                isLight={isLight}
                value={this.state.referralSource}
              />
            </Col>
            <Col xs={12} md={6}>
              <DoughnutWidget
                title="New Users by Date"
                isLight={isLight}
                data={this.state.usersArr}
              />
            </Col>
          </Row>
          <Row className="my-2">
            <Col xs={6}>
              <BarWidget
                x="Sources"
                y="Total Number"
                title="Source Data"
                isLight={isLight}
                data={this.state.sourceArr}
              />
            </Col>
            <Col>
              <TextWidget
                title="Users"
                isLight={isLight}
                value={this.state.users}
              />
            </Col>
            <Col>
              <TextWidget
                title="Organic Source"
                isLight={isLight}
                value={this.state.organicSource}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <SplineWidget
                title="New Users"
                isLight={isLight}
                data={this.state.usersArr}
              />
            </Col>
            <Col>
              <SimpleDataWidget
                isLight={isLight}
                date={this.state.currentMonth}
                completeData={this.state}
              />
            </Col>
          </Row>
          <div className="my-2"></div>
          <Row>
            <Col xs={12} md={6}>
              <PieWidget
                title="Total Sessions"
                isLight={isLight}
                date={this.state.currentMonth}
                data={this.state.sessions}
              />
            </Col>
            <Col xs={12} md={6}>
              <FunnelWidget
                title="Sessions Info"
                isLight={isLight}
                date={this.state.currentMonth}
                data={this.state.sessionDataArr}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
