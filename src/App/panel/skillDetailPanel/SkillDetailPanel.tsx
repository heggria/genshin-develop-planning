/* eslint-disable no-unused-vars */
import './SkillDetailPanel.css';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, message, notification, Space } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { inject, observer } from 'mobx-react';
import React, { ElementType, useEffect, useState } from 'react';

import { BuffGroupStore } from '../../../store/buffGroup';
import { AtkTypeCode, ElementClassCode, ReactionTypeCode } from '../../common/Attribute';
import BuffConfigPanel, { BuffGroup } from '../../panel/buffConfigPanel/BuffConfigPanel';
import SkillBoxPanel, { SingleAttack } from '../../panel/skillBoxPanel/SkillBoxPanel';

interface SkillDetailPanelProps {
  initData: Array<SingleAttack>;
  changeAttack: Function;
  dataIndex: number;
  visible: boolean;
  setVisible: Function;
}

const SkillDetailPanel = (props: SkillDetailPanelProps) => {
  const [atkData, setAtkData] = useState(props.initData);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const showDrawer = () => {
    // notification.open({
    //   message: '操作提示',
    //   description: '您打开了一个即时保存的抽屉，请随意编辑。',
    //   placement: 'bottomRight',
    // });
    props.setVisible(true);
  };
  const onClose = () => {
    props.setVisible(false);
  };
  const inputChange = (e: any) => {
    let cache = atkData;
    cache[props.dataIndex].title = e.target.value;
    setAtkData(cache);
    console.log(atkData[props.dataIndex].title);
  };

  return (
    <>
      <Drawer
        title={
          <Input
            style={{ fontWeight: 700, fontSize: '1.2rem' }}
            placeholder="未命名"
            bordered={false}
            value={atkData[props.dataIndex].title}
            onChange={inputChange}
          />
        }
        placement={placement}
        width={400}
        onClose={onClose}
        visible={props.visible}
        extra={
          <Space>
            <Button onClick={onClose}>{'取消'}</Button>
            <Button type="primary" onClick={onClose}>
              {'保存'}
            </Button>
          </Space>
        }>
        {' '}
      </Drawer>
      <p>技能连招预设，生效 Buff，攻击类型，命中率，伤害类型，反应类型，所花时间</p>
    </>
  );
};

export default inject((stores) => stores)(observer(SkillDetailPanel));
