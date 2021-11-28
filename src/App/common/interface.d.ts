import {
  AtkTypeCode,
  AttrCode,
  AttrTypeCode,
  ElementTypeCode,
  HolyRelicTypeCode,
  ReactionTypeCode,
  ValueTypeCode,
  WeaponTypeCode,
} from './type-code';

export interface StringName {
  code: AttrCode;
  strings: Array<string>;
}

export interface BuffType {
  code: AttrCode;
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
  valueType: ValueTypeCode;
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
  attachedElement?: Element;
  // 反应类型
  reactionType: ReactionTypeCode;
  // 反应原始系数，基数
  reactionRate: number;
}

// 增伤描述
export interface CaseDamage {
  // 触发元素类型
  effectiveElementType?: ElementTypeCode;
  // 触发攻击类型
  effectiveAtkType?: AtkTypeCode;
}

// 属性描述
export interface Attribute extends Value {
  // 名称数组
  title: string;
  // 额外信息，三种类型
  extra?: Reaction | CaseDamage;
}

// 圣遗物描述
export interface HolyRelicType {
  // 名称
  name?: string;
  // type
  type: HolyRelicTypeCode;
  // 星级
  star?: number;
  // 最大等级
  maxLevel?: number;
  // 初始词条数范围
  initialEntriesRange?: number;
  // 词条数步进
  entriesStep?: number;
  // 套装归属
  suit?: any;
}

// 圣遗物描述
export interface HolyRelic extends HolyRelicType {
  // 等级
  level?: number;
  // 主数值类型
  mainAttrType: AttrCode;
  // 主数值类型
  mainAttr: Attribute;
  // 副词条
  subAttribute?: Map<Attribute, AttrTypeCode>;
  // 分数
  score?: number;
}

// 词条统计
export interface Entry {
  attributeType: AttrCode;
  attribute: Attribute;
  // 副词条
  mount: number;
  efficient: boolean;
}

// 角色描述
export interface Character {
  // 名称
  name: string;
  // 神之眼
  elementType: ElementTypeCode;
  // 使用武器
  weaponType: WeaponTypeCode;
  // 基础属性
  baseAttr: Map<AttrCode, number>;
  // 等级
  level?: number;

  star: number;
}

// 角色描述
export interface Weapon {
  // 名称
  name: string;
  // 类型
  type: WeaponTypeCode;
  // 基础属性
  baseAttr: Map<AttrCode, number>;
  // 等级
  level?: number;

  star: number;
}
