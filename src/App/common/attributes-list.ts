import { Attribute, Entry, StringName } from './interface';
import { AtkTypeCode, AttrCode, ElementTypeCode, ReactionTypeCode } from './type-code';

export const attributesList: Array<StringName> = [
  // 攻击区
  { code: 'atk', strings: ['攻击力'] },
  { code: 'atk_base', strings: ['基础攻击力'] },
  { code: 'atk_percent', strings: ['攻击力/%'] },
  { code: 'atk_plus', strings: ['攻击力/+'] },
  { code: 'def', strings: ['防御力'] },
  { code: 'def_base', strings: ['基础防御力'] },
  { code: 'def_percent', strings: ['防御力/%'] },
  { code: 'def_plus', strings: ['防御力/+'] },
  { code: 'blood', strings: ['生命值上限'] },
  { code: 'blood_base', strings: ['基础生命值上限'] },
  { code: 'blood_percent', strings: ['生命值上限/%'] },
  { code: 'blood_plus', strings: ['生命值上限/+'] },
  // 元素反应区
  { code: 'recharge_percent', strings: ['元素充能效率/%'] }, // 元素充能效率
  { code: 'proficient', strings: ['元素精通'] }, // 元素精通
  { code: 'proficient_plus', strings: ['元素精通/+'] }, // 元素精通
  // { code: AttrCode.OVERLOAD, strings: ['生命值上限/%'] }, // 超载增强
  // { code: AttrCode.COMBUSTION, strings: ['生命值上限/%'] }, // 燃烧增强
  // { code: AttrCode.INDUCTION, strings: ['生命值上限/%'] }, // 感电增强
  // { code: AttrCode.SUPERCONDUCT, strings: ['生命值上限/%'] }, // 超导增强
  // { code: AttrCode.DIFFUSION_THUNDER, strings: ['生命值上限/%'] }, // 扩散（雷）增强
  // { code: AttrCode.DIFFUSION_FIRE, strings: ['生命值上限/%'] }, // 扩散（火）增强
  // { code: AttrCode.DIFFUSION_WATER, strings: ['生命值上限/%'] }, // 扩散（水）增强
  // { code: AttrCode.DIFFUSION_ICE, strings: ['生命值上限/%'] }, // 扩散（冰）增强
  // { code: AttrCode.DIFFUSION, strings: ['生命值上限/%'] }, // 扩散增强
  // { code: AttrCode.EVAPORATION, strings: ['生命值上限/%'] }, // 蒸发增强
  // { code: AttrCode.MELT, strings: ['生命值上限/%'] }, // 融化增强
  // 双暴区
  { code: 'crit_rate', strings: ['暴击率/%'] },
  { code: 'crit_damage', strings: ['暴击伤害/%'] },
  // { code: AttrCode.NORMAL_ATK_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 普通攻击
  // { code: AttrCode.THUMP_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 下落攻击
  // { code: AttrCode.FALL_ATK_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 重击
  // { code: AttrCode.ELEMENTAL_WARFARE_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 元素战技
  // { code: AttrCode.ELEMENTAL_EXPLOSION_CRIT_DAMAGE, strings: ['生命值上限/%'] }, // 元素爆发
  // 倍率区
  { code: 'fire_damage', strings: ['火元素伤害/%'] },
  { code: 'water_damage', strings: ['水元素伤害/%'] },
  { code: 'rock_damage', strings: ['岩元素伤害/%'] },
  { code: 'wind_damage', strings: ['风元素伤害/%'] },
  { code: 'ice_damage', strings: ['冰元素伤害/%'] },
  { code: 'thunder_damage', strings: ['雷元素伤害/%'] },
  // { code: AttrCode.GRASS_DAMAGE, strings: ['草元素伤害/%'] },
  { code: 'physics_damage', strings: ['物理伤害/%'] },
  { code: 'normal_atk_damage', strings: ['普通攻击伤害/%'] }, // 普通攻击
  { code: 'thump_damage', strings: ['重击伤害/%'] }, // 下落攻击
  { code: 'fall_atk_damage', strings: ['下落攻击伤害/%'] }, // 重击
  { code: 'elemental_warfare_damage', strings: ['元素战技伤害/%'] }, // 元素战技
  { code: 'elemental_explosion_damage', strings: ['元素爆发伤害/%'] }, // 元素爆发
  { code: 'case_damage', strings: ['增加伤害/%'] }, // 直接加成
  // 与元素反应倍率进行区分，元素精通作用于所有类型的元素反应
  // 只包括具体的元素反应伤害加成
  // 伤害倍率加成，分为两种来源：攻击方式、触发元素类型，以数组形式存在
  { code: 'skill_multiplier', strings: ['技能倍率/%'] }, // 直接加成
];

