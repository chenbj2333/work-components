import { TodoStore } from './todo';
import { createContext, useContext } from 'react';

function createStores() {
  return {
    todoStore: new TodoStore(),
  };
}

const stores = createStores();

const StoresContext = createContext(stores);

export function useTodoStore() {
  const { todoStore } = useContext(StoresContext);
  return todoStore;
}

export { stores, StoresContext };
