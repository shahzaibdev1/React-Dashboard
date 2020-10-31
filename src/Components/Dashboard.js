// Step 1 - Include react
import React, { Component } from "react";

import TextWidget from "./common/TextWidget";
import BarWidget from "./common/BarWidget";
import DoughnutWidget from "./common/DoughnutWidget";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";
import { Col, Container, Row } from "react-bootstrap";

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
      theme: "",
      isLight: false,
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

    arr.map((data) => {
      if (arg === data["month"]) {
        organicSource = data.organic_source;
        directSource = data.direct_source;
        referralSource = data.referral_source;
        pageViews = data.page_views;
        users = data.users;
        newUsers = data.new_users;

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

        usersArr.push(
          {
            label: "Users",
            value: users,
          },
          {
            label: "New Users",
            value: newUsers,
          }
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
      },
      () => {
        console.log(this.state.directSource);
      }
    );
  };

  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value }, () =>
      console.log(this.state.newUsers)
    );
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
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h2>Dashboard</h2>
            </Col>
            <Col>
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
          <Row>
            <Col>
              <TextWidget title="text" value={this.state.newUsers} />
            </Col>
            <Col>
              <TextWidget title="text" value={this.state.referralSource} />
            </Col>
            <Col>
              <TextWidget title="text" value={this.state.users} />
            </Col>
            <Col>
              <TextWidget title="text" value={this.state.users} />
            </Col>
          </Row>
          <BarWidget title="Source Data" data={this.state.sourceArr} />
          <DoughnutWidget title="Users Data" data={this.state.usersArr} />
        </Container>
      </div>
    );
  }
}

export default Dashboard;
