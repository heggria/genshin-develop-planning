import {
  cupHolyRelicList,
  hatHolyRelicList,
  hourglassHolyRelicList,
} from './form-config';
import { AtkTypeCode, AttrCode, ElementTypeCode, ReactionTypeCode } from './type-code';

export const atkTypeOptions: Array<SelectOption<AtkTypeCode>> = [
  { label: '普通攻击', value: 'normal_atk' },
  { label: '下落攻击', value: 'fall_atk' },
  { label: '重击', value: 'thump' },
  { label: '元素战技', value: 'elemental_warfare' },
  { label: '元素爆发', value: 'elemental_explosion' },
];

export const elementTypeOptions: Array<SelectOption<ElementTypeCode>> = [
  { label: '物理', value: 'physics' },
  { label: '无属性', value: 'none' },
  { label: '雷', value: 'thunder' },
  { label: '水', value: 'water' },
  { label: '冰', value: 'ice' },
  { label: '火', value: 'fire' },
  { label: '草', value: 'grass' },
  { label: '岩', value: 'rock' },
  { label: '风', value: 'wind' },
];

export const reactionTypeCodeOptions: Array<SelectOption<ReactionTypeCode>> = [
  { label: '蒸发', value: 'evaporation' },
  { label: '融化', value: 'melt' },
  { label: '无反应', value: 'none' },
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

export const cupMainEntryOptions: Array<SelectOption<AttrCode>> = [];
cupHolyRelicList.forEach((value) => {
  cupMainEntryOptions.push({
    label: value.mainAttribute?.title || '',
    value: value.mainAttributeType,
  });
});
export const hourglassMainEntryOptions: Array<SelectOption<AttrCode>> = [];
hourglassHolyRelicList.forEach((value) => {
  hourglassMainEntryOptions.push({
    label: value.mainAttribute?.title || '',
    value: value.mainAttributeType,
  });
});

export const hatMainEntryOptions: Array<SelectOption<AttrCode>> = [];
hatHolyRelicList.forEach((value) => {
  hatMainEntryOptions.push({
    label: value.mainAttribute?.title || '',
    value: value.mainAttributeType,
  });
});
