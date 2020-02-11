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
      token: token$.value,
      invalidInput: false,
      error: 0
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
        this.setState({ error: 1 });
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
        this.setState({ error: 1 });
        console.log("err", err);
        updateToken(null);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.content.trim().length === 0) {
      this.setState({ invalidInput: true });
      this.setState({ content: "" });
      return;
    }
    this.postAxios();
    this.setState({ invalidInput: false });
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
        this.setState({ error: 0 });
      })
      .catch(err => {
        this.setState({ error: 2 });
        console.log("err", err);
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

        <Title>MY TODOS</Title>

        <Container>
          <Button logout type="submit" value="Log out" onClick={this.logout} />
          <Form onSubmit={this.handleSubmit}>
            <InputField
              required
              maxLength="30"
              type="text"
              placeholder="Add a new todo"
              onChange={this.handleOnChange}
              value={this.state.content}
            />

            {this.state.invalidInput && (
              <Error>Invalid input, only whitespaces are not allowed</Error>
            )}

            <Button type="submit" value="ADD" />
          </Form>

          <TodoList
            todoList={this.state.todoList}
            deleteTodo={this.deleteAxios}
          />
          {this.state.error === 1 && (
            <Error>Something went wrong, try again</Error>
          )}
          {this.state.error === 2 && (
            <Error>Oops, the todo is already deleted..</Error>
          )}

          {!this.state.token && <Redirect to="/login" />}
        </Container>
      </>
    );
  }
}

/*--- STYLING --*/

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #404040;
  box-shadow: 10px 10px 31px -5px rgba(0, 0, 0, 0.57);
  margin-bottom: 20px;
  border-radius: 1px;
  height: 600px;
  width: 600px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  letter-spacing: 5px;
  color: #b0935e;
  margin: 30px 0px 10px 0px;
`;

const InputField = styled.input`
  border: none;
  border-bottom: solid 1px #e3c994;
  background: transparent;
  color: white;
  margin: 15px 0px;
  width: 250px;
  height: 20px;
  font-size: 12px;
  outline: none;
`;

const Button = styled.input.attrs({ type: "submit" })`
  border: none;
  border-radius: 5px;
  background-color: #2a2a2a;
  font-size: ${props => (props.logout ? "12px" : "20px")};
  color: #b0935e;
  width: ${props => (props.logout ? "80px" : "130px")};
  height: ${props => (props.logout ? "25px" : "30px")};
  outline: none;
  margin: 20px 0px 5px 0px;
  margin-top: ${props => props.logout && "10px"};
  position: ${props => props.logout && "absolute"};
  right: ${props => props.logout && "8px"};
  top: ${props => props.logout && "3px"};

  :hover {
    background-color: #b0935e;
    color: #2a2a2a;
    font-size: ${props => (props.logout ? "0.7em" : "0.9em")};
  }
`;

const Error = styled.p`
  color: #f25c1f;
  font-weight: bold;
`;
