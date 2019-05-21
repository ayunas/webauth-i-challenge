import React from "react";
import "./App.css";
import Login from "./Login";
import Users from "./Users";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      url: "http://localhost:5660/api"
    };
  }

  login = (username, password) => {
    console.log(
      "%c login has been triggered!",
      "font-size:16px; color: purple;"
    );
    const credentials = { username, password };
    axios
      .post(`${this.state.url}/login`, credentials)
      .then(res => {
        console.log(
          `%c response data: ${res.body}`,
          "font-size:16px; color:orange;"
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  register = (username, password) => {
    console.log(
      "%c register has been triggered!",
      "font-size:16px; color: blue;"
    );
    const newUser = { username, password };

    axios
      .post(`${this.state.url}/register`, newUser)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <header>Welcome to Authenticator</header>
          <Login login={this.login} register={this.register} />
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
