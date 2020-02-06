import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Transition } from "react-transition-group";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedEmail: "",
      animate: false
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
          <Transition in={this.state.animate} timeout={500}>
            {state => <Animation state={state}></Animation>}
          </Transition>

          <button
            onClick={() => this.setState({ animate: !this.state.animate })}
          >
            Animate
          </button>
        </Container>
      </>
    );
  }
}

/*--- STYLING ---*/

const Animation = styled.div`
  width: 100px;
  height: 100px;
  transition: 1s ease-out;
  border-radius: 50px;

  transform: translateX(
    ${({ state }) => (state === "entering" || state === "entered" ? 100 : 0)}px
  );
  
  background: ${({ state }) =>
    (state === "entering" || state === "entered"
      ? "palevioletred"
      : "papayawhip") ||
    (state === "exiting" || state == "exited"
      ? "papayawhip"
      : "palevioletred")};

 /*  background: ${({ state }) => {
   switch (state) {
     case "entering":
     case "entered":
       return "palevioletred";
     case "exiting":
     case "exited":
       return "papayawhip";
   }
 }}; */
`;

const Container = styled.div`
  width: 100vw;
  height: 20%;
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(255, 189, 189, 1) 0%,
    rgba(255, 216, 168, 1) 62%,
    rgba(255, 248, 168, 1) 100.7%
  );
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
