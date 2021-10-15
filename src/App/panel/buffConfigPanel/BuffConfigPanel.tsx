/* eslint-disable no-unused-vars */
import './BuffConfigPanel.css';

import { CloseOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, List, Popconfirm, Select, Space } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { CSSProperties, useEffect, useState } from 'react';

import { BuffGroupStore } from '../../../store/buffGroup';
import InputNumberForm from '../../component/inputNumberForm/InputNumberForm';

// interface FormLiteral {
//   title: string;
// }

export enum BuffTypeCode {
  // 攻击区
  ATK_PLUS,
  ATK_PERCENT,
  DEF_PLUS,
  DEF_PERCENT,
  BLOOD_PLUS,
  BLOOD_PERCENT,
  // 元素反应区
  RECHARGE_PERCENT, // 元素充能效率
  PROFICIENT_PLUS, // 元素精通
  OVERLOAD, // 超载增强
  COMBUSTION, // 燃烧增强
  INDUCTION, // 感电增强
  SUPERCONDUCT, // 超导增强
  DIFFUSION_THUNDER, // 扩散（雷）增强
  DIFFUSION_FIRE, // 扩散（火）增强
  DIFFUSION_WATER, // 扩散（水）增强
  DIFFUSION_ICE, // 扩散（冰）增强
  DIFFUSION, // 扩散增强
  EVAPORATION, // 蒸发增强
  MELT, // 融化增强
  // 双暴区
  CRIT_RATE,
  CRIT_DAMAGE,
  NORMAL_ATK_CRIT_DAMAGE, // 普通攻击
  THUMP_CRIT_DAMAGE, // 下落攻击
  FALL_ATK_CRIT_DAMAGE, // 重击
  ELEMENTAL_WARFARE_CRIT_DAMAGE, // 元素战技
  ELEMENTAL_EXPLOSION_CRIT_DAMAGE, // 元素爆发
  // 倍率区
  FIRE_DAMAGE,
  WATER_DAMAGE,
  ROCK_DAMAGE,
  WIND_DAMAGE,
  ICE_DAMAGE,
  THUNDER_DAMAGE,
  GRASS_DAMAGE,
  PHYSICS_DAMAGE,
  NORMAL_ATK_DAMAGE, // 普通攻击
  THUMP_DAMAGE, // 下落攻击
  FALL_ATK_DAMAGE, // 重击
  ELEMENTAL_WARFARE_DAMAGE, // 元素战技
  ELEMENTAL_EXPLOSION_DAMAGE, // 元素爆发
  CASE_DAMAGE, // 直接加成
}

export interface BuffType {
  code: BuffTypeCode;
  name: string;
}

export interface Buff {
  type: BuffType;
  value: number;
  productivity: number;
}

export interface BuffGroup {
  title: string;
  allProductivity: number;
  buffs: Array<Buff>;
}

export interface BuffConfigPanelProps {
  buffGroup: BuffGroup;
  index: number;
  delBuffConfig: Function;
  buffConfigChange: Function;
  buffGroupStore: BuffGroupStore;
}

const BuffConfigPanel = (props: BuffConfigPanelProps) => {
  const [active, setActive] = useState(-1);
  const [itemCss, setItemCss] = useState({
    height: 135,
    cursor: 'default',
  } as CSSProperties);
  const titleChange = (title: string) => {
    props.buffGroup.title = title;
  };
  const addNewBuff = () => {
    props.buffGroup.buffs.push({ type: buffListBased[0], value: 0, productivity: 1 });
    setActive(props.buffGroup.buffs.length);
  };
  const delItem = (index: number) => {
    props.buffGroup.buffs = props.buffGroup.buffs.filter(
      (item, index2) => index !== index2,
    );
    setActive(-1);
  };
  const itemSubmit = (index: number, updateItem: Buff) => {
    props.buffGroup.buffs[index] = updateItem;
    setActive(-1);
  };
  const saveBuffs = () => {};
  const delBuffGroup = () => {
    props.buffGroupStore.delBuffGroup(props.index);
  };
  return (
    <div className="buff-box">
      <Input
        style={{ fontSize: '1.1rem', fontWeight: 700 }}
        placeholder="请输入 buff 名称"
        maxLength={20}
        bordered={false}
        value={props.buffGroup.title}
        onChange={(e) => titleChange(e.target.value)}
      />
      <Popconfirm
        placement="top"
        title={'未收藏的buff组将会丢失，确认删除？'}
        onConfirm={delBuffGroup}
        okText="是"
        cancelText="否">
        <Button
          className="buff-box-closeButton"
          type="primary"
          shape="circle"
          size="small"
          danger
          icon={<CloseOutlined />}></Button>
      </Popconfirm>
      <div style={{ display: 'flex', margin: '8px 16px' }}>
        <div style={{ width: 68, textAlign: 'center' }}>{'总生效率'}</div>
        <InputNumber
          style={{ width: 68 }}
          size="small"
          min={0}
          max={1}
          step={0.01}
          defaultValue={1}
          onChange={(value: number) => {
            props.buffGroup.allProductivity = value;
            // props.buffConfigChange(props.buffGroup, props.index);
          }}
        />
      </div>
      <Button
        type="text"
        block
        style={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}
        onClick={() => addNewBuff()}>
        {'添加生效词条'}
      </Button>
      <List
        className={'buff-list'}
        style={{
          height: 168,
          overflow: 'auto',
          border: 'none',
        }}
        size="small"
        bordered
        dataSource={props.buffGroup.buffs}
        renderItem={(item, index) => (
          <List.Item
            className="buff-box__item"
            onClick={() => {
              if (index !== active) setActive(index);
            }}
            style={
              index === active
                ? itemCss
                : {
                    position: 'relative',
                  }
            }>
            <BuffListItem
              index={index}
              active={active}
              item={item}
              itemSubmit={itemSubmit}
              delItem={delItem}></BuffListItem>
          </List.Item>
        )}
      />
      <Button
        type="primary"
        block
        style={{ border: 'none', borderRadius: '0' }}
        className="buff-box__bottomButton"
        disabled={true}
        onClick={() => saveBuffs()}>
        {'保存至收藏夹'}
      </Button>
    </div>
  );
};

