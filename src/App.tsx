import React from 'react';
import './App.less';
import AxiosDemo from './axios/demo';
import TodoList from './views/TodoList';

function App() {
  return (
    <div>
      <AxiosDemo />
      <TodoList />
    </div>
  );
}

export default App;
