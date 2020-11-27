import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import { stores, StoresContext } from './store';
import App from './App';

import * as Cesium from 'cesium';

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYzlkMGRkOS00ZGEzLTQ4YjAtODUwYi00MzM0MzI3MjY0MWUiLCJpZCI6Mzg0NjUsImlhdCI6MTYwNjM3NDk5MX0.x2EOI-CdYZXAh25WMotyFiNuQvcBWIW3NJ5CxeHVC2U';

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
