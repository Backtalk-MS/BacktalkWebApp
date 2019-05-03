import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginuser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import "./Login.css";
import classnames from "classnames";


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
      this.props.history.push("/dashboard");
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
      <div classname="ui container">
          <div class="ui middle aligned center aligned grid">
            <div class="column">
              <h2 class="ui image header">
              <br/><br/><br/><br/>
                <div class="content">
                  Log-in to your account
                </div>
              </h2>
              <form classname="ui large form" onSubmit={this.onSubmit}>
                <div class="ui stacked secondary segment">
                  <div class="field">
                    <div class="ui left icon input">
                      <i class="user icon"></i>
                      <input type="text" name="email" value={this.state.email} onChange={this.onChange} placeholder="E-mail address" />
                    </div>
                  </div>
                  <br/>
                  <div class="field">
                    <div class="ui left icon input">
                      <i class="lock icon"></i>
                      <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                    </div>
                  </div>
                  <br/>
                  <div class="ui fluid large teal submit button" type="submit">Login</div>
                </div>
              </form>
              <div class="ui message">
                New to us? <a href="/Register">Register</a>
              </div>
            </div>
          </div>
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
