/* eslint-disable no-unused-vars */
import './SkillDetailPanel.css';

import { Button, Drawer, Input, message, Space } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { SingleAttack } from '../../panel/skillBoxPanel/SkillBoxPanel';

interface SkillDetailPanelProps {
  initData: Array<SingleAttack>;
  changeAttack: Function;
  dataIndex: number;
  visible: boolean;
  setVisible: Function;
}

export default observer(function SkillDetailPanel(props: SkillDetailPanelProps) {
  const [atkData, setAtkData] = useState<SingleAttack>(props.initData[props.dataIndex]);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  // use ref to set data cache
  // .current is init data
  // const propsRef = useRef(props.initData);

  // useEffect(() => {
  //   setAtkData(props.initData[props.dataIndex]);
  //   console.log(props.initData);
  // }, [props.initData[props.dataIndex].title]);

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
  const onSave = () => {
    props.setVisible(false);
    props.changeAttack(atkData, 0);
    message.success('保存成功！', 1);
  };
  const inputChange = (e: any) => {
    setAtkData({ ...atkData, title: e.target.value });
  };

  return (
    <>
      <Drawer
        title={
          <Input
            style={{ fontWeight: 700, fontSize: '1.2rem' }}
            placeholder="未命名"
            bordered={false}
            value={atkData.title}
            onChange={inputChange}
          />
        }
        placement={placement}
        width={400}
        onClose={onClose}
        visible={props.visible}
        extra={
          <Space>
            {/* <Button onClick={onClose}>{'取消'}</Button> */}
            <Button type="primary" onClick={onSave}>
              {'保存'}
            </Button>
          </Space>
        }>
        {'xxxxxxxx'}
      </Drawer>
      <p>技能连招预设，生效 Buff，攻击类型，命中率，伤害类型，反应类型，所花时间</p>
    </>
  );
});
