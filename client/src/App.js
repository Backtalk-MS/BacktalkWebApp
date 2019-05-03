import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Demo from "./components/Model/Demo";
import "./App.css";
import About from "./components/about/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Predict from "./components/Model/Predict";
import Train from "./components/Model/Train";
import Account from "./components/auth/Account";
import Alerts from "./components/alert/Alerts";
import Endpoints from "./components/endpoint/Endpoints";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

//Check if user already logged in
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

//Within the <div className ="container"> exists the pages/route that the website knows about
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <div className="sticky-wrap">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <br />
            <br />
            <div className="container">
              <Route exact path="/Demo" component={Demo} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/models/predict" component={Predict} />
              <Route exact path="/about" component={About} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/alerts" component={Alerts} />
              <Route exact path="/models/train" component={Train} />
              <Route exact path="/endpoints" component={Endpoints} />
            </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
