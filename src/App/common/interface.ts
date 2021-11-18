import {
  AtkTypeCode,
  AttributesTypeCode,
  BuffTypeCode,
  ElementTypeCode,
  ReactionTypeCode,
  ValueTypeCode,
} from './type-code';

export interface StringName {
  code: AttributesTypeCode;
  strings: Array<string>;
}

export interface BuffType {
  code: BuffTypeCode;
  name: string;
}

export interface Buff {
  type: BuffType;
  value: number;
  productivity: number;
}

export interface BuffGroup {
  collected: boolean;
  available: boolean;
  title: string;
  allProductivity: number;
  buffs: Array<Buff>;
}

export interface SingleAttack {
  id: string;
  title: string;
  damageMultiplier: number; // 倍率/%
  atkType: AtkTypeCode; // 攻击类型
  hitRate: number; // 命中率
  elementType: ElementTypeCode; // 伤害元素类型
  reactionType: ReactionTypeCode; // 目前只计算增幅反应
  costTime: number; // 时间
  effectiveBuff: Array<BuffGroup>; // 生效 buff
  collected: boolean;
}

export interface AttackSubModule {
  skill: SingleAttack;
  arrangementId: string;
}

// 计算值描述
export interface Value {
  // 计算值类型
  type: ValueTypeCode;
  // 计算值
  value: number;
}

// 元素描述
export interface Element {
  // 元素类型
  type: ElementTypeCode;
  // 元素质量
  quantity?: number;
  // 元素自然衰减率
  decayRate?: number;
  // 元素反应衰减量
  reactionDecay?: number;
}

// 元素反应描述
export interface Reaction {
  // 触发反应的元素
  triggerElement: Element;
  // 原始附着的元素
  attachedElement: Element;
  // 反应类型
  reactionType: ReactionTypeCode;
  // 反应原始系数，基数
  reactionRate: number;
  // 增幅系数，直接加算
  value: number;
}

// 增伤描述
export interface CaseDamage {
  // 触发元素类型
  effectiveElementType: ElementTypeCode;
  // 触发攻击类型
  effectiveAtkType: AtkTypeCode;
  // 增幅系数，直接加算
  value: number;
}

// 属性描述
export interface Attributes {
  // 属性类型
  code: AttributesTypeCode;
  // 名称数组
  title: string;
  // 额外信息，三种类型
  extra: Value | Reaction | CaseDamage;
}
