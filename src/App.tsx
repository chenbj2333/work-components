import React, { useState } from 'react';
import './App.less';
import ScrollTip from './components/ScrollTip';

function App() {
  const list = [
    {
      id: 1,
      name: 'a',
      color: 'yellow',
    },
    {
      id: 2,
      name: 'b',
      color: 'green',
    },
    {
      id: 3,
      name: 'c',
      color: 'blue',
    },
  ];
  const [activeItem, setActiveItem] = useState(list[0]);

  const itemClk = (item: any) => {
    setActiveItem(item);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {list.map((item) => (
          <p
            key={item.id}
            onClick={() => itemClk(item)}
            style={{ padding: '10px 50px', margin: 100, background: 'orange' }}
          >
            {item.name}
          </p>
        ))}
      </div>
      <div>
        <ScrollTip msgList={list} activeItem={activeItem} />
      </div>
    </div>
  );
}

export default App;
