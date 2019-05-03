import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../actions/authActions";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.signOutUser = this.signOutUser.bind(this);
  }
  signOutUser(event) {
    if (typeof getCurrentUser() === "undefined") {
      //User is already not logged in
    } else {
      localStorage.removeItem("jwtToken");
    }
  }

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
            /
            <Link to="/About" className="item">
              About
            </Link>
            <Link
              to="/Account"
              className={
                "item " +
                (typeof getCurrentUser() === "undefined"
                  ? "item disabled-link"
                  : "")
              }
            >
              Account
            </Link>
            <Link
              to="/Demo"
              className={
                "item " +
                (typeof getCurrentUser() === "undefined"
                  ? "item disabled-link"
                  : "")
              }
            >
              Demo
              <style
                dangerouslySetInnerHTML={{
                  __html: `.disabled-link { pointer-events: none }`
                }}
              />
            </Link>
            <Link to="/Login" className="item" onClick={this.signOutUser}>
              {typeof getCurrentUser() === "undefined" ? "Log in" : "Log out"}
              {/* {if(typeof getCurrentUser() === 'undefined'){}}
              Log In */}
            </Link>
            <Link to="/Register" className="item">
              Register
            </Link>
            </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
