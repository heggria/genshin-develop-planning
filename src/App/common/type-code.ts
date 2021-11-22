/* eslint-disable no-unused-vars */
export enum AttributesTypeCode {
  ATK,
  DEF,
  BLOOD,
  RECHARGE,
  PROFICIENT,
  ELEMENTAL_REACTION,
  CRIT_RATE,
  CRIT_DAMAGE,
  CASE_DAMAGE,
  SKILL_MULTIPLIER, // 技能倍率
}

export enum ReactionTypeCode {
  NONE,
  OVERLOAD, // 超载
  COMBUSTION, // 燃烧
  INDUCTION, // 感电
  SUPERCONDUCT, // 超导
  DIFFUSION_THUNDER, // 扩散（雷）
  DIFFUSION_FIRE, // 扩散（火）
  DIFFUSION_WATER, // 扩散（水）
  DIFFUSION_ICE, // 扩散（冰）
  DIFFUSION, // 扩散
  EVAPORATION, // 蒸发
  MELT, // 融化
}

export enum ElementTypeCode {
  NONE,
  THUNDER,
  FIRE,
  WATER,
  ICE,
  WIND,
  GRASS,
  ROCK,
  PHYSICS,
}

export enum AtkTypeCode {
  ALL,
  NORMAL_ATK,
  THUMP,
  FALL_ATK,
  ELEMENTAL_WARFARE,
  ELEMENTAL_EXPLOSION,
}

export enum AttributesCode {
  // 攻击区
  ATK,
  ATK_BASE,
  ATK_PERCENT,
  ATK_PLUS,
  DEF,
  DEF_BASE,
  DEF_PERCENT,
  DEF_PLUS,
  BLOOD,
  BLOOD_BASE,
  BLOOD_PERCENT,
  BLOOD_PLUS,
  // 元素反应区
  RECHARGE_PERCENT, // 元素充能效率
  PROFICIENT,
  PROFICIENT_PLUS, // 元素精通
  // OVERLOAD, // 超载增强
  // COMBUSTION, // 燃烧增强
  // INDUCTION, // 感电增强
  // SUPERCONDUCT, // 超导增强
  // DIFFUSION_THUNDER, // 扩散（雷）增强
  // DIFFUSION_FIRE, // 扩散（火）增强
  // DIFFUSION_WATER, // 扩散（水）增强
  // DIFFUSION_ICE, // 扩散（冰）增强
  // DIFFUSION, // 扩散增强
  // EVAPORATION, // 蒸发增强
  // MELT, // 融化增强
  // 双暴区
  CRIT_RATE,
  CRIT_DAMAGE,
  NORMAL_ATK_CRIT_DAMAGE, // 普通攻击
  THUMP_CRIT_DAMAGE, // 下落攻击
  FALL_ATK_CRIT_DAMAGE, // 重击
  ELEMENTAL_WARFARE_CRIT_DAMAGE, // 元素战技
  ELEMENTAL_EXPLOSION_CRIT_DAMAGE, // 元素爆发
  // 倍率区
  FIRE_DAMAGE,
  WATER_DAMAGE,
  ROCK_DAMAGE,
  WIND_DAMAGE,
  ICE_DAMAGE,
  THUNDER_DAMAGE,
  GRASS_DAMAGE,
  PHYSICS_DAMAGE,
  NORMAL_ATK_DAMAGE, // 普通攻击
  THUMP_DAMAGE, // 下落攻击
  FALL_ATK_DAMAGE, // 重击
  ELEMENTAL_WARFARE_DAMAGE, // 元素战技
  ELEMENTAL_EXPLOSION_DAMAGE, // 元素爆发
  CASE_DAMAGE, // 直接加成

  SKILL_MULTIPLIER,
}

// 计算值类型描述
export enum ValueTypeCode {
  // 默认
  DEFAULT,
  // 百分比
  PERCENT,
  // 普通数值
  NUMBER,
}

// 圣遗物类型描述
export enum HolyRelicTypeCode {
  FLOWER,
  FEATHER,
  HOURGLASS,
  CUP,
  HAT,
}
