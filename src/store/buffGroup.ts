import { action, computed, makeObservable, observable } from 'mobx';

import { BuffGroup, BuffType } from '../app/common/interface';
import { AttributesCode } from '../app/common/type-code';

export class BuffGroupStore {
  constructor() {
    makeObservable(this, {
      buffGroupsData: observable,
      buffListBased: observable,
      buffGroupsLen: computed,
      changeBuffGroups: action,
      addBuffGroup: action,
      delBuffGroup: action,
    });
  }

  buffListBased: Array<BuffType> = [
    {
      code: AttributesCode.ATK_PERCENT,
      name: '攻击力加成/%',
    },
    {
      code: AttributesCode.ATK_PLUS,
      name: '攻击力加成/+',
    },
    {
      code: AttributesCode.DEF_PERCENT,
      name: '防御力加成/%',
    },
    {
      code: AttributesCode.DEF_PLUS,
      name: '防御力加成/+',
    },
    {
      code: AttributesCode.BLOOD_PERCENT,
      name: '生命值加成/%',
    },
    {
      code: AttributesCode.BLOOD_PLUS,
      name: '生命值加成/+',
    },
    {
      code: AttributesCode.RECHARGE_PERCENT,
      name: '元素充能效率加成/%',
    },
    {
      code: AttributesCode.PROFICIENT_PLUS,
      name: '元素精通加成/+',
    },
    {
      code: AttributesCode.OVERLOAD,
      name: '超载增强/%',
    },
    {
      code: AttributesCode.COMBUSTION,
      name: '燃烧增强/%',
    },
    {
      code: AttributesCode.INDUCTION,
      name: '感电增强/%',
    },
    {
      code: AttributesCode.SUPERCONDUCT,
      name: '超导增强/%',
    },
    {
      code: AttributesCode.DIFFUSION_THUNDER,
      name: '扩散（雷）增强/%',
    },
    {
      code: AttributesCode.DIFFUSION_FIRE,
      name: '扩散（火）增强/%',
    },
    {
      code: AttributesCode.DIFFUSION_WATER,
      name: '扩散（水）增强/%',
    },
    {
      code: AttributesCode.DIFFUSION_ICE,
      name: '扩散（冰）增强/%',
    },
    {
      code: AttributesCode.DIFFUSION,
      name: '扩散增强/%',
    },
    {
      code: AttributesCode.EVAPORATION,
      name: '蒸发增强/%',
    },
    {
      code: AttributesCode.MELT,
      name: '融化增强/%',
    },
    {
      code: AttributesCode.CRIT_RATE,
      name: '暴击率加成/%',
    },
    {
      code: AttributesCode.CRIT_DAMAGE,
      name: '暴击伤害加成/%',
    },
    {
      code: AttributesCode.NORMAL_ATK_CRIT_DAMAGE,
      name: '普通攻击暴击率加成/%',
    },
    {
      code: AttributesCode.THUMP_CRIT_DAMAGE,
      name: '重击暴击率加成/%',
    },
    {
      code: AttributesCode.FALL_ATK_CRIT_DAMAGE,
      name: '下落攻击暴击率加成/%',
    },
    {
      code: AttributesCode.ELEMENTAL_WARFARE_CRIT_DAMAGE,
      name: '元素战技暴击率加成/%',
    },
    {
      code: AttributesCode.ELEMENTAL_EXPLOSION_CRIT_DAMAGE,
      name: '元素爆发暴击率加成/%',
    },
    {
      code: AttributesCode.FIRE_DAMAGE,
      name: '火元素增伤/%',
    },
    {
      code: AttributesCode.WATER_DAMAGE,
      name: '水元素增伤/%',
    },
    {
      code: AttributesCode.ROCK_DAMAGE,
      name: '岩元素增伤/%',
    },
    {
      code: AttributesCode.WIND_DAMAGE,
      name: '风元素增伤/%',
    },
    {
      code: AttributesCode.ICE_DAMAGE,
      name: '冰元素增伤/%',
    },
    {
      code: AttributesCode.THUNDER_DAMAGE,
      name: '雷元素增伤/%',
    },
    {
      code: AttributesCode.GRASS_DAMAGE,
      name: '草元素增伤/%',
    },
    {
      code: AttributesCode.PHYSICS_DAMAGE,
      name: '物理增伤/%',
    },
    {
      code: AttributesCode.NORMAL_ATK_DAMAGE,
      name: '普通攻击增伤/%',
    },
    {
      code: AttributesCode.THUMP_DAMAGE,
      name: '重击增伤/%',
    },
    {
      code: AttributesCode.FALL_ATK_DAMAGE,
      name: '下落攻击增伤/%',
    },
    {
      code: AttributesCode.ELEMENTAL_WARFARE_DAMAGE,
      name: '元素战技增伤/%',
    },
    {
      code: AttributesCode.ELEMENTAL_EXPLOSION_DAMAGE,
      name: '元素爆发增伤/%',
    },
    {
      code: AttributesCode.CASE_DAMAGE,
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

  addBuffGroup = (buffGroup: BuffGroup) => {
    this.buffGroupsData.push(observable(buffGroup));
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
