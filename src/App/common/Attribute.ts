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

export enum ElementClassCode {
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
