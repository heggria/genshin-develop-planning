import { attributes } from './attributes-list';
import { Attribute, HolyRelic } from './interface';
import { AttrCode } from './type-code';

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
    case 'atk':
    case 'def':
    case 'blood':
    case 'crit_damage':
    case 'crit_rate':
    case 'proficient':
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

export const flowerHolyRelicList: Array<HolyRelic> = [
  {
    type: 'flower',
    level: 20,
    mainAttributeType: 'blood_plus',
    mainAttribute: {
      title: attributes.get('blood_plus')?.title,
      extra: {
        valueType: attributes.get('blood_plus')?.extra.valueType,
        value: holyRelicValueMap.get('blood_plus') || 0,
      },
    },
  } as HolyRelic,
];

export const featureHolyRelicList: Array<HolyRelic> = [
  {
    type: 'feather',
    level: 20,
    mainAttributeType: 'atk_plus',
    mainAttribute: {
      title: attributes.get('atk_plus')?.title,
      extra: {
        valueType: attributes.get('atk_plus')?.extra.valueType,
        value: holyRelicValueMap.get('atk_plus') || 0,
      },
    },
  } as HolyRelic,
];

export const hourglassHolyRelicList: Array<HolyRelic> = [];
attributes.forEach((value, key) => {
  switch (key) {
    case 'atk_percent':
    case 'def_percent':
    case 'blood_percent':
    case 'recharge_percent':
    case 'proficient_plus':
      hourglassHolyRelicList.push({
        type: 'hourglass',
        level: 20,
        mainAttributeType: key,
        mainAttribute: {
          title: value.title,
          extra: {
            valueType: value.extra.valueType,
            value: holyRelicValueMap.get(key) || 0,
          },
        },
      } as HolyRelic);
  }
});

export const cupHolyRelicList: Array<HolyRelic> = [];
attributes.forEach((value, key) => {
  switch (key) {
    case 'atk_percent':
    case 'def_percent':
    case 'blood_percent':
    case 'recharge_percent':
    case 'proficient_plus':
    case 'fire_damage':
    case 'water_damage':
    case 'ice_damage':
    case 'rock_damage':
    case 'wind_damage':
    case 'thunder_damage':
    case 'physics_damage':
      cupHolyRelicList.push({
        type: 'cup',
        level: 20,
        mainAttributeType: key,
        mainAttribute: {
          title: value.title,
          extra: {
            valueType: value.extra.valueType,
            value: holyRelicValueMap.get(key) || 0,
          },
        },
      } as HolyRelic);
  }
});

export const hatHolyRelicList: Array<HolyRelic> = [];
attributes.forEach((value, key) => {
  switch (key) {
    case 'atk_percent':
    case 'def_percent':
    case 'blood_percent':
    case 'proficient_plus':
    case 'crit_damage':
    case 'crit_rate':
      hatHolyRelicList.push({
        type: 'hat',
        level: 20,
        mainAttributeType: key,
        mainAttribute: {
          title: value.title,
          extra: {
            valueType: value.extra.valueType,
            value: holyRelicValueMap.get(key) || 0,
          },
        },
      } as HolyRelic);
  }
});
// console.log(hatHolyRelicList);
