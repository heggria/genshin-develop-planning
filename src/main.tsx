import './index.css';
import 'antd/dist/antd.css';

import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import stores from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
