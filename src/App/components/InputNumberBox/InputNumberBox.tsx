/* eslint-disable no-unused-vars */
import { InputNumber } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import { ValueTypeCode } from '../../common/type-code';
import { InputBox, InputTitle } from '../../layout/MainLayout/style/index.style';

interface InputNumberBoxProps {
  disable?: boolean;
  title: string;
  type?: ValueTypeCode;
  value: number;
  size?: SizeType;
  onChange: (value: number) => void;
}

const InputNumberBox = (props: InputNumberBoxProps) => {
  return (
    <InputBox width="100%" height="55px">
      <InputTitle>{props.title}</InputTitle>
      <InputNumber
        defaultValue={0}
        min={0}
        max={99999}
        step={0.01}
        size={props.size || 'small'}
        disabled={props.disable}
        value={props.value}
        style={{ width: '100%' }}
        formatter={
          props.type === ValueTypeCode.PERCENT
            ? (value) => `${value}%`
            : (value) => `${value}`
        }
        parser={(value: any) =>
          parseFloat(
            parseFloat(
              props.type === ValueTypeCode.PERCENT ? value.replace('%', '') : value,
            ).toFixed(2),
          )
        }
        onChange={props.onChange}
      />
    </InputBox>
  );
};

export default InputNumberBox;
