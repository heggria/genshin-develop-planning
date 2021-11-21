/* eslint-disable no-unused-vars */
// todo: need contact with value
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { useStores } from '../../../../../hooks/useStores';
import { weaponBaseAttributes } from '../../../../common/form-config';
import { Attribute } from '../../../../common/interface';
import { AttributesCode } from '../../../../common/type-code';
import InputNumberBox from '../../../../components/InputNumberBox/InputNumberBox';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { GridContainer } from '../../style/index.style';

export default observer(function WeaponBasePanel() {
  const { attributesStore } = useStores();
  const { weaponBaseAttributesList, setWeaponBaseAttributesList } = attributesStore;

  const listItems: Array<any> = [];
  weaponBaseAttributesList.forEach((value: Attribute, key: AttributesCode) =>
    listItems.push(
      <InputNumberBox
        key={key}
        title={value.title}
        size={'middle'}
        onChange={(v: number) => {
          setWeaponBaseAttributesList(
            new Map([
              ...weaponBaseAttributesList,
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
      mainTitle="武器属性配置"
      describe="武器的基础面板"
      content={
        <GridContainer minWidth="150px" gridGap="20px">
          {listItems}
        </GridContainer>
      }></NormalFrame>
  );
});
