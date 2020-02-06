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
  border: solid 5px;

  border-image: linear-gradient(
      to bottom,
      rgba(255, 177, 209, 1),
      rgba(255, 252, 243, 1)
    )
    1 100%;
  border-radius: 5px;
  height: 300px;
  width: 200px;
  padding: 20px;
`;

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
  width: 90%;
  height: 30px;
  outline: none;
  margin: 20px 5px 5px 5px;
  border-radius: 5px;

  :hover {
    background-color: palevioletred;
    border: solid 1px papayawhip;
    color: papayawhip;

    font-size: 0.9em;
  }
`;
