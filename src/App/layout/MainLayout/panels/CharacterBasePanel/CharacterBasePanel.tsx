/* eslint-disable no-unused-vars */
// todo: need contact with value
import { Cascader } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { useStores } from '../../../../../hooks/useStores';
import { charBaseAttributes } from '../../../../common/form-config';
import { Attribute } from '../../../../common/interface';
import { characterOptions } from '../../../../common/options';
import { AttrCode } from '../../../../common/type-code';
import InputNumberBox from '../../../../components/InputNumberBox/InputNumberBox';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { GridContainer, InputBox, InputTitle } from '../../style/index.style';

export default observer(function CharacterBasePanel() {
  const { attributesStore } = useStores();
  const { charBaseAttrList, setCharBaseAttrList, setChar, charSelectedKey } =
    attributesStore;
  const listItems: Array<any> = [];
  charBaseAttrList.forEach((value: Attribute, key: AttrCode) =>
    listItems.push(
      <InputNumberBox
        key={key}
        title={value.title}
        size={'middle'}
        onChange={(v: number) => {
          setCharBaseAttrList(
            new Map([
              ...charBaseAttrList,
              [
                key,
                {
                  ...value,
                  value: v,
                },
              ],
            ]),
          );
        }}
        type={value.valueType}
        disable={true}
        value={value.value}></InputNumberBox>,
    ),
  );
  return (
    <NormalFrame
      mainTitle="人物属性配置"
      describe="人物的基础面板，默认 90 级"
      content={
        <GridContainer minWidth="150px" gridGap="20px">
          <InputBox width="100%" height="55px">
            <InputTitle>{'人物选择'}</InputTitle>
            <Cascader
              options={characterOptions}
              style={{ width: '100%' }}
              value={charSelectedKey}
              onChange={(v: any) => {
                setChar(v);
              }}
              placeholder={'请选择'}
            />
          </InputBox>
          {listItems}
        </GridContainer>
      }></NormalFrame>
  );
});
