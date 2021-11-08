/* eslint-disable no-unused-vars */
import './SkillBoxPanel.css';

import { SettingOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import { useStores } from '../../../hooks/useStores';
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

export default observer(function SkillBoxPanel(props: SkillBoxPanelProps) {
  const openDrawer = () => {};
  const addToStream = () => {};
  const starSkill = () => {};
  const delSkill = () => {};
  const ref = useRef<HTMLDivElement>(null);

  const { skillConfigStore } = useStores();

  const [{ isDragging }, drag] = useDrag({
    type: 'SkillConfigBox',
    canDrag: !skillConfigStore.skillGroupEditable,
    item: { skill: props.singleAttack },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref);
  return (
    <div style={{ position: 'relative' }}>
      <div ref={ref} className="skill-box">
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
});
