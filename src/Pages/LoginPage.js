import React from "react";
import { Helmet } from "react-helmet";
//import styled from "styled-components";
//import { Redirect } from "react-router-dom";

import Form from "../Components/Form.js";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // compdidmount ska in här, kolla om token finns, OM den finns så ska man redirectas till todos

  handleSubmit(e) {
    e.preventDefault();
    console.log("submittad sign in");
  }

  handleOnChange(e) {
    console.log("changing sign in ", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Login page</title>
        </Helmet>
        <p>Please login to see your todos</p>
        <Form
          handleSubmit={this.handleSubmit}
          handleOnChange={this.handleOnChange}
          submitButtonText="Login"
          emailValue={this.state.email}
          passwordValue={this.state.password}
          register={true}
          
        />

        
      </>
    );
  }
}
