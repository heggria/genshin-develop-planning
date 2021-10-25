/* eslint-disable no-unused-vars */
import './SkillBoxPanel.css';

import { inject, observer } from 'mobx-react';
import React from 'react';

import { AtkTypeCode, ElementClassCode, ReactionTypeCode } from '../../common/Attribute';
import { BuffGroup } from '../../panel/buffConfigPanel/BuffConfigPanel';

export interface SingleAttack {
  title: string;
  damageMultiplier: number; // 倍率/%
  atkType: AtkType; // 攻击类型
  hitRate: number; // 命中率
  elementClass: ElementClass; // 伤害元素类型
  reactionType: ReactionType; // 目前只计算增幅反应
  costTime: number; // 时间
  effectiveBuff: Array<BuffGroup>; // 生效 buff
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
  singleAttack: SingleAttack;
  showDrawer: Function;
}

export default observer(function SkillBoxPanel(props: SkillBoxPanelProps) {
  const openDrawer = () => {};
  const addToStream = () => {};
  const starSkill = () => {};
  const delSkill = () => {};
  return (
    <>
      <div
        className="skill-box"
        role="button"
        tabIndex={0}
        onClick={() => props.showDrawer()}
        onKeyDown={() => props.showDrawer()}>
        <div className="skill-box__title">{props.singleAttack.title}</div>
        <div className="skill-box__type">
          {props.singleAttack.atkType.name +
            '-' +
            props.singleAttack.elementClass.name +
            '-' +
            props.singleAttack.reactionType.name}
        </div>
        <div className="skill-box__buff">{props.singleAttack.effectiveBuff}</div>
      </div>
    </>
  );
});
