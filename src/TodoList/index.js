import React from 'react'
import Footer from './components/Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'

const App = () => (
  <div>
    <h3>Todo List</h3>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App