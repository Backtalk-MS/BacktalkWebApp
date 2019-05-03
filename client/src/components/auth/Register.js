import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registeruser } from "../../actions/authActions";
// import classNames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      handle: "",
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const newUser = {
      handle: this.state.handle,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registeruser(newUser, this.props.history);
    alert(
      "Thank you for registering " + this.state.handle + "! Let's get started."
    );
  }

  render() {
    // const { user } = this.props.auth;
    return (
      <div className="ui container">
        <br />
        <br />
        <br />
        <form className="ui form" onSubmit={this.onSubmit}>
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
        </form>
        <br />
        <br />
      </div>
    );
  }
}

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registeruser }
)(withRouter(Register));
