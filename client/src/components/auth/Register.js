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
    console.log("hello");
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
      
      <div className="ui middle aligned center aligned grid">
          <div className="column">
              <h2 className="ui image header">
              <br/><br/><br/><br/>
                <div className="content">
                  Register an account
                </div>
              </h2>
              <form className="ui large form" onSubmit={this.onSubmit}>
                <div className="ui stacked secondary segment">
                                
                <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input type="text" name="handle" value={this.state.handle} onChange={this.onChange} placeholder="Nickname" />
                    </div>
                  </div>

                  <br/>

                  <div className="field">
                    <div className="ui left icon input">
                      <i className="envelope open outline icon"></i>
                      <input type="email" name="email" value={this.state.email} onChange={this.onChange} placeholder="E-mail address" />
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

                <button className="ui fluid large teal submit button" type="submit">Submit</button>
              </div>
              <br/>
            </form>
          </div>
      </div>
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
