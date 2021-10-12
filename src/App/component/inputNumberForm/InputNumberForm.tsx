/* eslint-disable no-unused-vars */
import './InputNumberForm.css';

import { InputNumber } from 'antd';
import { Observer, useLocalStore } from 'mobx-react';
import React, { useEffect, useState } from 'react';

interface InputNumberFormProps {
  title: string;
  min: number;
  max: number;
  defaultValue: number;
}

// 数字输入 flex div
function InputNumberForm(props: InputNumberFormProps) {
  const title = props.title;
  const min = props.min;
  const max = props.max;
  const defaultValue = props.defaultValue;
  const onChange = (value: number) => {
    console.log('changed', value);
  };
  return (
    <div className="inputNumberForm">
      <div className="input__title">{title}</div>
      <InputNumber min={min} max={max} defaultValue={defaultValue} onChange={onChange} />
    </div>
  );
}

export default InputNumberForm;
