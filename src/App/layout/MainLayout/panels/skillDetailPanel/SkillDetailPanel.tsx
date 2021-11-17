/* eslint-disable no-unused-vars */
import { Button, Drawer, Input, message, Popconfirm, Space } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { useStores } from '../../../../../hooks/useStores';
import { SingleAttack } from '../../../../common/interface';

interface SkillDetailPanelProps {
  dataIndex: number;
  visible: boolean;
  closeDrawer: Function;
}

export default observer(function SkillDetailPanel(props: SkillDetailPanelProps) {
  const { skillConfigStore } = useStores();
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [atkData, setAtkData] = useState<SingleAttack>(
    skillConfigStore.skillList[props.dataIndex],
  );

  // use ref to set data cache
  // .current is init data
  // const propsRef = useRef(props.initData);

  useEffect(() => {
    if (props.dataIndex !== -1) setAtkData(skillConfigStore.skillList[props.dataIndex]);
    else setAtkData({} as SingleAttack);
  }, [skillConfigStore.skillList, props.dataIndex]);
  const onClose = () => {
    props.closeDrawer();
  };
  const onSave = () => {
    onClose();
    if (atkData.title !== '') {
      message.success('保存成功！', 1);
    } else {
      setAtkData({ ...atkData, title: '未命名' });
      message.success('保存成功！您未填写技能名称，已自动设置为“未命名”。', 1);
    }
    skillConfigStore.changeSkillList(atkData, props.dataIndex);
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
            value={atkData?.title}
            onChange={inputChange}
          />
        }
        placement={placement}
        width={400}
        onClose={onClose}
        visible={props.visible}
        extra={
          <Space>
            <Popconfirm
              placement="bottom"
              title={'未收藏的技能将会丢失，确认删除？'}
              onConfirm={() => {
                onClose();
                skillConfigStore.delSkillList(props.dataIndex);
              }}
              okText="是"
              cancelText="否">
              <Button danger>{'删除'}</Button>
            </Popconfirm>
            <Button type="primary" onClick={onSave}>
              {'保存'}
            </Button>
          </Space>
        }>
        {'xxxxxxxx'}
      </Drawer>
    </>
  );
});
