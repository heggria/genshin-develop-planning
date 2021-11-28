/* eslint-disable no-unused-vars */
import './BuffConfigBox.css';

import { CloseOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, List, Popconfirm, Select, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { CSSProperties, useState } from 'react';

import { useStores } from '../../../../../hooks/useStores';
import { BuffGroupStore } from '../../../../../store/buffGroup';
import { Buff, BuffGroup, BuffType } from '../../../../common/interface';
import { dependAttrMap, dependAttrOptions } from '../../../../common/options';

interface BuffListItemProps {
  item: Buff;
  index: number;
  active: number;
  delItem: Function;
  itemSubmit: Function;
  buffGroupStore: BuffGroupStore;
}

const BuffListItem = inject((stores) => stores)(
  observer((props: BuffListItemProps) => {
    const [buffCache, setBuffCache] = useState(props.item);

    if (props.index !== props.active) {
      return (
        <>
          <div
            className="item-productivity"
            style={{ width: buffCache.productivity * 100 + '%' }}></div>
          <div
            style={{ fontWeight: 700, zIndex: 1, display: 'flex', flexFlow: 'row wrap' }}>
            <div>
              {props.item.type.name.replace('加成', '') +
                '：' +
                (props.item.depend !== 'none' ? '等于当前' : '')}
            </div>
            <div>
              {props.item.depend !== 'none'
                ? dependAttrMap.get(props.item.depend) + '的 ' + props.item.value + '%'
                : props.item.value +
                  props.item.type.name
                    .slice(
                      props.item.type.name.lastIndexOf('/') + 1,
                      props.item.type.name.length,
                    )
                    .replace('+', '')}
            </div>
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
            showArrow={false}
            onChange={(value) => {
              setBuffCache({
                ...buffCache,
                type: ((): BuffType => {
                  for (let x of props.buffGroupStore.buffListBased)
                    if (x.code === value) return x;
                  return props.buffGroupStore.buffListBased[0];
                })(),
              });
            }}
            filterOption={(input: string, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {props.buffGroupStore.buffListBased.map((item, index) => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <div style={{ width: 136, marginBottom: 5, textAlign: 'center' }}>
            {'依赖于'}
          </div>
          <Select
            showSearch
            style={{ width: 136, marginBottom: 5 }}
            size={'small'}
            optionFilterProp="children"
            options={dependAttrOptions}
            value={buffCache.depend}
            showArrow={false}
            onChange={(value) => {
              setBuffCache({
                ...buffCache,
                value: 0,
                depend: value,
              });
            }}
            filterOption={(input: string, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }></Select>

          <div style={{ display: 'flex', marginBottom: 5 }}>
            <div style={{ width: 68, textAlign: 'center' }}>
              {buffCache.depend === 'none' ? '数值' : '倍率/%'}
            </div>
            <InputNumber
              style={{ width: 68 }}
              size="small"
              min={0}
              max={100000}
              step={0.01}
              defaultValue={0}
              controls={false}
              value={buffCache.value}
              onChange={(value: number) => {
                setBuffCache({
                  ...buffCache,
                  value: value,
                });
              }}
            />
          </div>
          {/* <div style={{ display: 'flex', marginBottom: 5 }}>
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
          </div> */}
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
  }),
);

export interface BuffConfigPanelProps {
  buffGroup: BuffGroup;
  index: number;
}

export default observer(function BuffConfigPanel(props: BuffConfigPanelProps) {
  const { buffGroupStore } = useStores();
  const [active, setActive] = useState(-1);
  const [itemCss, setItemCss] = useState({
    height: 167,
    cursor: 'default',
  } as CSSProperties);
  const titleChange = (title: string) => {
    props.buffGroup.title = title;
  };
  const addNewBuff = () => {
    props.buffGroup.buffs.push({
      type: buffGroupStore.buffListBased[0],
      value: 0,
      productivity: 1,
      depend: 'none',
    });
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
  const exchangeAvailable = () => {
    props.buffGroup.available = !props.buffGroup.available;
  };
  const delBuffGroup = () => {
    buffGroupStore.delBuffGroup(props.index);
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
      <Button
        className="buff-box-closeButton"
        style={{ top: 18 }}
        type="default"
        shape="circle"
        size="small"
        icon={
          !props.buffGroup.collected ? (
            <Tooltip title="收藏">
              <StarOutlined />
            </Tooltip>
          ) : (
            <Tooltip title="取消收藏">
              <StarFilled style={{ color: '#F5BF01' }} />
            </Tooltip>
          )
        }
        onClick={() => {
          props.buffGroup.collected = !props.buffGroup.collected;
        }}></Button>
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
              delItem={delItem}
              buffGroupStore={buffGroupStore}></BuffListItem>
          </List.Item>
        )}
      />
      {props.buffGroup.available ? (
        <Button
          type="primary"
          block
          style={{ border: 'none', borderRadius: '0' }}
          className="buff-box__bottomButton"
          // disabled={true}
          onClick={() => exchangeAvailable()}>
          {'生效中'}
        </Button>
      ) : (
        <Button
          type="primary"
          block
          style={{ border: 'none', borderRadius: '0' }}
          className="buff-box__bottomButton"
          danger
          // disabled={true}
          onClick={() => exchangeAvailable()}>
          {'已禁用'}
        </Button>
      )}
      {/* <Button
        type="primary"
        block
        style={{ border: 'none', borderRadius: '0' }}
        className="buff-box__bottomButton"
        disabled={true}
        onClick={() => saveBuffs()}>
        {'保存至收藏夹'}
      </Button> */}
    </div>
  );
});
