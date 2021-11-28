/* eslint-disable no-unused-vars */
// todo: need contact with value
import { Cascader, Select } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '../../../../../hooks/useStores';
import { Attribute } from '../../../../common/interface';
import { AttrCode } from '../../../../common/type-code';
import InputNumberBox from '../../../../components/InputNumberBox/InputNumberBox';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { GridContainer, InputBox, InputTitle } from '../../style/index.style';

export default observer(function WeaponBasePanel() {
  const { attributesStore } = useStores();
  const {
    weaponBaseAttrList,
    setWeaponBaseAttrList,
    setWeapon,
    weaponSelectedKey,
    weaponOptions,
  } = attributesStore;

  const listItems: Array<any> = [];
  weaponBaseAttrList.forEach((value: Attribute, key: AttrCode) =>
    listItems.push(
      <InputNumberBox
        key={key}
        title={value.title}
        size={'middle'}
        onChange={(v: number) => {
          setWeaponBaseAttrList(
            new Map([
              ...weaponBaseAttrList,
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
        value={value.value}
        disable={true}></InputNumberBox>,
    ),
  );
  return (
    <NormalFrame
      mainTitle="武器属性配置"
      describe="武器的基础面板，默认 90 级"
      content={
        <GridContainer minWidth="150px" gridGap="20px">
          <InputBox width="100%" height="55px">
            <InputTitle>{'人物选择'}</InputTitle>
            <Select
              options={weaponOptions}
              style={{ width: '100%' }}
              value={weaponSelectedKey}
              onChange={(v: string) => {
                console.log(v);
                setWeapon(v);
              }}
              placeholder={'请选择'}
            />
          </InputBox>
          {listItems}
        </GridContainer>
      }></NormalFrame>
  );
});
