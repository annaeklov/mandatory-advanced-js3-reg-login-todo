import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { token$, updateToken } from "../Components/TokenStore.js";
import Header from "../Components/Header.js";
import TodoList from "../Components/TodoList.js";

export default class TodoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      content: "",
      token: token$.value
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAxios = this.getAxios.bind(this);
    this.postAxios = this.postAxios.bind(this);
    this.deleteAxios = this.deleteAxios.bind(this);
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
      this.setState({ token });
    });
    this.getAxios();
  }

  getAxios() {
    axios
      .get("http://3.120.96.16:3002/todos", {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(resp => {
        this.setState({ todoList: resp.data.todos });
      })
      .catch(err => {
        console.log("err", err);
        updateToken(null);
      });
  }

  postAxios() {
    let todo = { content: this.state.content };

    axios
      .post("http://3.120.96.16:3002/todos", todo, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(resp => {
        this.getAxios();
        this.setState({ content: "" });
      })
      .catch(err => {
        console.log("err", err);
        updateToken(null);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.postAxios();
  }

  handleOnChange(e) {
    this.setState({ content: e.target.value });
  }

  deleteAxios(id) {
    axios
      .delete(`http://3.120.96.16:3002/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(resp => {
        this.getAxios();
      })
      .catch(err => {
        console.log("err", err);
        updateToken(null);
      });
  }

  logout() {
    updateToken(null);
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Todo page</title>
        </Helmet>
        <Header token={this.state.token} />

        <p>TodoPage</p>
        <form onSubmit={this.handleSubmit}>
          <InputField
            type="text"
            placeholder="Add a new todo"
            onChange={this.handleOnChange}
            value={this.state.content}
          />
          <InputButton type="submit" value="Add todo" />
        </form>

        <TodoList
          todoList={this.state.todoList}
          deleteTodo={this.deleteAxios}
        />

        <InputButton
          logout
          type="submit"
          value="Log out"
          onClick={this.logout}
        />
        {!this.state.token && <Redirect to="/login" />}
      </>
    );
  }
}

/*--- STYLING --*/

const InputField = styled.input`
  border: none;
  border-bottom: solid 1px palevioletred;
  margin: 15px 0px;
  width: 90%;
  height: 20px;
  font-size: 12px;
  outline: none;
`;

const InputButton = styled.input.attrs({ type: "submit" })`
  border: solid 1px palevioletred;
  border-radius: 5px;
  background: papayawhip;
  color: palevioletred;
  width: ${props => (props.logout ? "80px" : "90%")};
  height: ${props => (props.logout ? "25px" : "30px")};
  outline: none;
  margin: 5px 0px;
  border-radius: 5px;

  :hover {
    background-color: palevioletred;
    border: solid 1px papayawhip;
    color: papayawhip;
    font-size: ${props => (props.logout ? "0.7em" : "0.9em")};
  }
`;
