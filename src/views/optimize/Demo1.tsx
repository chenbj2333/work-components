import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext('');

export function ChildNonTheme() {
  console.log('不关心皮肤的子组件渲染了');
  return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;
}

export function ChildWithTheme() {
  const theme = useContext(ThemeContext);
  return <div>我是有皮肤的哦~ {theme}</div>;
}

const ThemeApp: React.FC<{ children: any }> = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const onChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={onChangeTheme}>改变皮肤</button>
      {children}
    </ThemeContext.Provider>
  );
};

const Demo1: React.FC = () => {
  return (
    <ThemeApp>
      <ChildWithTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
    </ThemeApp>
  );
};

export default Demo1;
