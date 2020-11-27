import React, { useCallback, useContext, useState } from 'react';

const LogStateContext = React.createContext<any>(null);
const LogDispatcherContext = React.createContext<any>(null);

function Logger1() {
  const addLog = useContext(LogDispatcherContext);
  console.log('Logger1 render');
  return (
    <>
      <p>一个能发日志的组件1</p>
      <button onClick={() => addLog('logger1')}>发日志</button>
    </>
  );
}

function Logger2() {
  const addLog = useContext(LogDispatcherContext);
  console.log('Logger2 render');
  return (
    <>
      <p>一个能发日志的组件2</p>
      <button onClick={() => addLog('logger2')}>发日志</button>
    </>
  );
}

function LogsPanel() {
  const logs = useContext(LogStateContext);
  return logs?.map((log: any, index: number) => <p key={index}>{log}</p>);
}

const LogProvider: React.FC<{ children: any }> = ({ children }) => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((log: string) => setLogs((prevLogs) => [...prevLogs, log]), []);

  return (
    <LogDispatcherContext.Provider value={addLog}>
      <LogStateContext.Provider value={logs}>{children}</LogStateContext.Provider>
    </LogDispatcherContext.Provider>
  );
};

const Demo2: React.FC = () => {
  return (
    <LogProvider>
      {/* 写日志 */}
      <Logger1 />
      <Logger2 />
      {/* 读日志 */}
      <LogsPanel />
    </LogProvider>
  );
};

export default Demo2;
