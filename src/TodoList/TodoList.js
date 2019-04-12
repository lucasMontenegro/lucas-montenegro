import React from 'react';
import Footer from './Footer';
import AddTodo from './AddTodo';
import TodoUL from './TodoUL';

export const PureTodoList = () => (
  <div>
    <h3>Todo List</h3>
    <AddTodo />
    <TodoUL />
    <Footer />
  </div>
);

export default PureTodoList;
