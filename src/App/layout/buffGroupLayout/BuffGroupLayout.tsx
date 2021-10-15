/* eslint-disable no-unused-vars */
import './BuffGroupLayout.css';

import { PlusOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { BuffGroupStore } from '../../../store/buffGroup';
import NormalFrame from '../../frame/normalFrame/normalFrame';
import BuffConfigPanel from '../../panel/buffConfigPanel/BuffConfigPanel';

const BuffGroupFrame = ({ buffGroupStore }: { buffGroupStore: BuffGroupStore }) => {
  const addClick = () =>
    buffGroupStore.addBuffGroup({
      collected: false,
      available: true,
      title: '',
      buffs: [],
      allProductivity: 1,
    });
  return (
    <NormalFrame
      mainTitle="Buff 配置"
      describe="配置你想要生效的各种 Buff , 将会影响到最终收益"
      content={
        <>
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
            onClick={addClick}
            onKeyDown={addClick}>
            <PlusOutlined />
          </div>
        </>
      }></NormalFrame>
  );
};

export default inject((stores) => stores)(observer(BuffGroupFrame));
