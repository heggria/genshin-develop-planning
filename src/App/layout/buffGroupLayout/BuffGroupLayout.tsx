/* eslint-disable no-unused-vars */
import './BuffGroupLayout.css';

import { PlusOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { BuffGroupStore } from '../../../store/buffGroup';
import BuffConfigPanel from '../../panel/buffConfigPanel/BuffConfigPanel';

const BuffGroupLayout = ({ buffGroupStore }: { buffGroupStore: BuffGroupStore }) => {
  return (
    <div className="buff-group-box">
      <div>
        <h2 className="layout-header__title">{'Buff 配置'}</h2>
      </div>
      <div className="layout-header__des">
        {'配置你想要生效的各种 Buff , 将会影响到最终收益'}
      </div>
      <div className="buff-group-layout">
        {buffGroupStore.buffGroupsData.map((item: any, index: any) => (
          <BuffConfigPanel
            key={index}
            buffGroup={item}
            index={index}
            buffConfigChange={buffGroupStore.changeBuffGroups}
            delBuffConfig={buffGroupStore.delBuffGroup}
            buffGroupStore={buffGroupStore}></BuffConfigPanel>
        ))}
        <div
          role="button"
          tabIndex={0}
          className="add-div"
          onClick={() =>
            buffGroupStore.addBuffGroup({
              collected: false,
              available: true,
              title: '',
              buffs: [],
              allProductivity: 1,
            })
          }
          onKeyDown={() =>
            buffGroupStore.addBuffGroup({
              collected: false,
              available: true,
              title: '',
              buffs: [],
              allProductivity: 1,
            })
          }>
          <PlusOutlined />
        </div>
      </div>
    </div>
  );
};

export default inject((stores) => stores)(observer(BuffGroupLayout));
