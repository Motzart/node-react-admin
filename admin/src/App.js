import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";

import Navbar from "./components/layout/Navbar";
import Lending from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import ProtecedRoute from "./components/common/ProtectedRoute";

import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import Dashboard from "./components/dashboard/Dashboard";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decode = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decode));
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    store.dispatch(logoutUser());
    // TODO clear user profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Lending} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Switch>
                <ProtecedRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