export const attributeMap: Map<AttrCode, string> = new Map(
  attributesList.map((item) => [item.code as AttrCode, item.strings[0] as string]),
);
export const attributes: Map<AttrCode, Attribute> = new Map();

attributeMap.forEach((value: string, key: AttrCode) => {
  let flag: number = 1;
  let elementTypeCode: ElementTypeCode = 'none';
  switch (key) {
    case 'atk_percent':
    case 'atk_plus':
    case 'def_percent':
    case 'def_plus':
    case 'blood_percent':
    case 'blood_plus':
    case 'recharge_percent':
    case 'proficient_plus':
    case 'crit_rate':
    case 'crit_damage':
      flag = 0;
      break;
    case 'fire_damage':
      elementTypeCode = 'fire';
      break;
    case 'water_damage':
      elementTypeCode = 'water';
      break;
    case 'rock_damage':
      elementTypeCode = 'rock';
      break;
    case 'ice_damage':
      elementTypeCode = 'ice';
      break;
    case 'thunder_damage':
      elementTypeCode = 'thunder';
      break;
    // case AttrCode.GRASS_DAMAGE:
    //   elementTypeCode = ElementTypeCode.GRASS;
    //   break;
    case 'physics_damage':
      elementTypeCode = 'physics';
      break;
    // case 'normal_atk_damage':
    // case 'thump_damage':
    // case 'fall_atk_damage':
    // case 'elemental_warfare_damage':
    // case 'elemental_explosion_damage':
    // case 'case_damage':
    //   normalAttributes.push({
    //     code: key,
    //     title: value,
    //     extra: {
    //       valueType: 'percent',
    //       value: 0,
    //     },
    //   });
    //   break;
  }

  attributes.set(key, {
    title: value,
    extra: {
      effectiveElementType: flag === 1 ? elementTypeCode : undefined,
      valueType: value.includes('%') ? 'percent' : 'number',
      value: 0,
    },
  });
});

export const atkTypeMap = new Map<AtkTypeCode, string>([
  ['all', '任意攻击'],
  ['normal_atk', '普通攻击'],
  ['fall_atk', '下落攻击'],
  ['thump', '重击'],
  ['elemental_warfare', '元素战技'],
  ['elemental_explosion', '元素爆发'],
]);

// 触发元素类型
export const elementTypeMap = new Map<ElementTypeCode, string>([
  ['physics', '物理'],
  ['thunder', '雷元素'],
  ['water', '水元素'],
  ['ice', '冰元素'],
  ['fire', '火元素'],
  ['grass', '草元素'],
  ['rock', '岩元素'],
  ['wind', '风元素'],
  ['none', '无属性'],
]);

// 元素反应类型
export const reactionTypeMap = new Map<ReactionTypeCode, string>([
  ['evaporation', '蒸发'],
  ['melt', '融化'],
  ['none', '无反应'],
  // [ReactionTypeCode.OVERLOAD, '超载'],
  // [ReactionTypeCode.COMBUSTION, '燃烧'],
  // [ReactionTypeCode.INDUCTION, '感电'],
  // [ReactionTypeCode.SUPERCONDUCT, '超导'],
  // [ReactionTypeCode.DIFFUSION, '扩散'],
]);

