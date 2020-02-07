import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Form from "../Components/Form.js";
import Header from "../Components/Header.js";

export default class RegPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorPost: 0,
      redirect: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // compdidmount ska in här, kolla om token finns, OM den finns så ska man redirectas till todos

  handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://3.120.96.16:3002/register", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.status === 201) {
          this.setState({ redirect: true });
        }
      })
      .catch(err => {
        if (err.response.data.message.includes("exists")) {
          this.setState({ errorPost: 1 });
          this.setState({ email: "", password: "" });
        } else this.setState({ errorPost: 2 });

        console.log(err.response.data.message);
      });
  }

  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Register page</title>
        </Helmet>
        <Header />

        <Title>REGISTER HERE</Title>
        <Form
          handleSubmit={this.handleSubmit}
          handleOnChange={this.handleOnChange}
          submitButtonText="Register"
          emailValue={this.state.email}
          passwordValue={this.state.password}
        />
        {this.state.errorPost === 1 && (
          <Error>User with that email address exists, try another one</Error>
        )}
        {this.state.errorPost === 2 && (
          <Error>Something went wrong, please try again</Error>
        )}
        {this.state.redirect && <Redirect to="/login" />}
      </>
    );
  }
}

/*--- STYLING ---*/

const Title = styled.h1`
font-family: 'Montserrat', sans-serif;
  letter-spacing: 5px;
  color: #b0935e;
  margin: 10px 0px 10px 0px;
`;

const Error = styled.p`
  color: red;
  font-weight: bold;
`;
