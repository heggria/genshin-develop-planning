/* eslint-disable no-unused-vars */
import './BuffConfigFrame.css';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, message, notification, Space } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { inject, observer } from 'mobx-react';
import React, { ElementType, useEffect, useState } from 'react';

import { BuffGroupStore } from '../../../store/buffGroup';
import { AtkTypeCode, ElementClassCode, ReactionTypeCode } from '../../common/Attribute';
import BuffConfigPanel, { BuffGroup } from '../../panel/buffConfigPanel/BuffConfigPanel';
import SkillBoxPanel, { SingleAttack } from '../../panel/skillBoxPanel/SkillBoxPanel';
import SkillDetailPanel from '../../panel/skillDetailPanel/SkillDetailPanel';
import NormalFrame from '../normalFrame/normalFrame';

interface BuffConfigFrameProps {
  attacks: Array<SingleAttack>;
  changeAttack: Function;
}

const BuffConfigFrame = (props: BuffConfigFrameProps) => {
  const [skillDetailPanelVisible, setSkillDetailPanelVisible] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const inputChange = (e: any) => {
    let cache = { ...props.attacks[0] };
    console.log(cache);
    cache.title = e.target.value;
    props.changeAttack([cache]);
  };

  return (
    <>
      <NormalFrame
        mainTitle="技能与攻击方式配置"
        describe="自由搭配技能释放和攻击方式，计算结果为本攻击组合的期望总伤，点击下面添加按钮添加技能预设"
        content={
          <>
            <SkillBoxPanel
              singleAttack={props.attacks[0]}
              showDrawer={() => {
                setSkillDetailPanelVisible(true);
              }}></SkillBoxPanel>
            <SkillDetailPanel
              initData={props.attacks}
              changeAttack={props.changeAttack}
              visible={skillDetailPanelVisible}
              setVisible={setSkillDetailPanelVisible}
              dataIndex={0}></SkillDetailPanel>
          </>
        }></NormalFrame>
    </>
  );
};

export default inject((stores) => stores)(observer(BuffConfigFrame));
