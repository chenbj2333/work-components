import React from 'react';
import './App.less';
import ThreeDemo from './views/reactThreeFiber/threeOnly';
import RefreshBtn from './components/refresh';

function App() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <ThreeDemo /> */}
      <RefreshBtn
        refreshFun={() => {
          console.log('refresh click');
        }}
      />
    </div>
  );
}

export default App;
