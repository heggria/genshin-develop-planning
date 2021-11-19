import { Attribute, Element, Reaction, StringName } from './interface';
import {
  AtkTypeCode,
  AttributesCode,
  ElementTypeCode,
  ReactionTypeCode,
  ValueTypeCode,
} from './type-code';

export const attributesList: Array<StringName> = [
  // 攻击区
  { code: AttributesCode.ATK_BASE, strings: ['基础攻击力'] },
  { code: AttributesCode.ATK_PERCENT, strings: ['攻击力/%'] },
  { code: AttributesCode.ATK_PLUS, strings: ['攻击力/+'] },
  { code: AttributesCode.DEF_BASE, strings: ['基础防御力'] },
  { code: AttributesCode.DEF_PERCENT, strings: ['防御力/%'] },
  { code: AttributesCode.DEF_PLUS, strings: ['防御力/+'] },
  { code: AttributesCode.BLOOD_BASE, strings: ['基础生命值上限'] },
  { code: AttributesCode.BLOOD_PERCENT, strings: ['生命值上限/%'] },
  { code: AttributesCode.BLOOD_PLUS, strings: ['生命值上限/+'] },
  // 元素反应区
  { code: AttributesCode.RECHARGE_PERCENT, strings: ['元素充能效率/%'] }, // 元素充能效率
  { code: AttributesCode.PROFICIENT_PLUS, strings: ['元素精通/+'] }, // 元素精通
  // { code: AttributesCode.OVERLOAD, strings: ['生命值上限/%'] }, // 超载增强
  // { code: AttributesCode.COMBUSTION, strings: ['生命值上限/%'] }, // 燃烧增强
  // { code: AttributesCode.INDUCTION, strings: ['生命值上限/%'] }, // 感电增强
  // { code: AttributesCode.SUPERCONDUCT, strings: ['生命值上限/%'] }, // 超导增强
  // { code: AttributesCode.DIFFUSION_THUNDER, strings: ['生命值上限/%'] }, // 扩散（雷）增强
  // { code: AttributesCode.DIFFUSION_FIRE, strings: ['生命值上限/%'] }, // 扩散（火）增强
  // { code: AttributesCode.DIFFUSION_WATER, strings: ['生命值上限/%'] }, // 扩散（水）增强
  // { code: AttributesCode.DIFFUSION_ICE, strings: ['生命值上限/%'] }, // 扩散（冰）增强
  // { code: AttributesCode.DIFFUSION, strings: ['生命值上限/%'] }, // 扩散增强
  // { code: AttributesCode.EVAPORATION, strings: ['生命值上限/%'] }, // 蒸发增强
  // { code: AttributesCode.MELT, strings: ['生命值上限/%'] }, // 融化增强
  // 双暴区
  { code: AttributesCode.CRIT_RATE, strings: ['暴击率/%'] },
  { code: AttributesCode.CRIT_DAMAGE, strings: ['暴击伤害/%'] },
  // { code: AttributesCode.NORMAL_ATK_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 普通攻击
  // { code: AttributesCode.THUMP_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 下落攻击
  // { code: AttributesCode.FALL_ATK_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 重击
  // { code: AttributesCode.ELEMENTAL_WARFARE_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 元素战技
  // { code: AttributesCode.ELEMENTAL_EXPLOSION_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 元素爆发
  // 倍率区
  { code: AttributesCode.FIRE_DAMAGE, strings: ['火元素伤害/%'] },
  { code: AttributesCode.WATER_DAMAGE, strings: ['水元素伤害/%'] },
  { code: AttributesCode.ROCK_DAMAGE, strings: ['岩元素伤害/%'] },
  { code: AttributesCode.WIND_DAMAGE, strings: ['风元素伤害/%'] },
  { code: AttributesCode.ICE_DAMAGE, strings: ['冰元素伤害/%'] },
  { code: AttributesCode.THUNDER_DAMAGE, strings: ['雷元素伤害/%'] },
  { code: AttributesCode.GRASS_DAMAGE, strings: ['草元素伤害/%'] },
  { code: AttributesCode.PHYSICS_DAMAGE, strings: ['物理伤害/%'] },
  { code: AttributesCode.NORMAL_ATK_DAMAGE, strings: ['普通攻击伤害/%'] }, // 普通攻击
  { code: AttributesCode.THUMP_DAMAGE, strings: ['重击伤害/%'] }, // 下落攻击
  { code: AttributesCode.FALL_ATK_DAMAGE, strings: ['下落攻击伤害/%'] }, // 重击
  { code: AttributesCode.ELEMENTAL_WARFARE_DAMAGE, strings: ['元素战技伤害/%'] }, // 元素战技
  { code: AttributesCode.ELEMENTAL_EXPLOSION_DAMAGE, strings: ['元素爆发伤害/%'] }, // 元素爆发
  { code: AttributesCode.CASE_DAMAGE, strings: ['增加伤害/%'] }, // 直接加成
  // 与元素反应倍率进行区分，元素精通作用于所有类型的元素反应
  // 只包括具体的元素反应伤害加成
  // 伤害倍率加成，分为两种来源：攻击方式、触发元素类型，以数组形式存在
  { code: AttributesCode.SKILL_MULTIPLIER, strings: ['技能倍率/%'] }, // 直接加成
];

export const attributeMap: Map<AttributesCode, string> = new Map(
  attributesList.map((item) => [item.code as AttributesCode, item.strings[0] as string]),
);
export const attributes: Map<AttributesCode, Attribute> = new Map();

