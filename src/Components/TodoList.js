import React from "react";
import styled from "styled-components";

export default function TodoList(props) {
  const todoList = props.todoList.map(todo => {
    return (
      <li key={todo.id}>
        {todo.content}
        <button onClick={() => props.deleteTodo(todo.id)}>X</button>
      </li>
    );
  });
  return (
    <>
      <ul>{todoList}</ul>
    </>
  );
}
