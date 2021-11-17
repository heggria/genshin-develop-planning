/* eslint-disable no-unused-vars */
import './SkillBoxPanel.css';

import {
  FieldTimeOutlined,
  SettingOutlined,
  StarFilled,
  StarOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import { useStores } from '../../../../../hooks/useStores';
import { SingleAttack } from '../../../../common/interface';

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
  const { skillGroupEditable } = skillConfigStore;

  const [{ isDragging }, drag] = useDrag({
    type: 'SkillConfigBox',
    canDrag: !skillGroupEditable,
    item: { skillId: props.singleAttack.id },
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
              props.singleAttack.elementType.name +
              '-' +
              props.singleAttack.reactionType.name}
          </div>
          <div className="skill-box-bottom">
            <div className="skill-box__multiplier">
              <ThunderboltOutlined style={{ flex: 1 }} />
              <div style={{ marginLeft: '5px', flex: 4 }}>
                {props.singleAttack.damageMultiplier + '%'}
              </div>
            </div>
            <div className="skill-box__time">
              <FieldTimeOutlined />
              <div style={{ marginLeft: '5px', flex: 4 }}>
                {props.singleAttack.costTime + 's'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
