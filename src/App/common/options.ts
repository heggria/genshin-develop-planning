import { elementTypeMap } from './attributes-list';
import { characterList } from './character-list';
import { holyRelicAllList } from './form-config';
import {
  AtkTypeCode,
  AttrCode,
  ElementTypeCode,
  HolyRelicTypeCode,
  ReactionTypeCode,
} from './type-code';

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

export const mainEntryOptions = new Map<HolyRelicTypeCode, Array<SelectOption<AttrCode>>>(
  [
    ['flower', []],
    ['feather', []],
    ['hourglass', []],
    ['cup', []],
    ['hat', []],
  ],
);
mainEntryOptions.forEach((options, key) => {
  holyRelicAllList.get(key)?.forEach((value) => {
    options.push({
      label: value.mainAttr.title,
      value: value.mainAttrType,
    });
  });
});

export const characterOptions: any[] = [];
elementTypeMap.forEach((element, key) => {
  if (!['physics', 'none'].includes(key)) {
    let subCharacterList: any[] = [];
    characterList.forEach((value, nameKey) => {
      if (value.elementType === key)
        subCharacterList.push({
          value: nameKey,
          label: value.name,
        });
    });
    characterOptions.push({
      value: key,
      label: element.replace('元素', ''),
      disabled: subCharacterList.length === 0,
      children: subCharacterList,
    });
  }
});
