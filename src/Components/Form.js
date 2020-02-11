import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Form(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormWrapper>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={props.handleOnChange}
          autoFocus
          value={props.emailValue}
        />
        <InputField
          type="password"
          required
          name="password"
          placeholder="Password"
          minLength="1"
          onChange={props.handleOnChange}
          value={props.passwordValue}
        />
        <InputButton type="submit" value={props.submitButtonText} />

        {props.register ? (
          <RegOrLoginP>
            Don't have an account? <br />
            <Link to="/register">
              <span>Register here</span>
            </Link>
          </RegOrLoginP>
        ) : (
          <RegOrLoginP>
            Already have an account? <br />
            <Link to="/login">
              <span>Login here</span>
            </Link>
          </RegOrLoginP>
        )}
      </FormWrapper>
    </form>
  );
}

/*--- STYLING ---*/

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #404040;
  box-shadow: 10px 10px 31px -5px rgba(0, 0, 0, 0.57);
  margin-top: 10px;
  border-radius: 1px;
  height: 300px;
  width: 300px;
  padding: 20px;
`;

const InputField = styled.input`
  border: none;
  border-bottom: solid 1px #e3c994;
  background: transparent;
  margin: 15px 0px;
  width: 90%;
  height: 20px;
  font-size: 12px;
  outline: none;
  color: white;
`;

const InputButton = styled.input.attrs({ type: "submit" })`
  border: none;
  border-radius: 5px;
  background-color: #2a2a2a;
  color: #b0935e;
  font-size: 20px;
  width: 90%;
  height: 30px;
  outline: none;
  margin: 20px 5px 5px 5px;

  :hover {
    background-color: #b0935e;
    color: #2a2a2a;
    font-size: 1.1em;
  }
`;

const RegOrLoginP = styled.p`
  color: #969696;
  text-align: center;
  a {
    text-decoration: none;
    border-bottom: 1px solid #e3c994;
    font-size: 0.9em;
    color: #969696;
  }
  a:hover {
    color: #969696;
    font-size: 1.1em;
  }
`;
