import React, { useEffect } from 'react';

const Demo1: React.FC = () => {
  useEffect(() => {
    if (document.getElementById('father-id')) {
      document.getElementById('father-id')?.addEventListener('click', (e) => {
        console.dir(e.target);
      });
    }
  }, []);

  return (
    <div id='father-id'>
      <p key='1'>aaa</p>
      <p key='2'>bbb</p>
    </div>
  );
};

export default Demo1;
