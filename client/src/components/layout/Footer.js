import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <div className="ui horizontal inverted small divided link list">
          <Link className="item" to="/">
            Site Map
          </Link>
          <Link className="item" to="/">
            Contact Us
          </Link>
          <Link className="item" to="/">
            Terms and Conditions
          </Link>
          <Link className="item" to="/">
            Privacy Policy
          </Link>
          &nbsp; &nbsp; Copyright &copy; {new Date().getFullYear()} BackTalk
        </div>
      </div>
    </div>
  );
};
