import './index.css';
import 'antd/dist/antd.css';

import { Provider } from 'mobx-react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './app/App';
import stores from './store';

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider {...stores}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
