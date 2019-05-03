import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginuser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import "./Login.css";



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
    console.log("hello");
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
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <h2 className="ui image header">
              <br/><br/><br/><br/>
                <div className="content">
                  Log-in to your account
                </div>
              </h2>
              <form className="ui large form" onSubmit={this.onSubmit}>
                <div className="ui stacked secondary segment">
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="envelope open outline icon"></i>
                      <input type="text" name="email" value={this.state.email} onChange={this.onChange} placeholder="E-mail address" />
                    </div>
                  </div>
                  <br/>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                    </div>
                  </div>
                  <br/>
                  <button className="ui fluid large teal submit button" type="submit">Login</button>
                </div>
              </form>
              <div className="ui message">
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
