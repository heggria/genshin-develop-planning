import { StringName } from './interface';
import {
  AtkTypeCode,
  AttributesTypeCode,
  ElementTypeCode,
  ReactionTypeCode,
} from './type-code';

export const attributesTypeList: Array<StringName> = [
  { code: AttributesTypeCode.BLOOD, strings: ['生命值上限', 'blood'] },
  { code: AttributesTypeCode.DEF, strings: ['攻击力', 'atk'] },
  { code: AttributesTypeCode.PROFICIENT, strings: ['防御力', 'def'] },
  {
    code: AttributesTypeCode.ELEMENTAL_REACTION,
    strings: ['元素反应倍率', 'elementalReaction'],
  },
  { code: AttributesTypeCode.RECHARGE, strings: ['元素充能效率', 'recharge'] },
  { code: AttributesTypeCode.CRIT_RATE, strings: ['暴击率', 'critRate'] },
  { code: AttributesTypeCode.CRIT_DAMAGE, strings: ['暴击伤害', 'critDamage'] },
  {
    code: AttributesTypeCode.SKILL_MULTIPLIER,
    strings: ['技能倍率', 'skillMultiplier'],
  },
  { code: AttributesTypeCode.CASE_DAMAGE, strings: ['伤害倍率', 'caseDamage'] },
  // 与元素反应倍率进行区分，元素精通作用于所有类型的元素反应
  // 只包括具体的元素反应伤害加成
  // 伤害倍率加成，分为两种来源：攻击方式、触发元素类型，以数组形式存在
];

export const attributesTypeMap: Map<AttributesTypeCode, string> = new Map(
  attributesTypeList.map((item) => [
    item.code as AttributesTypeCode,
    item.strings[0] as string,
  ]),
);

export const atkTypeMap: Map<AtkTypeCode, string> = new Map([
  [AtkTypeCode.ALL, '任意攻击'],
  [AtkTypeCode.NORMAL_ATK, '普通攻击'],
  [AtkTypeCode.FALL_ATK, '下落攻击'],
  [AtkTypeCode.THUMP, '重击'],
  [AtkTypeCode.ELEMENTAL_WARFARE, '元素战技'],
  [AtkTypeCode.ELEMENTAL_EXPLOSION, '元素爆发'],
]);

// 触发元素类型
export const elementTypeMap: Map<ElementTypeCode, string> = new Map([
  [ElementTypeCode.PHYSICS, '物理'],
  [ElementTypeCode.THUNDER, '雷'],
  [ElementTypeCode.WATER, '水'],
  [ElementTypeCode.ICE, '冰'],
  [ElementTypeCode.ICE, '火'],
  [ElementTypeCode.GRASS, '草'],
  [ElementTypeCode.ROCK, '岩'],
  [ElementTypeCode.WIND, '风'],
  [ElementTypeCode.NONE, '无属性'],
]);

// 元素反应类型
export const ReactionTypeMap: Map<ReactionTypeCode, string> = new Map([
  [ReactionTypeCode.EVAPORATION, '蒸发'],
  [ReactionTypeCode.MELT, '融化'],
  [ReactionTypeCode.NONE, '无反应'],
  [ReactionTypeCode.OVERLOAD, '超载'],
  [ReactionTypeCode.COMBUSTION, '燃烧'],
  [ReactionTypeCode.INDUCTION, '感电'],
  [ReactionTypeCode.SUPERCONDUCT, '超导'],
  [ReactionTypeCode.DIFFUSION, '扩散'],
]);

// 元素反应触发可能与倍率
export const ReactionDetailMap: Map<
  ElementTypeCode,
  Map<ReactionTypeCode, number>
> = new Map([]);
