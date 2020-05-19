import React, { FC, useState } from 'react';
import { Button, Input } from 'antd';
import useEventEmitter, { EventEmitter } from '..';

const MessageBox: FC<{
  focus$: EventEmitter<string>;
}> = function ({ focus$ }) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <p>You received a message</p>
      <Button
        onClick={() => {
          focus$.emit('reply');
        }}
      >
        Reply
      </Button>
    </div>
  );
};

const InputBox: FC<{
  focus$: EventEmitter<string>;
}> = function ({ focus$ }) {
  const [val, setVal] = useState<string | undefined>(undefined);
  focus$.useSubscription((value) => {
    setVal(value);
  });
  return <Input value={val} placeholder='Enter reply' />;
};

const EventEmitterDemo: FC = () => {
  const focus$ = useEventEmitter<string>();
  focus$.useSubscription((value) => {
    console.log(value);
  });
  return (
    <div>
      <MessageBox focus$={focus$} />
      <InputBox focus$={focus$} />
    </div>
  );
};

export default EventEmitterDemo;
