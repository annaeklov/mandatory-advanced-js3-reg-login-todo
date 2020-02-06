import React from "react";
import styled from "styled-components";
import { Transition, TransitionGroup } from "react-transition-group";

export default function TodoList(props) {
  const todoList = props.todoList.map(todo => {
    return (
      <Transition key={todo.id} timeout={500}>
        {state => (
          <Animation state={state}>
            {todo.content}
            <DelBtn onClick={() => props.deleteTodo(todo.id)}>X</DelBtn>
          </Animation>
        )}
      </Transition>
    );
  });
  return (
    <>
      <Ul>
        <TransitionGroup>{todoList}</TransitionGroup>
      </Ul>
    </>
  );
}

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Animation = styled.li`
  position: relative;
  width: auto;
  min-width: 200px;
  height: 30px;
  transition: 0.5s ease-out;
  margin: 5px;
  padding-top: 5px;
  padding-left: 5px;
  border-radius: 10px;

  transform: translateX(
    ${({ state }) => (state === "entering" || state === "entered" ? 0 : 400)}px
  );

  background: ${({ state }) =>
    state === "entering" || state === "entered"
      ? "palevioletred"
      : "palevioletred"};

  opacity: ${({ state }) =>
    state === "entering" || state === "entered" ? "1" : "0.1"};
`;

const DelBtn = styled.button`
  position: absolute;
  left: 100%;
  top: 10%;
  margin-left: 20px;
  border: 2px solid palevioletred;
  border-radius: 20px;
  background: transparent;

  :hover {
    background: palevioletred;
  }
`;
