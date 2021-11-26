/* eslint-disable no-unused-vars */
export type AttrTypeCode =
  | 'atk_plus'
  | 'def_plus'
  | 'blood_plus'
  | 'recharge'
  | 'proficient_plus'
  | 'elemental_reaction'
  | 'crit_rate'
  | 'crit_damage'
  | 'case_damage'
  | 'skill_multiplier';

export type ReactionTypeCode =
  | 'none'
  | 'overload' // 超载
  | 'combustion' // 燃烧
  | 'induction' // 感电
  | 'superconduct' // 超导
  | 'diffusion_thunder' // 扩散（雷）
  | 'diffusion_fire' // 扩散（火）
  | 'diffusion_water' // 扩散（水）
  | 'diffusion_ice' // 扩散（冰）
  | 'diffusion' // 扩散
  | 'evaporation' // 蒸发
  | 'melt'; // 融化

export type ElementTypeCode =
  | 'none'
  | 'thunder'
  | 'fire'
  | 'water'
  | 'ice'
  | 'wind'
  | 'grass'
  | 'rock'
  | 'physics';

export type AtkTypeCode =
  | 'all'
  | 'normal_atk'
  | 'thump'
  | 'fall_atk'
  | 'elemental_warfare'
  | 'elemental_explosion';

export type AttrCode =
  // 攻击区
  | 'atk_plus'
  | 'atk_base'
  | 'atk_percent'
  | 'def_plus'
  | 'def_base'
  | 'def_percent'
  | 'blood_plus'
  | 'blood_base'
  | 'blood_percent'
  // 元素反应区
  | 'recharge_percent' // 元素充能效率
  | 'proficient_plus' // 元素精通
  // overload'| // 超载增强
  // combustion'| // 燃烧增强
  // induction'| // 感电增强
  // superconduct'| // 超导增强
  // diffusion_thunder'| // 扩散（雷）增强
  // diffusion_fire'| // 扩散（火）增强
  // diffusion_water'| // 扩散（水）增强
  // diffusion_ice'| // 扩散（冰）增强
  // diffusion'| // 扩散增强
  // evaporation'| // 蒸发增强
  // melt'| // 融化增强
  // 双暴区
  | 'crit_rate'
  | 'crit_damage'
  | 'normal_atk_crit_damage' // 普通攻击
  | 'thump_crit_damage' // 下落攻击
  | 'fall_atk_crit_damage' // 重击
  | 'elemental_warfare_crit_damage' // 元素战技
  | 'elemental_explosion_crit_damage' // 元素爆发
  // 倍率区
  | 'fire_damage'
  | 'water_damage'
  | 'rock_damage'
  | 'wind_damage'
  | 'ice_damage'
  | 'thunder_damage'
  | 'grass_damage'
  | 'physics_damage'
  | 'normal_atk_damage' // 普通攻击
  | 'thump_damage' // 下落攻击
  | 'fall_atk_damage' // 重击
  | 'elemental_warfare_damage' // 元素战技
  | 'elemental_explosion_damage' // 元素爆发
  | 'case_damage' // 直接加成
  | 'skill_multiplier';

// 计算值类型描述
export type ValueTypeCode =
  // 默认
  | 'default'
  // 百分比
  | 'percent'
  // 普通数值
  | 'number';

// 圣遗物类型描述
export type HolyRelicTypeCode = 'flower' | 'feather' | 'hourglass' | 'cup' | 'hat';
