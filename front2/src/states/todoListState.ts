import { atom } from 'recoil';
import { TodoType } from '../types';

const todoListState = atom({
  key: 'TodoList',
  default: [] as Array<TodoType>,
});

export default todoListState;