export const reactionAtkAttributes: Array<Attribute> = [];
reactionTypeMap.forEach((value: string, key: ReactionTypeCode) => {
  switch (key) {
    case 'evaporation':
      {
        reactionAtkAttributes.push(
          {
            title: value + '伤害',
            extra: {
              attachedElement: { type: 'fire' },
              triggerElement: { type: 'water' },
              reactionRate: 2,
              reactionType: key,
              valueType: 'percent',
              value: 0,
            },
          },
          {
            title: value + '伤害',
            extra: {
              triggerElement: { type: 'fire' },
              attachedElement: { type: 'water' },
              reactionRate: 1.5,
              reactionType: key,
              valueType: 'percent',
              value: 0,
            },
          },
        );
      }
      break;
    case 'melt':
      {
        reactionAtkAttributes.push(
          {
            title: value + '伤害',
            extra: {
              triggerElement: { type: 'ice' },
              attachedElement: { type: 'fire' },
              reactionRate: 1.5,
              reactionType: key,
              valueType: 'percent',
              value: 0,
            },
          },
          {
            title: value + '伤害',
            extra: {
              triggerElement: { type: 'fire' },
              attachedElement: { type: 'ice' },
              reactionRate: 2,
              reactionType: key,
              valueType: 'percent',
              value: 0,
            },
          },
        );
      }
      break;
    default:
    case 'none':
      reactionAtkAttributes.push({
        title: value,
        extra: {
          triggerElement: { type: 'none' },
          reactionType: key,
          valueType: 'percent',
          reactionRate: 1,
          value: 0,
        },
      });
  }
});

// 元素反应触发可能与倍率
export const ReactionDetailMap = new Map<ElementTypeCode, Map<ReactionTypeCode, number>>(
  [],
);

// 圣遗物副词条属性表
export const holyRelicEntryMap = new Map<AttrCode, Array<number>>([
  ['atk_plus', [14, 16, 18, 19]],
  ['blood_plus', [209, 239, 269, 299]],
  ['def_plus', [16, 19, 21, 23]],
  ['atk_percent', [4.1, 4.7, 5.3, 5.8]],
  ['blood_percent', [4.1, 4.7, 5.3, 5.8]],
  ['def_percent', [5.1, 5.8, 6.6, 7.3]],
  ['proficient_plus', [16, 19, 21, 23]],
  ['recharge_percent', [4.5, 5.2, 5.8, 6.5]],
  ['crit_rate', [2.7, 3.1, 3.5, 3.9]],
  ['crit_damage', [5.4, 6.2, 7.0, 7.8]],
]);
// 圣遗物副词条平均总属性表
export const holyRelicAvgEntryMap = new Map<AttrCode, number>();
holyRelicEntryMap.forEach((value: Array<number>, key: AttrCode) => {
  let sum = 0;
  value.map((item) => (sum += item));
  holyRelicAvgEntryMap.set(key, parseFloat((sum / 4).toFixed(2)));
});
// 圣遗物副词条极大总属性表
export const holyRelicMaxEntryMap: Map<AttrCode, number> = new Map();
holyRelicEntryMap.forEach((value: Array<number>, key: AttrCode) => {
  holyRelicMaxEntryMap.set(key, parseFloat((value[3] * 4).toFixed(2)));
});
// 圣遗物副词条统计表
export const holyRelicEntryStatisticMap: Map<AttrCode, Entry> = new Map();
attributes.forEach((value: Attribute, key: AttrCode) => {
  switch (key) {
    case 'atk_percent':
    case 'def_percent':
    case 'blood_percent':
    case 'proficient_plus':
    case 'recharge_percent':
    case 'crit_damage':
    case 'crit_rate':
      holyRelicEntryStatisticMap.set(key, {
        attributeType: key,
        attribute: value,
        mount: 0,
      } as Entry);
  }
});
