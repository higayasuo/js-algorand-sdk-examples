import { atom } from 'recoil';

const todoListFilterState = atom({
  key: 'TodoListFilter',
  default: 'Show All',
});

export default todoListFilterState;
