import { attributes } from './attributes-list';
import { Attribute, HolyRelic } from './interface';
import { AttrCode, HolyRelicTypeCode } from './type-code';

export const holyRelicTotalAttributes: Map<AttrCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case 'atk_plus':
    case 'def_plus':
    case 'blood_plus':
    case 'proficient_plus':
    case 'crit_damage':
    case 'crit_rate':
    case 'recharge_percent':
    case 'fire_damage':
    case 'ice_damage':
    case 'water_damage':
    case 'thunder_damage':
    case 'rock_damage':
    case 'wind_damage':
    case 'physics_damage':
      holyRelicTotalAttributes.set(key, value);
  }
});

export const holyRelicSimpleAttributes: Map<AttrCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case 'atk_plus':
    case 'def_plus':
    case 'blood_plus':
    case 'proficient_plus':
    case 'crit_damage':
    case 'crit_rate':
    case 'recharge_percent':
      holyRelicSimpleAttributes.set(key, value);
  }
});

export const charBaseAttributes: Map<AttrCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case 'atk_base':
    case 'def_base':
    case 'blood_base':
    case 'crit_damage':
    case 'crit_rate':
    case 'recharge_percent':
      charBaseAttributes.set(key, value);
  }
});

export const weaponBaseAttributes: Map<AttrCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case 'atk_base':
    case 'def_percent':
    case 'blood_percent':
    case 'crit_damage':
    case 'crit_rate':
    case 'proficient_plus':
    case 'recharge_percent':
      weaponBaseAttributes.set(key, value);
  }
});

export const actualAttributes: Map<AttrCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case 'atk_plus':
    case 'def_plus':
    case 'blood_plus':
    case 'crit_damage':
    case 'crit_rate':
    case 'proficient_plus':
    case 'recharge_percent':
    case 'fire_damage':
    case 'ice_damage':
    case 'water_damage':
    case 'thunder_damage':
    case 'rock_damage':
    case 'wind_damage':
    case 'physics_damage':
      actualAttributes.set(key, value);
  }
});

export const holyRelicValueMap: Map<AttrCode, number> = new Map([
  ['blood_plus', 4780],
  ['atk_plus', 311],
  ['atk_percent', 46.6],
  ['def_percent', 58.3],
  ['blood_percent', 46.6],
  ['recharge_percent', 51.8],
  ['proficient_plus', 187],
  ['ice_damage', 46.6],
  ['fire_damage', 46.6],
  ['wind_damage', 46.6],
  ['rock_damage', 46.6],
  ['water_damage', 46.6],
  ['thunder_damage', 46.6],
  ['physics_damage', 58.3],
  ['crit_rate', 31.1],
  ['crit_damage', 62.2],
]);
const holyRelicAttrList = new Map<HolyRelicTypeCode, Array<AttrCode>>([
  ['flower', ['blood_plus']],
  ['feather', ['atk_plus']],
  [
    'hourglass',
    [
      'atk_percent',
      'def_percent',
      'blood_percent',
      'recharge_percent',
      'proficient_plus',
    ],
  ],
  [
    'cup',
    [
      'atk_percent',
      'def_percent',
      'blood_percent',
      'recharge_percent',
      'proficient_plus',
      'fire_damage',
      'water_damage',
      'ice_damage',
      'rock_damage',
      'wind_damage',
      'thunder_damage',
      'physics_damage',
    ],
  ],
  [
    'hat',
    [
      'atk_percent',
      'def_percent',
      'blood_percent',
      'proficient_plus',
      'crit_damage',
      'crit_rate',
    ],
  ],
]);

export const holyRelicAllList = new Map<HolyRelicTypeCode, Array<HolyRelic>>([
  ['flower', []],
  ['feather', []],
  ['hourglass', []],
  ['cup', []],
  ['hat', []],
]);

const initHolyRelicList = (
  type: HolyRelicTypeCode,
  keyList: Array<AttrCode>,
  value: Attribute,
  key: AttrCode,
) => {
  if (keyList.includes(key)) {
    holyRelicAllList.get(type)?.push({
      type: type,
      level: 20,
      mainAttrType: key,
      mainAttr: {
        title: value.title,
        valueType: value.valueType,
        value: holyRelicValueMap.get(key) || 0,
      },
    } as HolyRelic);
  }
};
attributes.forEach((attribute, attributeKey) => {
  holyRelicAttrList.forEach((keyList, holyRelicKey) => {
    initHolyRelicList(holyRelicKey, keyList, attribute, attributeKey);
  });
});