interface BuffListItemProps {
  item: Buff;
  index: number;
  active: number;
  delItem: Function;
  itemSubmit: Function;
}

const buffListBased: Array<BuffType> = [
  {
    code: BuffTypeCode.ATK_PERCENT,
    name: '攻击力/%',
  },
  {
    code: BuffTypeCode.ATK_PLUS,
    name: '攻击力/+',
  },
  {
    code: BuffTypeCode.DEF_PERCENT,
    name: '防御力/%',
  },
  {
    code: BuffTypeCode.DEF_PLUS,
    name: '防御力/+',
  },
  {
    code: BuffTypeCode.BLOOD_PERCENT,
    name: '最大生命值/%',
  },
  {
    code: BuffTypeCode.BLOOD_PLUS,
    name: '最大生命值/+',
  },
  {
    code: BuffTypeCode.FIRE_DAMAGE,
    name: '火伤加成/%',
  },
  {
    code: BuffTypeCode.GRASS_DAMAGE,
    name: '草伤加成/+',
  },
  {
    code: BuffTypeCode.FALL_ATK_DAMAGE,
    name: '下落攻击加成/%',
  },
];

function BuffListItem(props: BuffListItemProps) {
  const [buffList] = useState(buffListBased);
  const [buffCache, setBuffCache] = useState(props.item);

  if (props.index !== props.active) {
    return (
      <>
        <div
          className="item-productivity"
          style={{ width: buffCache.productivity * 100 + '%' }}></div>
        <div style={{ fontWeight: 700, zIndex: 1 }}>
          {props.item.type.name + '：' + props.item.value}
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Select
          showSearch
          style={{ width: 136, marginBottom: 5 }}
          size={'small'}
          placeholder="请选择词条类型"
          optionFilterProp="children"
          value={buffCache.type.code}
          onChange={(value: number) => {
            setBuffCache({
              type: ((): BuffType => {
                for (let x of buffList) if (x.code === value) return x;
                return buffList[0];
              })(),
              value: buffCache.value,
              productivity: buffCache.productivity,
            });
          }}
          filterOption={(input: string, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {buffList.map((item, index) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <div style={{ display: 'flex', marginBottom: 5 }}>
          <div style={{ width: 68, textAlign: 'center' }}>{'数值'}</div>
          <InputNumber
            style={{ width: 68 }}
            size="small"
            min={0}
            max={100000}
            step={0.01}
            defaultValue={0}
            value={buffCache.value}
            onChange={(value: number) => {
              setBuffCache({
                type: buffCache.type,
                value: value,
                productivity: buffCache.productivity,
              });
            }}
          />
        </div>
        <div style={{ display: 'flex', marginBottom: 5 }}>
          <div style={{ width: 68, textAlign: 'center' }}>{'生效率'}</div>
          <InputNumber
            style={{ width: 68 }}
            size="small"
            min={0}
            max={1}
            step={0.01}
            defaultValue={1}
            value={buffCache.productivity}
            onChange={(value: number) => {
              setBuffCache({
                type: buffCache.type,
                value: buffCache.value,
                productivity: value,
              });
            }}
          />
        </div>
        <Button
          type="primary"
          style={{ width: 60, marginRight: 16 }}
          danger
          size="small"
          onClick={() => {
            props.delItem(props.index);
          }}>
          {'删除'}
        </Button>
        <Button
          type="primary"
          style={{ width: 60 }}
          size="small"
          onClick={() => props.itemSubmit(props.index, buffCache)}>
          {'完成'}
        </Button>
      </div>
    );
  }
}

export default inject((stores) => stores)(observer(BuffConfigPanel));
