import React from 'react'
import Footer from './components/Footer'
import RecursiveCmp from './components/RecursiveCmp'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'
import JsonEditor from '../JsonEditor'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <RecursiveCmp arr={['a','b','c']}/>
    <JsonEditor />
    <Footer />
  </div>
)

export default App