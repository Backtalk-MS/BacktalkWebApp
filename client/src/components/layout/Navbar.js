import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <Link to="/" className="header item">
            {" "}
            BackTalk Demo{" "}
          </Link>
          <Link to="/" className="item">
            Home
          </Link>
          <div className="right menu">
            <Link to="/Login" className="item">
              Log In
            </Link>
            <Link to="/Register" className="item">
              Register
            </Link>
            <div className="ui inverted compact menu">
              <div className="ui simple dropdown item">
                Models
                <i className="dropdown icon" />
                <div className="menu">
                  <Link className="item" to="/models/predict">
                    Predict
                  </Link>
                  <Link className="item" to="/">
                    Train
                  </Link>
                </div>
              </div>
            </div>
            {/* <Link to="Models" className="item">
              Models
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
