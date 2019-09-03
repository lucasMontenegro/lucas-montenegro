import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';

const { addTodo } = actions;

export const PureAddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

const AddTodo = connect()(PureAddTodo);

export default AddTodo;
