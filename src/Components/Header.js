import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Title>HEJ header</Title>
          <Navbar>
            <Link to="/register">
              <MyButton>RegisterPage </MyButton>
            </Link>
            <Link to="/login">
              <MyButton>LoginPage </MyButton>
            </Link>
            <Link to="/">
              <MyButton>TodoPage</MyButton>
            </Link>
          </Navbar>
           {/* if-sats om inloggad ska subtitle visas, annars inte*/ }
          <Subtitle>Logged in as: (email)</Subtitle>
        </Container>
      </>
    );
  }
}

/*--- STYLING ---*/

const Container = styled.div`
  width: 100vw;
  height: 30%;
  background-color: papayawhip;
`;

const Title = styled.h1`
  color: palevioletred;
`;

const Subtitle = styled.h2`
  color: palevioletred;
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
`;

const MyButton = styled.button`
  border: solid 1px palevioletred;
  border-radius: 5px;
  background: papayawhip;
  color: palevioletred;
  width: 100px;
  height: 50px;
  outline: none;
  margin: 5px;

  :hover {
    background-color: palevioletred;
    border: solid 1px papayawhip;
    color: papayawhip;
    font-size: 0.9em;
  }
`;
