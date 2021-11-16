/* eslint-disable no-unused-vars */
import './CharacterAttributesFrame.css';

import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { BuffGroupStore } from '../../../../../store/buffGroup';
import { AttributesTypeCode } from '../../../../common/type-code';
import InputNumberForm from '../../../../components/InputNumberForm/InputNumberForm';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';

export interface BaseAttributes {
  type: AttributesTypeCode;
  name: string;
  value: number;
  editable: boolean;
}

export interface CharacterAttributesFrameProps {
  attributes: Array<BaseAttributes>;
  // buffGroupStore: BuffGroupStore;
}

export default observer(function CharacterAttributesFrame(
  props: CharacterAttributesFrameProps,
) {
  const listItems = props.attributes.map((element) => (
    <InputNumberForm
      key={element.type}
      title={element.name}
      width={100}
      min={0}
      step={0.01}
      disabled={!element.editable}
      max={99999}
      defaultValue={element.value}></InputNumberForm>
  ));
  return (
    <NormalFrame
      mainTitle="人物属性配置"
      describe="人物的基础面板，注意是无任何加成的"
      content={listItems}></NormalFrame>
  );
});
