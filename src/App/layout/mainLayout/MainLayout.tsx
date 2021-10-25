/* eslint-disable no-unused-vars */
import './MainLayout.css';

import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import {
  AtkTypeCode,
  AttributesTypeCode,
  ElementClassCode,
  ReactionTypeCode,
} from '../../common/Attribute';
import CharacterAttributesFrame from '../../frame/characterAttributesFrame/CharacterAttributesFrame';
import BuffConfigFrame from '../../frame/skillConfigFrame/SkillConfigFrame';
import { AtkType, SingleAttack } from '../../panel/skillBoxPanel/SkillBoxPanel';
import BuffGroupLayout from '../buffGroupLayout/BuffGroupLayout';

export default observer(function MainLayout() {
  const [attacks, setAttack] = useState([
    {
      title: 'Q-一段伤害',
      damageMultiplier: 100,
      atkType: { name: '元素爆发', code: AtkTypeCode.ELEMENTAL_EXPLOSION },
      hitRate: 1,
      elementClass: {
        name: '雷',
        code: ElementClassCode.THUNDER,
      },
      reactionType: {
        name: '无反应',
        code: ReactionTypeCode.NONE,
      },
      costTime: 1,
      effectiveBuff: [],
    },
  ] as Array<SingleAttack>);
  const changeAttack = (attack: SingleAttack, index: number) => {
    let cache = [...attacks];
    cache[index] = attack;
    setAttack(cache);
  };
  return (
    <div className="site-layout-background">
      <BuffConfigFrame attacks={attacks} changeAttack={changeAttack}></BuffConfigFrame>
      {/* <CharacterAttributesFrame
        attributes={[
          {
            name: '人物攻击力',
            type: AttributesTypeCode.ATK,
            value: 0,
            editable: true,
          },
          {
            name: '武器攻击力',
            type: AttributesTypeCode.ATK,
            value: 0,
            editable: true,
          },
          { name: '防御力', type: AttributesTypeCode.DEF, value: 0, editable: true },
          {
            name: '最大生命值',
            type: AttributesTypeCode.BLOOD,
            value: 0,
            editable: true,
          },
          {
            name: '元素充能效率/%',
            type: AttributesTypeCode.RECHARGE,
            value: 100,
            editable: false,
          },
          {
            name: '元素精通',
            type: AttributesTypeCode.PROFICIENT,
            value: 0,
            editable: false,
          },
          {
            name: '暴击率/%',
            type: AttributesTypeCode.CRIT_RATE,
            value: 5,
            editable: false,
          },
          {
            name: '暴击伤害/%',
            type: AttributesTypeCode.CRIT_DAMAGE,
            value: 50,
            editable: false,
          },
          {
            name: '伤害倍率/%',
            type: AttributesTypeCode.CASE_DAMAGE,
            value: 100,
            editable: false,
          },
        ]}></CharacterAttributesFrame> */}
      {
        /* <p>
          技能区 只需要考虑是否有 buff 的技能 配置伤害类型 攻击类型
          或者低代码编写反应率函数，并且可以保存函数复用
        </p>
        <p>武器配置区</p>
        <p>圣遗物配置区，选择你圣遗物的主副词条，圣遗物套装效果在下面buff区配</p>*/
        <Route path={`/`} exact component={BuffGroupLayout} /> /*
        <p>
          计算理论最大和期望满词条收益，计算当前圣遗物副词条收益，即可计算出准确的当前词条数量离毕业还有多远
        </p>
        <p>显示下一条词条提升率，各个圣遗物的词条数，毕业难度</p> */
      }
    </div>
  );
});
