import { attributes } from './attributes-list';
import {
  AtkTypeCode,
  AttributesCode,
  ElementTypeCode,
  ReactionTypeCode,
} from './type-code';

export const atkTypeOptions = [
  { label: '普通攻击', value: AtkTypeCode.NORMAL_ATK },
  { label: '下落攻击', value: AtkTypeCode.FALL_ATK },
  { label: '重击', value: AtkTypeCode.THUMP },
  { label: '元素战技', value: AtkTypeCode.ELEMENTAL_WARFARE },
  { label: '元素爆发', value: AtkTypeCode.ELEMENTAL_EXPLOSION },
];

export const elementTypeOptions = [
  { label: '物理', value: ElementTypeCode.PHYSICS },
  { label: '无属性', value: ElementTypeCode.NONE },
  { label: '雷', value: ElementTypeCode.THUNDER },
  { label: '水', value: ElementTypeCode.WATER },
  { label: '冰', value: ElementTypeCode.ICE },
  { label: '火', value: ElementTypeCode.FIRE },
  { label: '草', value: ElementTypeCode.GRASS },
  { label: '岩', value: ElementTypeCode.ROCK },
  { label: '风', value: ElementTypeCode.WIND },
];

export const reactionTypeCodeOptions = [
  { label: '蒸发', value: ReactionTypeCode.EVAPORATION },
  { label: '融化', value: ReactionTypeCode.MELT },
  { label: '无反应', value: ReactionTypeCode.NONE },
  // { label: '超载', value: ReactionTypeCode.OVERLOAD },
  // { label: '燃烧', value: ReactionTypeCode.COMBUSTION },
  // { label: '感电', value: ReactionTypeCode.INDUCTION },
  // { label: '超导', value: ReactionTypeCode.SUPERCONDUCT },
  // { label: '扩散', value: ReactionTypeCode.DIFFUSION },
];

export interface SelectOption<T> {
  label: string;
  value: T;
}

export const cupMainEntryOptions: Array<SelectOption<AttributesCode>> = [];
attributes.forEach((value, key) => {
  switch (key) {
    case AttributesCode.ATK_PERCENT:
    case AttributesCode.DEF_PERCENT:
    case AttributesCode.BLOOD_PERCENT:
    case AttributesCode.RECHARGE_PERCENT:
    case AttributesCode.PROFICIENT_PLUS:
      cupMainEntryOptions.push({ label: value.title, value: key });
  }
});
export const hourglassMainEntryOptions: Array<SelectOption<AttributesCode>> = [];
attributes.forEach((value, key) => {
  switch (key) {
    case AttributesCode.ATK_PERCENT:
    case AttributesCode.DEF_PERCENT:
    case AttributesCode.BLOOD_PERCENT:
    case AttributesCode.RECHARGE_PERCENT:
    case AttributesCode.PROFICIENT_PLUS:
    case AttributesCode.FIRE_DAMAGE:
    case AttributesCode.WATER_DAMAGE:
    case AttributesCode.ICE_DAMAGE:
    case AttributesCode.ROCK_DAMAGE:
    case AttributesCode.WIND_DAMAGE:
    case AttributesCode.THUNDER_DAMAGE:
    case AttributesCode.PHYSICS_DAMAGE:
      hourglassMainEntryOptions.push({ label: value.title, value: key });
  }
});

export const hatMainEntryOptions: Array<SelectOption<AttributesCode>> = [];
attributes.forEach((value, key) => {
  switch (key) {
    case AttributesCode.ATK_PERCENT:
    case AttributesCode.DEF_PERCENT:
    case AttributesCode.BLOOD_PERCENT:
    case AttributesCode.PROFICIENT_PLUS:
    case AttributesCode.CRIT_DAMAGE:
    case AttributesCode.CRIT_RATE:
      hatMainEntryOptions.push({ label: value.title, value: key });
  }
});
