import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  input = e => {
    console.log(
      "%c input has been triggered!",
      "font-size:16px; color: green;"
    );
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clearInput = e => {
    e.preventDefault();
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.clearInput}>
        <input
          name="username"
          value={this.state.username}
          onChange={this.input}
        />
        <br />
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.input}
        />
        <br />
        <button
          onClick={e => {
            e.preventDefault();
            this.props.login(this.state.username, this.state.password);
          }}
        >
          {" "}
          Login{" "}
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            this.props.register(this.state.username, this.state.password);
          }}
        >
          {" "}
          Register{" "}
        </button>
        <br />
      </form>
    );
  }
}
