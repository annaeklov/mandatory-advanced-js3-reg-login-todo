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
      <UlWrapper>
        <Ul>
          <TransitionGroup>{todoList}</TransitionGroup>
        </Ul>
      </UlWrapper>
    </>
  );
}

/*--- STYLING ---*/


const UlWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
`;

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Animation = styled.li`
padding: 5px 10px;
border-bottom: 1px dashed #e3c994;
min-width: 200px;
width: auto;
color: #969696;



/*---About the animation---*/
  transition: 0.5s ease-out;
  transform: translateX( 
    ${({ state }) => (state === "entering" || state === "entered" ? 0 : 400)}px
  );

/*   background: ${({ state }) =>
  state === "entering" || state === "entered"
    ? "transparent"
    : "papayawhip"}; */

  opacity: ${({ state }) =>
    state === "entering" || state === "entered" ? "1" : "0.1"};
`;

const DelBtn = styled.button`
  position: absolute;
  left: 100%;
  top: 10%;
  margin-left: 20px;
  border: 1px solid #e3c994;
  border-radius: 20px;
  background: transparent;
  outline: none;
  color: #f25c1f;


  :hover {
    background: #f25c1f;
      color: #e3c994;

  }
`;
