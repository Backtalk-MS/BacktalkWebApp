import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginuser } from "../../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Account");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginuser(userData);
  }

  render() {
    const errors = this.state.errors;
    return (
      <div className="ui container">
        <br />
        <br />
        <br />
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="xyz@numerals.com"
            />
          </div>
          <div className="field">
            <label>password</label>
            <input
              type="password"
              name="password"
              placeholder="******** (testpass)"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <button className="ui button" type="submit">
            Log In
          </button>
        </form>
        {/* <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>Nickname</label>
            <input
              type="text"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              placeholder="StackOverflowMaster"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="abc@alphabet.com"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="password123"
            />
          </div>
          <button className="ui button" type="submit">
            Submit
          </button>
        </form> */}
        <br />
        <br />
      </div>
    );
  }
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginuser }
)(Login);
