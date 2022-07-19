import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import todoListState from '../states/todoListState';

let id = 0;

const countUpID = () => {
  return id++;
};

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const onAdd = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: countUpID(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  return (
    <div className="mt-2">
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        className="border-2"
      />
      <button onClick={onAdd} className="border-2">
        Add
      </button>
    </div>
  );
};

export default TodoItemCreator;
