import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import { stores, StoresContext } from './store';
import App from './App';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={stores}>
      <StoresContext.Provider value={stores}>
        <App />
      </StoresContext.Provider>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);
