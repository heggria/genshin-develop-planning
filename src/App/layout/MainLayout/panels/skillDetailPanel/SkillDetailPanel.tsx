/* eslint-disable no-unused-vars */
import {
  Button,
  Divider,
  Drawer,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Radio,
  Select,
  Space,
} from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useStores } from '../../../../../hooks/useStores';
import { SingleAttack } from '../../../../common/interface';
import {
  atkTypeOptions,
  elementTypeOptions,
  reactionTypeCodeOptions,
} from '../../../../common/options';
import {
  AtkTypeCode,
  ElementTypeCode,
  ReactionTypeCode,
} from '../../../../common/type-code';
import { boldFont, fontSize1 } from '../../style/common.style';
import { AddButton, InputBox, InputTitle } from '../../style/index.style';

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
  const atkTypeChange = (value: AtkTypeCode) => {
    for (let item of atkTypeOptions) {
      if (value === item.value) {
        setAtkData({ ...atkData, atkType: item.value });
      }
    }
  };
  const elementTypeChange = (value: ElementTypeCode) => {
    for (let item of elementTypeOptions) {
      if (value === item.value) {
        setAtkData({ ...atkData, elementType: item.value });
      }
    }
  };
  const reactionTypeChange = (value: ReactionTypeCode) => {
    for (let item of reactionTypeCodeOptions) {
      if (value === item.value) {
        setAtkData({ ...atkData, reactionType: item.value });
      }
    }
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
        <SkillDetailContainer>
          <Divider>基础配置</Divider>
          <InputBox>
            <InputTitle>攻击方式</InputTitle>
            <Select
              options={atkTypeOptions}
              style={{ width: '100%' }}
              value={atkData?.atkType}
              onChange={atkTypeChange}
            />
          </InputBox>
          <InputBox>
            <InputTitle>元素类型</InputTitle>
            <Select
              options={elementTypeOptions}
              style={{ width: '100%' }}
              value={atkData?.elementType}
              onChange={elementTypeChange}
            />
          </InputBox>
          <InputBox>
            <InputTitle>反应类型</InputTitle>
            <Select
              options={reactionTypeCodeOptions}
              style={{ width: '100%' }}
              value={atkData?.reactionType}
              onChange={reactionTypeChange}
            />
          </InputBox>
          <InputBox>
            <InputTitle>技能倍率</InputTitle>
            <InputNumber
              defaultValue={100}
              min={0}
              max={99999}
              step={0.01}
              value={atkData?.damageMultiplier}
              style={{ width: '100%' }}
              formatter={(value) => `${value}%`}
              parser={(value: any) =>
                parseFloat(parseFloat(value.replace('s', '')).toFixed(2))
              }
              onChange={(value: number) => {
                setAtkData({
                  ...atkData,
                  damageMultiplier: value,
                });
              }}
            />
          </InputBox>
          <InputBox>
            <InputTitle>花费时间</InputTitle>
            <InputNumber
              min={0}
              max={99999}
              step={0.01}
              value={atkData?.costTime}
              style={{ width: '100%' }}
              formatter={(value) => `${value}s`}
              parser={(value: any) =>
                parseFloat(parseFloat(value.replace('s', '')).toFixed(2))
              }
              onChange={(value: number) => {
                setAtkData({
                  ...atkData,
                  costTime: value,
                });
              }}
            />
          </InputBox>
          <InputBox>
            <InputTitle>命中率</InputTitle>
            <InputNumber
              min={0}
              max={100}
              step={0.01}
              value={atkData?.hitRate}
              style={{ width: '100%' }}
              formatter={(value) => `${value}%`}
              parser={(value: any) =>
                parseFloat(parseFloat(value.replace('%', '')).toFixed(2))
              }
              onChange={(value: number) => {
                setAtkData({
                  ...atkData,
                  hitRate: value,
                });
              }}
            />
          </InputBox>
          <Divider>附加 Buff 配置</Divider>
          <AddButton width="100%" height="100px" role="button" tabIndex={0}>
            点击添加本次攻击中可能生效的 Buff
            <br />
            请先在主页面下方的「 Buff 配置区」配置 Buff
            <br />
            Buff 具体是否生效受 Buff 配置下方的按钮控制
          </AddButton>
        </SkillDetailContainer>
      </Drawer>
    </>
  );
});

const SkillDetailContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
