/* eslint-disable no-unused-vars */
import './MainLayout.css';

import { InputNumber } from 'antd';
import { Observer, useLocalStore } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import store from '../../../store';
import AttributeInputPanel from '../../panel/attributeInputPanel/AttributeInputPanel';

function MainLayout() {
  const [count, setCount] = useState(0);
  const { todoListStore } = useLocalStore(() => store);
  useEffect(() => {
    const inputChange = () => {
      setCount(45464);
    };
    inputChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="site-layout-background">
      <div className="mainLayout">
        <AttributeInputPanel title={'人物基础面板'}></AttributeInputPanel>
        <AttributeInputPanel title={'武器基础面板'}></AttributeInputPanel>
      </div>
    </div>
  );
}

export default MainLayout;
