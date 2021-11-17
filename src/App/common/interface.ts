import {
  AtkTypeCode,
  BuffTypeCode,
  ElementTypeCode,
  ReactionTypeCode,
} from './type-code';

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
  atkType: AtkType; // 攻击类型
  hitRate: number; // 命中率
  elementClass: ElementClass; // 伤害元素类型
  reactionType: ReactionType; // 目前只计算增幅反应
  costTime: number; // 时间
  effectiveBuff: Array<BuffGroup>; // 生效 buff
  collected: boolean;
}

export interface AtkType {
  name: string;
  code: AtkTypeCode;
}

export interface ElementClass {
  name: string;
  code: ElementTypeCode;
}

export interface ReactionType {
  name: string;
  code: ReactionTypeCode;
}

export interface AttackSubModule {
  skill: SingleAttack;
  arrangementId: string;
}
