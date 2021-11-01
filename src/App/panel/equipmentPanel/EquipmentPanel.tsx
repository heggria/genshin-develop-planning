/* eslint-disable no-unused-vars */
import './EquipmentPanel.css';

import { Observer, useLocalStore } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import store from '../../../store';
import InputNumberForm from '../../component/inputNumberForm/InputNumberForm';

interface AttributeInputPanelProps {
  title: string;
}

function EquipmentPanel(props: AttributeInputPanelProps) {
  return <div className="input-box"></div>;
}

export default EquipmentPanel;
