/* eslint-disable no-unused-vars */
import './SkillBoxPanel.css';

import {
  CloseOutlined,
  MinusOutlined,
  MoreOutlined,
  SettingOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

import { AtkTypeCode, ElementClassCode, ReactionTypeCode } from '../../common/Attribute';
import { BuffGroup } from '../buffConfigPanel/BuffConfigPanel';

export interface SingleAttack {
  title: string;
  damageMultiplier: number; // 倍率/%
  atkType: AtkType; // 攻击类型
  hitRate: number; // 命中率
  elementClass: ElementClass; // 伤害元素类型
  reactionType: ReactionType; // 目前只计算增幅反应
  costTime: number; // 时间
  effectiveBuff: Array<BuffGroup>; // 生效 buff
  collected: boolean;
}

export interface AtkType {
  name: string;
  code: AtkTypeCode;
}

export interface ElementClass {
  name: string;
  code: ElementClassCode;
}

export interface ReactionType {
  name: string;
  code: ReactionTypeCode;
}

export interface SkillBoxPanelProps {
  id: number;

  singleAttack: SingleAttack;
  showDrawer: Function;
  delSkill: Function;
}

export default function SkillBoxPanel(props: SkillBoxPanelProps) {
  const openDrawer = () => {};
  const addToStream = () => {};
  const starSkill = () => {};
  const delSkill = () => {};
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const [topOffset, setTopOffset] = useState(0);
  const [leftOffset, setLeftOffset] = useState(0);
  const [moveable, setMoveable] = useState(false);

  // const mousemoveEvent = (e: any) => {
  //   console.log(moveable);
  //   if (moveable) {
  //     setTop((x) => (x = e.clientY - topOffset));
  //     setLeft((x) => (x = e.clientX - leftOffset));
  //   }
  //   e.stopPropagation();
  // };

  const mouseDownEvent = (e: any) => {
    setMoveable(true);
    console.log(moveable);
  };

  useEffect(() => {}, []);
  const [collectedProps, drag] = useDrag({
    type: 'SkillConfigBox',
    item: { skill: props.singleAttack },
  });
  return (
    <div style={{ position: 'relative' }}>
      <div ref={drag} className="skill-box" style={{ top: top, left: left }}>
        <Button
          className="skill-box-closeButton"
          type="primary"
          shape="circle"
          size="small"
          onClick={() => props.showDrawer()}
          icon={<SettingOutlined />}></Button>
        <Button
          className="skill-box-closeButton"
          style={{ top: 18 }}
          type="default"
          shape="circle"
          size="small"
          icon={
            !props.singleAttack.collected ? (
              <Tooltip title="收藏" mouseEnterDelay={0.5}>
                <StarOutlined />
              </Tooltip>
            ) : (
              <Tooltip title="取消收藏" mouseEnterDelay={0.5}>
                <StarFilled style={{ color: '#F5BF01' }} />
              </Tooltip>
            )
          }
          // onClick={() => {
          //   props.singleAttack.collected = !props.singleAttack.collected;
          // }}
        ></Button>
        {/* <div className="skill-box-right">
          <Button
            type="primary"
            style={{
              height: 75,
              width: 20,
              padding: 0,
              borderRadius: 0,
              cursor: 'move',
            }}
            // onDrag={(e) => mousemoveEvent(e)}
          >
            <MoreOutlined />
          </Button>
        </div> */}
        <div className="skill-box-left">
          <div className="skill-box__title">{props.singleAttack.title}</div>
          <div className="skill-box__type">
            {props.singleAttack.atkType.name +
              '-' +
              props.singleAttack.elementClass.name +
              '-' +
              props.singleAttack.reactionType.name}
          </div>
          <div className="skill-box-bottom">
            <div className="skill-box__buff">
              <Tooltip
                title={props.singleAttack.effectiveBuff}
                placement="bottom"
                mouseEnterDelay={1}>
                {'BUFF'}
              </Tooltip>
            </div>
            <div className="skill-box__multiplier">
              <Tooltip title="伤害倍率" placement="bottom" mouseEnterDelay={1}>
                {props.singleAttack.damageMultiplier + '%'}
              </Tooltip>
            </div>
            <div className="skill-box__time">
              {
                <Tooltip title="持续时间" placement="bottom" mouseEnterDelay={1}>
                  {props.singleAttack.costTime + 's'}
                </Tooltip>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
