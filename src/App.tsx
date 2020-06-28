import React from 'react';
import { Divider } from 'antd';
import './App.less';
import AxiosDemo from './axios/demo';
import TodoList from './views/TodoList';
import DynamicFormDemo from './components/DynamicForm/demo/index1';

function App() {
  return (
    <>
      <section style={{ margin: '50px 100px' }}>
        <Divider orientation='left'>typescript简单重构axios</Divider>
        <AxiosDemo />
      </section>
      <section style={{ margin: '50px 100px' }}>
        <Divider orientation='left'>使用mobx实现的todolist</Divider>
        <TodoList />
      </section>
      <section style={{ margin: '50px 100px' }}>
        <Divider orientation='left'>react组件</Divider>
        <DynamicFormDemo />
      </section>
    </>
  );
}

export default App;
