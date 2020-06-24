import { action, observable, computed } from 'mobx';
import { generateHash } from '@/utils';

export interface ITodoItem {
  id: string;
  name: string;
  desc: string;
  done?: boolean;
}

const ITEM: { name: string; desc: string }[] = [
  {
    name: 'javascript',
    desc: '一种具有函数优先的轻量级，解释型或即时编译型的高级编程语言',
  },
  {
    name: 'css',
    desc: '层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML或XML',
  },
  { name: 'html5', desc: 'HTML5是构建Web内容的一种语言描述方式。' },
  {
    name: 'react',
    desc: 'React makes it painless to create interactive UIs. ',
  },
  {
    name: 'angular',
    desc:
      'Angular is a platform for building mobile and desktop web applications',
  },
  { name: 'vue', desc: '是一套用于构建用户界面的渐进式框架' },
  { name: 'redux', desc: 'A Predictable State Container for JS Apps' },
  { name: 'vuex', desc: 'Vue.js 的中心化状态管理方案' },
];

export class TodoStore {
  @observable todoList: ITodoItem[] = [];

  @computed get doneCount() {
    return this.todoList.filter((todo) => todo.done).length;
  }

  @computed get undoneCount() {
    return this.todoList.filter((todo) => !todo.done).length;
  }

  @action.bound add() {
    const content = ITEM[Math.floor(Math.random() * ITEM.length)];
    const todo: ITodoItem = {
      id: generateHash(),
      name: content.name,
      desc: content.desc,
      done: false,
    };
    this.todoList.push(todo);
  }

  @action.bound remove(id: string) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }

  @action.bound toggleStatus(id: string) {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id === id) {
        Reflect.set(todo, 'done', !todo.done);
      }
      return todo;
    });
  }
}
