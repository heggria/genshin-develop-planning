/* eslint-disable no-unused-vars */
// todo: need contact with value
import './CharacterBasePanel.css';

import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { charBaseAttributes } from '../../../../common/form-config';
import InputNumberForm from '../../../../components/InputNumberForm/InputNumberForm';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';

export default observer(function CharacterBasePanel() {
  const [charBaseAttributesList, setCharBaseAttributesList] = useState(
    new Map([...charBaseAttributes]),
  );
  const listItems: Array<any> = [];
  charBaseAttributesList.forEach((value, key) =>
    listItems.push(
      <InputNumberForm
        key={key}
        title={value.title}
        width={100}
        min={0}
        step={0.01}
        max={99999}></InputNumberForm>,
    ),
  );
  return (
    <NormalFrame
      mainTitle="人物属性配置"
      describe="人物的基础面板，注意是无任何加成的"
      content={listItems}></NormalFrame>
  );
});
