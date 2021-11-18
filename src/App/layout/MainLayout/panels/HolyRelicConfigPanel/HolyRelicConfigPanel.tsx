/* eslint-disable no-unused-vars */
import { InputNumber, Switch } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Attributes, Value } from '../../../../common/interface';
import { AttributesTypeCode, ValueTypeCode } from '../../../../common/type-code';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { fontSize3, gray5 } from '../../style/common.style';
import { InputBox, InputTitle } from '../../style/index.style';

export default observer(function HolyRelicConfigPanel() {
  const [value, setValue] = useState(false);
  return (
    <NormalFrame
      mainTitle="圣遗物配置"
      describe="快速配置圣遗物总体属性，或者详细配置每个圣遗物，切换为详细模式时属性栏会自动计算"
      content={
        <>
          <Switch
            checkedChildren={'详细配置生效中'}
            unCheckedChildren={'快速配置生效中'}
            checked={value}
            style={{ margin: '5px 0' }}
            onChange={(checked) => {
              setValue(checked);
            }}
          />
          <FlexArea>
            <Area style={{ border: 'none', maxWidth: '391px' }}>
              <AreaTitle>总加成属性</AreaTitle>
              <AreaContainer>
                {holyRelicAttributes.map((element: Attributes, index: number) => (
                  <InputNumberBox
                    key={index}
                    title={element.title}
                    onChange={(v: number) => {
                      element.extra.value = v;
                      console.log(111111);
                    }}
                    value={element.extra.value}></InputNumberBox>
                ))}
              </AreaContainer>
            </Area>
            <Area style={{ minWidth: '50%', display: value ? '' : 'none' }}>
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

interface InputNumberBoxProps {
  disable?: boolean;
  title: string;
  type?: string;
  value: number;
  onChange: (value: number) => void;
}

const holyRelicAttributes = [
  {
    code: AttributesTypeCode.BLOOD,
    title: '生命值上限',
    extra: {
      type: ValueTypeCode.NUMBER,
      value: 0,
    },
  },
  {
    code: AttributesTypeCode.BLOOD,
    title: '生命值上限',
    extra: {
      type: ValueTypeCode.NUMBER,
      value: 0,
    },
  },
];

const InputNumberBox = (props: InputNumberBoxProps) => {
  return (
    <InputBox width="100%" height="55px">
      <InputTitle>{props.title}</InputTitle>
      <InputNumber
        defaultValue={0}
        min={0}
        max={99999}
        step={0.01}
        size={'small'}
        disabled={props.disable}
        value={props.value}
        style={{ width: '100%' }}
        formatter={props.type === 'percent' ? (value) => `${value}%` : undefined}
        parser={(value: any) =>
          parseFloat(
            parseFloat(props.type === 'percent' ? value.replace('%', '') : value).toFixed(
              2,
            ),
          )
        }
        onChange={props.onChange}
      />
    </InputBox>
  );
};

const AreaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
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
  padding: 0 15px;
  flex: 1 1 auto;
`;
const FlexArea = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: center;
`;

const HolyRelicBox = styled.div`
  flex: 1 1 200px;
  background-color: ${gray5};
  height: 150px;
  margin: 10px;
`;
