import { ChangeEvent } from 'react';
import {
  RecoilRoot,
  atom,
  useRecoilState,
  selector,
  useRecoilValue,
} from 'recoil';

const textState = atom({
  key: 'textState',
  default: '',
});

const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

const TextInput = () => {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="p-1">
      <input
        type="text"
        value={text}
        onChange={onChange}
        className="border-2 border-black"
      />
      <br />
      Echo: {text}
    </div>
  );
};

const CharacterCount = () => {
  const count = useRecoilValue(charCountState);

  return <div>Character Count: {count}</div>;
};

const App = () => {
  return (
    <RecoilRoot>
      <TextInput />
      <CharacterCount />
    </RecoilRoot>
  );
};

export default App;
