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
          <p>
            Don't have an account?
            <Link to="/register">
              <span>Register here</span>
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?
            <Link to="/login">
              <span>Login here</span>
            </Link>
          </p>
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
  width: 90%;
  height: 30px;
  outline: none;
  margin: 20px 5px 5px 5px;

  :hover {
    background-color: #b0935e;
    color: #2a2a2a;

    font-size: 0.9em;
  }
`;
