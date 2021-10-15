/* eslint-disable no-unused-vars */
import './AttributeInputPanel.css';

import { Observer, useLocalStore } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import InputNumberForm from '../../component/inputNumberForm/InputNumberForm';

interface AttributeInputPanelProps {
  title: string;
}

function AttributeInputPanel(props: AttributeInputPanelProps) {
  const [title] = useState(props.title);
  const [formLiteral] = useState([
    { title: '攻击力' },
    { title: '防御力' },
    { title: '最大生命值' },
    { title: '元素精通' },
    { title: '暴击率' },
    { title: '暴击伤害' },
  ]);
  const listItems = formLiteral.map((element) => (
    <InputNumberForm
      key={element.title}
      title={element.title}
      width={100}
      min={0}
      max={100}
      defaultValue={0}></InputNumberForm>
  ));
  return (
    <div className="input-box">
      <div className="input-box-title">{title}</div>
      <div className="input-box-detail">{listItems}</div>
    </div>
  );
}

export default AttributeInputPanel;
