import { action, computed, makeObservable, observable } from 'mobx';

import { AtkTypeCode, ElementClassCode, ReactionTypeCode } from '../app/common/Attribute';
import { BuffTypeCode } from '../app/common/BuffTypeCode';
import { BuffGroup, BuffType } from '../app/panel/buffConfigPanel/BuffConfigPanel';
import { SingleAttack } from '../app/panel/skillBoxPanel/SkillBoxPanel';

export class BuffGroupStore {
  constructor() {
    makeObservable(this, {
      buffGroupsData: observable,
      buffListBased: observable,
      skillList: observable,
      buffGroupsLen: computed,
      changeBuffGroups: action,
      addBuffGroup: action,
      delBuffGroup: action,
    });
  }

  skillList: Array<SingleAttack> = [
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
      collected: false,
    },
  ];

  buffListBased: Array<BuffType> = [
    {
      code: BuffTypeCode.ATK_PERCENT,
      name: '攻击力加成/%',
    },
    {
      code: BuffTypeCode.ATK_PLUS,
      name: '攻击力加成/+',
    },
    {
      code: BuffTypeCode.DEF_PERCENT,
      name: '防御力加成/%',
    },
    {
      code: BuffTypeCode.DEF_PLUS,
      name: '防御力加成/+',
    },
    {
      code: BuffTypeCode.BLOOD_PERCENT,
      name: '生命值加成/%',
    },
    {
      code: BuffTypeCode.BLOOD_PLUS,
      name: '生命值加成/+',
    },
    {
      code: BuffTypeCode.RECHARGE_PERCENT,
      name: '元素充能效率加成/%',
    },
    {
      code: BuffTypeCode.PROFICIENT_PLUS,
      name: '元素精通加成/+',
    },
    {
      code: BuffTypeCode.OVERLOAD,
      name: '超载增强/%',
    },
    {
      code: BuffTypeCode.COMBUSTION,
      name: '燃烧增强/%',
    },
    {
      code: BuffTypeCode.INDUCTION,
      name: '感电增强/%',
    },
    {
      code: BuffTypeCode.SUPERCONDUCT,
      name: '超导增强/%',
    },
    {
      code: BuffTypeCode.DIFFUSION_THUNDER,
      name: '扩散（雷）增强/%',
    },
    {
      code: BuffTypeCode.DIFFUSION_FIRE,
      name: '扩散（火）增强/%',
    },
    {
      code: BuffTypeCode.DIFFUSION_WATER,
      name: '扩散（水）增强/%',
    },
    {
      code: BuffTypeCode.DIFFUSION_ICE,
      name: '扩散（冰）增强/%',
    },
    {
      code: BuffTypeCode.DIFFUSION,
      name: '扩散增强/%',
    },
    {
      code: BuffTypeCode.EVAPORATION,
      name: '蒸发增强/%',
    },
    {
      code: BuffTypeCode.MELT,
      name: '融化增强/%',
    },
    {
      code: BuffTypeCode.CRIT_RATE,
      name: '暴击率加成/%',
    },
    {
      code: BuffTypeCode.CRIT_DAMAGE,
      name: '暴击伤害加成/%',
    },
    {
      code: BuffTypeCode.NORMAL_ATK_CRIT_DAMAGE,
      name: '普通攻击暴击率加成/%',
    },
    {
      code: BuffTypeCode.THUMP_CRIT_DAMAGE,
      name: '重击暴击率加成/%',
    },
    {
      code: BuffTypeCode.FALL_ATK_CRIT_DAMAGE,
      name: '下落攻击暴击率加成/%',
    },
    {
      code: BuffTypeCode.ELEMENTAL_WARFARE_CRIT_DAMAGE,
      name: '元素战技暴击率加成/%',
    },
    {
      code: BuffTypeCode.ELEMENTAL_EXPLOSION_CRIT_DAMAGE,
      name: '元素爆发暴击率加成/%',
    },
    {
      code: BuffTypeCode.FIRE_DAMAGE,
      name: '火元素增伤/%',
    },
    {
      code: BuffTypeCode.WATER_DAMAGE,
      name: '水元素增伤/%',
    },
    {
      code: BuffTypeCode.ROCK_DAMAGE,
      name: '岩元素增伤/%',
    },
    {
      code: BuffTypeCode.WIND_DAMAGE,
      name: '风元素增伤/%',
    },
    {
      code: BuffTypeCode.ICE_DAMAGE,
      name: '冰元素增伤/%',
    },
    {
      code: BuffTypeCode.THUNDER_DAMAGE,
      name: '雷元素增伤/%',
    },
    {
      code: BuffTypeCode.GRASS_DAMAGE,
      name: '草元素增伤/%',
    },
    {
      code: BuffTypeCode.PHYSICS_DAMAGE,
      name: '物理增伤/%',
    },
    {
      code: BuffTypeCode.NORMAL_ATK_DAMAGE,
      name: '普通攻击增伤/%',
    },
    {
      code: BuffTypeCode.THUMP_DAMAGE,
      name: '重击增伤/%',
    },
    {
      code: BuffTypeCode.FALL_ATK_DAMAGE,
      name: '下落攻击增伤/%',
    },
    {
      code: BuffTypeCode.ELEMENTAL_WARFARE_DAMAGE,
      name: '元素战技增伤/%',
    },
    {
      code: BuffTypeCode.ELEMENTAL_EXPLOSION_DAMAGE,
      name: '元素爆发增伤/%',
    },
    {
      code: BuffTypeCode.CASE_DAMAGE,
      name: '直接增伤/%',
    },
  ];

  buffGroupsData: Array<BuffGroup> = [
    {
      collected: false,
      available: true,
      title: '',
      allProductivity: 1,
      buffs: [],
    },
  ];

  addSkillList = (/*attack: SingleAttack*/) => {
    this.skillList.push({
      title: '未命名',
      damageMultiplier: 100,
      atkType: { name: '普通攻击', code: AtkTypeCode.NORMAL_ATK },
      hitRate: 1,
      elementClass: {
        name: '无属性',
        code: ElementClassCode.NONE,
      },
      reactionType: {
        name: '无反应',
        code: ReactionTypeCode.NONE,
      },
      costTime: 1,
      effectiveBuff: [],
      collected: false,
    });
    // this.skillList.push(attack);
  };

  changeSkillList = (attack: SingleAttack, index: number) => {
    this.skillList[index] = attack;
  };

  delSkillList = (index: number) => {
    this.skillList = this.skillList.filter((item, i) => index !== i);
  };

  addBuffGroup = (buffGroup: BuffGroup) => {
    this.buffGroupsData.push(buffGroup);
  };

  changeBuffGroups = (buffGroup: BuffGroup, index: number) => {
    this.buffGroupsData[index] = buffGroup;
  };

  delBuffGroup = (index: number) => {
    this.buffGroupsData = this.buffGroupsData.filter((item, i) => index !== i);
  };

  clearBuffGroups = () => {
    this.buffGroupsData = [];
  };

  get buffGroupsLen() {
    return this.buffGroupsData.length;
  }
}
