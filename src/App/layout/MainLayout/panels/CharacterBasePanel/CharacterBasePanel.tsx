/* eslint-disable no-unused-vars */
// todo: need contact with value
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { useStores } from '../../../../../hooks/useStores';
import { charBaseAttributes } from '../../../../common/form-config';
import { Attribute } from '../../../../common/interface';
import { AttrCode } from '../../../../common/type-code';
import InputNumberBox from '../../../../components/InputNumberBox/InputNumberBox';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { GridContainer } from '../../style/index.style';

export default observer(function CharacterBasePanel() {
  const { attributesStore } = useStores();
  const { charBaseAttributesList, setCharBaseAttributesList } = attributesStore;
  const listItems: Array<any> = [];
  charBaseAttributesList.forEach((value: Attribute, key: AttrCode) =>
    listItems.push(
      <InputNumberBox
        key={key}
        title={value.title}
        size={'middle'}
        onChange={(v: number) => {
          setCharBaseAttributesList(
            new Map([
              ...charBaseAttributesList,
              [
                key,
                {
                  title: value.title,
                  extra: {
                    ...value.extra,
                    value: v,
                  },
                },
              ],
            ]),
          );
        }}
        type={value.extra.valueType}
        value={value.extra.value}></InputNumberBox>,
    ),
  );
  return (
    <NormalFrame
      mainTitle="人物属性配置"
      describe="人物的基础面板，注意是无任何加成的"
      content={
        <GridContainer minWidth="150px" gridGap="20px">
          {listItems}
        </GridContainer>
      }></NormalFrame>
  );
});
