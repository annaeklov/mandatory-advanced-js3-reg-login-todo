import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedEmail: ""
    };
  }

  componentDidMount() {
    if (this.props.token) {
      let decoded = jwt.decode(this.props.token);
      this.setState({
        decodedEmail: decoded.email
      });
      console.log(decoded);
    }
  }

  render() {
    return (
      <>
        <Container>
          <Title>HEJ header</Title>
          {this.state.decodedEmail && (
            <Subtitle>
              Logged in as: <b>{this.state.decodedEmail}</b>
            </Subtitle>
          )}
        </Container>
      </>
    );
  }
}

/*--- STYLING ---*/

const Container = styled.div`
  width: 100vw;
  height: 20%;
  background-color: papayawhip;
`;

const Title = styled.h1`
  color: palevioletred;
`;

const Subtitle = styled.p`
  color: palevioletred;
  font-size: ${props => (props.email ? "30px" : "20px")};
  margin: 0;
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