attributeMap.forEach((value: string, key: AttributesCode) => {
  let flag: number = 1;
  let elementTypeCode: ElementTypeCode = ElementTypeCode.NONE;
  switch (key) {
    case AttributesCode.ATK_PERCENT:
    case AttributesCode.ATK_PLUS:
    case AttributesCode.DEF_PERCENT:
    case AttributesCode.DEF_PLUS:
    case AttributesCode.BLOOD_PERCENT:
    case AttributesCode.BLOOD_PLUS:
    case AttributesCode.RECHARGE_PERCENT:
    case AttributesCode.PROFICIENT_PLUS:
    case AttributesCode.CRIT_RATE:
    case AttributesCode.CRIT_DAMAGE:
      flag = 0;
      break;
    case AttributesCode.FIRE_DAMAGE:
      elementTypeCode = ElementTypeCode.FIRE;
      break;
    case AttributesCode.WATER_DAMAGE:
      elementTypeCode = ElementTypeCode.WATER;
      break;
    case AttributesCode.ROCK_DAMAGE:
      elementTypeCode = ElementTypeCode.ROCK;
      break;
    case AttributesCode.ICE_DAMAGE:
      elementTypeCode = ElementTypeCode.ICE;
      break;
    case AttributesCode.THUNDER_DAMAGE:
      elementTypeCode = ElementTypeCode.THUNDER;
      break;
    // case AttributesCode.GRASS_DAMAGE:
    //   elementTypeCode = ElementTypeCode.GRASS;
    //   break;
    case AttributesCode.PHYSICS_DAMAGE:
      elementTypeCode = ElementTypeCode.PHYSICS;
      break;
    // case AttributesCode.NORMAL_ATK_DAMAGE:
    // case AttributesCode.THUMP_DAMAGE:
    // case AttributesCode.FALL_ATK_DAMAGE:
    // case AttributesCode.ELEMENTAL_WARFARE_DAMAGE:
    // case AttributesCode.ELEMENTAL_EXPLOSION_DAMAGE:
    // case AttributesCode.CASE_DAMAGE:
    //   normalAttributes.push({
    //     code: key,
    //     title: value,
    //     extra: {
    //       valueType: ValueTypeCode.PERCENT,
    //       value: 0,
    //     },
    //   });
    //   break;
  }

  attributes.set(key, {
    title: value,
    extra: {
      effectiveElementType: flag === 1 ? elementTypeCode : undefined,
      valueType: value.includes('%') ? ValueTypeCode.PERCENT : ValueTypeCode.NUMBER,
      value: 0,
    },
  });
});

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
  [ElementTypeCode.THUNDER, '雷元素'],
  [ElementTypeCode.WATER, '水元素'],
  [ElementTypeCode.ICE, '冰元素'],
  [ElementTypeCode.ICE, '火元素'],
  [ElementTypeCode.GRASS, '草元素'],
  [ElementTypeCode.ROCK, '岩元素'],
  [ElementTypeCode.WIND, '风元素'],
  [ElementTypeCode.NONE, '无属性'],
]);

// 元素反应类型
export const reactionTypeMap: Map<ReactionTypeCode, string> = new Map([
  [ReactionTypeCode.EVAPORATION, '蒸发'],
  [ReactionTypeCode.MELT, '融化'],
  [ReactionTypeCode.NONE, '无反应'],
  // [ReactionTypeCode.OVERLOAD, '超载'],
  // [ReactionTypeCode.COMBUSTION, '燃烧'],
  // [ReactionTypeCode.INDUCTION, '感电'],
  // [ReactionTypeCode.SUPERCONDUCT, '超导'],
  // [ReactionTypeCode.DIFFUSION, '扩散'],
]);

export const reactionAtkAttributes: Array<Attribute> = [];
reactionTypeMap.forEach((value: string, key: ReactionTypeCode) => {
  switch (key) {
    case ReactionTypeCode.EVAPORATION:
      {
        reactionAtkAttributes.push(
          {
            title: value + '伤害',
            extra: {
              attachedElement: { type: ElementTypeCode.FIRE } as Element,
              triggerElement: { type: ElementTypeCode.WATER } as Element,
              reactionRate: 2,
              reactionType: key,
              valueType: ValueTypeCode.PERCENT,
              value: 0,
            } as Reaction,
          },
          {
            title: value + '伤害',
            extra: {
              triggerElement: { type: ElementTypeCode.FIRE } as Element,
              attachedElement: { type: ElementTypeCode.WATER } as Element,
              reactionRate: 1.5,
              reactionType: key,
              valueType: ValueTypeCode.PERCENT,
              value: 0,
            } as Reaction,
          },
        );
      }
      break;
    case ReactionTypeCode.MELT:
      {
        reactionAtkAttributes.push(
          {
            title: value + '伤害',
            extra: {
              triggerElement: { type: ElementTypeCode.ICE } as Element,
              attachedElement: { type: ElementTypeCode.FIRE } as Element,
              reactionRate: 1.5,
              reactionType: key,
              valueType: ValueTypeCode.PERCENT,
              value: 0,
            } as Reaction,
          },
          {
            title: value + '伤害',
            extra: {
              triggerElement: { type: ElementTypeCode.FIRE } as Element,
              attachedElement: { type: ElementTypeCode.ICE } as Element,
              reactionRate: 2,
              reactionType: key,
              valueType: ValueTypeCode.PERCENT,
              value: 0,
            } as Reaction,
          },
        );
      }
      break;
    default:
    case ReactionTypeCode.NONE:
      reactionAtkAttributes.push({
        title: value,
        extra: {
          triggerElement: { type: ElementTypeCode.NONE } as Element,
          reactionType: key,
          valueType: ValueTypeCode.PERCENT,
          reactionRate: 1,
          value: 0,
        } as Reaction,
      });
  }
});

// 元素反应触发可能与倍率
export const ReactionDetailMap: Map<
  ElementTypeCode,
  Map<ReactionTypeCode, number>
> = new Map([]);
