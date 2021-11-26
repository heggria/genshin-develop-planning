import { action, computed, makeObservable, observable } from 'mobx';

import { BuffGroup, BuffType } from '../app/common/interface';

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
      code: 'atk_percent',
      name: '攻击力加成/%',
    },
    {
      code: 'atk_plus',
      name: '攻击力加成/+',
    },
    {
      code: 'def_percent',
      name: '防御力加成/%',
    },
    {
      code: 'def_plus',
      name: '防御力加成/+',
    },
    {
      code: 'blood_percent',
      name: '生命值加成/%',
    },
    {
      code: 'blood_plus',
      name: '生命值加成/+',
    },
    {
      code: 'recharge_percent',
      name: '元素充能效率加成/%',
    },
    {
      code: 'proficient_plus',
      name: '元素精通加成/+',
    },
    // {
    //   code: AttrCode.OVERLOAD,
    //   name: '超载增强/%',
    // },
    // {
    //   code: AttrCode.COMBUSTION,
    //   name: '燃烧增强/%',
    // },
    // {
    //   code: AttrCode.INDUCTION,
    //   name: '感电增强/%',
    // },
    // {
    //   code: AttrCode.SUPERCONDUCT,
    //   name: '超导增强/%',
    // },
    // {
    //   code: AttrCode.DIFFUSION_THUNDER,
    //   name: '扩散（雷）增强/%',
    // },
    // {
    //   code: AttrCode.DIFFUSION_FIRE,
    //   name: '扩散（火）增强/%',
    // },
    // {
    //   code: AttrCode.DIFFUSION_WATER,
    //   name: '扩散（水）增强/%',
    // },
    // {
    //   code: AttrCode.DIFFUSION_ICE,
    //   name: '扩散（冰）增强/%',
    // },
    // {
    //   code: AttrCode.DIFFUSION,
    //   name: '扩散增强/%',
    // },
    // {
    //   code: AttrCode.EVAPORATION,
    //   name: '蒸发增强/%',
    // },
    // {
    //   code: AttrCode.MELT,
    //   name: '融化增强/%',
    // },
    {
      code: 'crit_rate',
      name: '暴击率加成/%',
    },
    {
      code: 'crit_damage',
      name: '暴击伤害加成/%',
    },
    // {
    //   code: AttrCode.NORMAL_ATK_CRIT_DAMAGE,
    //   name: '普通攻击暴击率加成/%',
    // },
    // {
    //   code: AttrCode.THUMP_CRIT_DAMAGE,
    //   name: '重击暴击率加成/%',
    // },
    // {
    //   code: AttrCode.FALL_ATK_CRIT_DAMAGE,
    //   name: '下落攻击暴击率加成/%',
    // },
    // {
    //   code: AttrCode.ELEMENTAL_WARFARE_CRIT_DAMAGE,
    //   name: '元素战技暴击率加成/%',
    // },
    // {
    //   code: AttrCode.ELEMENTAL_EXPLOSION_CRIT_DAMAGE,
    //   name: '元素爆发暴击率加成/%',
    // },
    {
      code: 'fire_damage',
      name: '火元素增伤/%',
    },
    {
      code: 'water_damage',
      name: '水元素增伤/%',
    },
    {
      code: 'rock_damage',
      name: '岩元素增伤/%',
    },
    {
      code: 'wind_damage',
      name: '风元素增伤/%',
    },
    {
      code: 'ice_damage',
      name: '冰元素增伤/%',
    },
    {
      code: 'thunder_damage',
      name: '雷元素增伤/%',
    },
    // {
    //   code: AttrCode.GRASS_DAMAGE,
    //   name: '草元素增伤/%',
    // },
    {
      code: 'physics_damage',
      name: '物理增伤/%',
    },
    {
      code: 'normal_atk_damage',
      name: '普通攻击增伤/%',
    },
    {
      code: 'thump_damage',
      name: '重击增伤/%',
    },
    {
      code: 'fall_atk_damage',
      name: '下落攻击增伤/%',
    },
    {
      code: 'elemental_warfare_damage',
      name: '元素战技增伤/%',
    },
    {
      code: 'elemental_explosion_damage',
      name: '元素爆发增伤/%',
    },
    {
      code: 'case_damage',
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
