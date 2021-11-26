/* eslint-disable no-unused-vars */
import { Select, Switch } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useStores } from '../../../../../hooks/useStores';
import {
  holyRelicAllList,
  holyRelicTotalAttributes,
} from '../../../../common/form-config';
import { Attribute } from '../../../../common/interface';
import { mainEntryOptions, SelectOption } from '../../../../common/options';
import { AttrCode, HolyRelicTypeCode } from '../../../../common/type-code';
import InputNumberBox from '../../../../components/InputNumberBox/InputNumberBox';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { fontSize3, gray5 } from '../../style/common.style';
import { InputBox, InputTitle } from '../../style/index.style';

const { Option } = Select;

interface HRSelectProps {
  title: string;
  holyRelicKey: HolyRelicTypeCode;
  disabled: boolean;
}

const HRSelect = (props: HRSelectProps) => {
  const { attributesStore } = useStores();
  const { holyRelicList, setHolyRelicList } = attributesStore;
  return (
    <InputBox width="100%" height="55px" hidden={props.disabled}>
      <InputTitle>{props.title}</InputTitle>
      <Select
        style={{ width: '100%' }}
        placeholder="请选择"
        showArrow={false}
        value={holyRelicList.get(props.holyRelicKey)?.mainAttrType}
        onChange={(value: AttrCode) => {
          setHolyRelicList(
            props.holyRelicKey,
            holyRelicAllList
              .get(props.holyRelicKey)
              ?.filter((item) => item.mainAttrType === value)[0],
          );
        }}>
        {mainEntryOptions.get(props.holyRelicKey)?.map((item: SelectOption<AttrCode>) => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </InputBox>
  );
};

export default observer(function HolyRelicConfigPanel() {
  const [disabled, setDisabled] = useState(false);
  const { attributesStore } = useStores();
  const { holyRelicAttrList, setHolyRelicAttrList } = attributesStore;

  const [holyRelicAttributes2, setHolyRelicAttributes2] = useState(
    new Map([...holyRelicTotalAttributes]),
  );

  const holyRelicAttributesInputs: Array<any> = [];
  if (!disabled) {
    holyRelicAttrList.forEach((value: Attribute, key: AttrCode) =>
      holyRelicAttributesInputs.push(
        <InputNumberBox
          key={key}
          title={value.title}
          size={'middle'}
          onChange={(v: number) => {
            setHolyRelicAttrList(
              new Map([
                ...holyRelicAttrList,
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
          disable={disabled}
          value={value.value}></InputNumberBox>,
      ),
    );
  } else {
    holyRelicAttributes2.forEach((value: Attribute, key: AttrCode) =>
      holyRelicAttributesInputs.push(
        <InputNumberBox
          key={key}
          title={value.title}
          onChange={(v: number) => {
            setHolyRelicAttributes2(
              (prev) =>
                new Map([
                  ...prev,
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
          disable={disabled}
          value={value.value}></InputNumberBox>,
      ),
    );
  }
  return (
    <NormalFrame
      mainTitle="圣遗物配置"
      describe="快速配置圣遗物总体属性（默认均为 +20 圣遗物），或者详细配置每个圣遗物，切换为详细模式时属性栏会全部自动计算"
      content={
        <>
          <Switch
            checkedChildren={'详细配置生效中'}
            unCheckedChildren={'快速配置生效中'}
            checked={disabled}
            style={{ margin: '5px 0' }}
            onChange={(checked) => {
              setDisabled(checked);
            }}
          />
          <FlexArea>
            <Area
              style={{
                border: 'none',
                maxWidth: disabled ? '200px' : undefined,
              }}>
              <AreaTitle>总加成属性</AreaTitle>
              <AreaContainer style={{ gridGap: disabled ? '5px' : '20px' }}>
                <HRSelect
                  disabled={disabled}
                  holyRelicKey={'hourglass'}
                  title={'沙漏主属性'}
                />
                <HRSelect disabled={disabled} holyRelicKey={'cup'} title={'杯子主属性'} />
                <HRSelect disabled={disabled} holyRelicKey={'hat'} title={'帽子主属性'} />
                {holyRelicAttributesInputs}
              </AreaContainer>
            </Area>
            <Area style={{ minWidth: '50%', display: disabled ? '' : 'none' }}>
              <AreaTitle>圣遗物</AreaTitle>
              <AreaContainer>
                <HolyRelicBox></HolyRelicBox>
                <HolyRelicBox></HolyRelicBox>
                <HolyRelicBox></HolyRelicBox>
                <HolyRelicBox></HolyRelicBox>
                <HolyRelicBox></HolyRelicBox>
              </AreaContainer>
            </Area>
          </FlexArea>
        </>
      }></NormalFrame>
  );
});

const AreaContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;
  grid-auto-columns: 80px;
`;

const AreaTitle = styled.div`
  text-align: center;
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: ${fontSize3};
  margin: 15px 0;
  font-weight: bold;
`;

const Area = styled.div`
  border-left: 1px ${gray5} dashed;
  padding: 0 10px;
  flex: 1 1 auto;
`;
const FlexArea = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: center;
`;

const HolyRelicBox = styled.div`
  flex: 1 1 250px;
  background-color: ${gray5};
  height: 150px;
  margin: 10px;
`;
