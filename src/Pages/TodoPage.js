import React from "react";
import { Helmet } from "react-helmet";
//import styled from "styled-components";
//import { Redirect } from "react-router-dom";

export default class TodoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // compdidmount ska in här, kolla om token finns, OM den finns så ska inlogget hämtas och todos ska renderas

  handleSubmit(e) {
    e.preventDefault();
    console.log("submittad add todo");
  }

  handleOnChange(e) {
    console.log("changing todo", e.target.value);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Todo page</title>
        </Helmet>
        <p>TodoPage</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add a new todo"
            onChange={this.handleOnChange}
          />
          <input type="submit" value="Add todo" />
        </form>
      </>
    );
  }
}
