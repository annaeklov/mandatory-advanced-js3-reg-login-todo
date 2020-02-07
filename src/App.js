import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import RegPage from "./Pages/RegPage.js";
import LoginPage from "./Pages/LoginPage.js";
import TodoPage from "./Pages/TodoPage.js";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <>
          <AppDiv>
            <Route exact path="/" component={TodoPage} />
            <Route path="/register" component={RegPage} />
            <Route path="/login" component={LoginPage} />
          </AppDiv>
        </>
      </Router>
    );
  }
}

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #2a2a2a;
`;
