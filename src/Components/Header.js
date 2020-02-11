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
    }
  }

  render() {
    return (
      <>
        <Container>
          <Title>TODO APP</Title>
          {this.state.decodedEmail && (
            <>
              <Subtitle>Logged in as:</Subtitle>
              <Subtitle email>{this.state.decodedEmail}</Subtitle>
            </>
          )}
        </Container>
      </>
    );
  }
}

/*--- STYLING ---*/

const Container = styled.div`
  width: 60%;
  border-bottom: 1px solid #e3c994;
  position: relative;
`;

const Title = styled.h1`
  color: #b0935e;
  font-size: 80px;
  margin: 0px 0px 20px 0px;
  font-family: "Six Caps", sans-serif;
  text-align: center;
  letter-spacing: 20px;
`;

const Subtitle = styled.p`
  position: absolute;
  bottom: 0;
  color: #e3c994;
  margin: 3px 3px 3px 10px;
  display: inline-block;
  left: ${props => (props.email ? "80px" : "0px")};
  font-size: ${props => (props.email ? "25px" : "16px")};
  font-family: ${props =>
    props.email ? "Six Caps, sans-serif" : "Mr Dafoe, cursive"};
  letter-spacing: ${props => (props.email ? "1px" : "0")};
`;
