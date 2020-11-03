import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Dashboard from "./Components/Dashboard";

export class App extends Component {
  state = {
    isLight: true,
  };

  themeChanger = () => {
    this.setState({ isLight: !this.state.isLight });
  };

  render() {
    return (
      <div className={`App ${this.state.isLight ? "bg-lighter" : "bg-darker"}`}>
        <div className="d-flex justify-content-center mb-2">
          <Button variant="secondary" onClick={this.themeChanger}>
            Change Theme
          </Button>
        </div>
        <Dashboard isLight={this.state.isLight} />
      </div>
    );
  }
}

export default App;
