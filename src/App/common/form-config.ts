import { attributes } from './attributes-list';
import { Attribute, HolyRelic } from './interface';
import { AttributesCode, HolyRelicTypeCode } from './type-code';

export const holyRelicTotalAttributes: Map<AttributesCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case AttributesCode.ATK_PLUS:
    case AttributesCode.DEF_PLUS:
    case AttributesCode.BLOOD_PLUS:
    case AttributesCode.PROFICIENT_PLUS:
    case AttributesCode.CRIT_DAMAGE:
    case AttributesCode.CRIT_RATE:
    case AttributesCode.RECHARGE_PERCENT:
    case AttributesCode.FIRE_DAMAGE:
    case AttributesCode.ICE_DAMAGE:
    case AttributesCode.WATER_DAMAGE:
    case AttributesCode.THUNDER_DAMAGE:
    case AttributesCode.ROCK_DAMAGE:
    case AttributesCode.WIND_DAMAGE:
    case AttributesCode.PHYSICS_DAMAGE:
      holyRelicTotalAttributes.set(key, value);
  }
});

export const holyRelicSimpleAttributes: Map<AttributesCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case AttributesCode.ATK_PLUS:
    case AttributesCode.DEF_PLUS:
    case AttributesCode.BLOOD_PLUS:
    case AttributesCode.PROFICIENT_PLUS:
    case AttributesCode.CRIT_DAMAGE:
    case AttributesCode.CRIT_RATE:
    case AttributesCode.RECHARGE_PERCENT:
      holyRelicSimpleAttributes.set(key, value);
  }
});

export const charBaseAttributes: Map<AttributesCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case AttributesCode.ATK_BASE:
    case AttributesCode.DEF_BASE:
    case AttributesCode.BLOOD_BASE:
    case AttributesCode.CRIT_DAMAGE:
    case AttributesCode.CRIT_RATE:
    case AttributesCode.RECHARGE_PERCENT:
      charBaseAttributes.set(key, value);
  }
});

export const weaponBaseAttributes: Map<AttributesCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case AttributesCode.ATK_BASE:
    case AttributesCode.DEF_PERCENT:
    case AttributesCode.BLOOD_PERCENT:
    case AttributesCode.CRIT_DAMAGE:
    case AttributesCode.CRIT_RATE:
    case AttributesCode.PROFICIENT_PLUS:
    case AttributesCode.RECHARGE_PERCENT:
      weaponBaseAttributes.set(key, value);
  }
});

export const actualAttributes: Map<AttributesCode, Attribute> = new Map();
attributes.forEach((value, key) => {
  switch (key) {
    case AttributesCode.ATK:
    case AttributesCode.DEF:
    case AttributesCode.BLOOD:
    case AttributesCode.CRIT_DAMAGE:
    case AttributesCode.CRIT_RATE:
    case AttributesCode.PROFICIENT:
    case AttributesCode.RECHARGE_PERCENT:
    case AttributesCode.FIRE_DAMAGE:
    case AttributesCode.ICE_DAMAGE:
    case AttributesCode.WATER_DAMAGE:
    case AttributesCode.THUNDER_DAMAGE:
    case AttributesCode.ROCK_DAMAGE:
    case AttributesCode.WIND_DAMAGE:
    case AttributesCode.PHYSICS_DAMAGE:
      actualAttributes.set(key, value);
  }
});

export const holyRelicValueMap: Map<AttributesCode, number> = new Map([
  [AttributesCode.BLOOD_PLUS, 4780],
  [AttributesCode.ATK_PLUS, 311],
  [AttributesCode.ATK_PERCENT, 46.6],
  [AttributesCode.DEF_PERCENT, 58.3],
  [AttributesCode.BLOOD_PERCENT, 46.6],
  [AttributesCode.RECHARGE_PERCENT, 51.8],
  [AttributesCode.PROFICIENT_PLUS, 187],
  [AttributesCode.ICE_DAMAGE, 46.6],
  [AttributesCode.FIRE_DAMAGE, 46.6],
  [AttributesCode.WIND_DAMAGE, 46.6],
  [AttributesCode.ROCK_DAMAGE, 46.6],
  [AttributesCode.WATER_DAMAGE, 46.6],
  [AttributesCode.THUMP_DAMAGE, 46.6],
  [AttributesCode.PHYSICS_DAMAGE, 58.3],
  [AttributesCode.CRIT_RATE, 31.1],
  [AttributesCode.CRIT_DAMAGE, 62.2],
]);

export const flowerHolyRelicList: Array<HolyRelic> = [
  {
    type: HolyRelicTypeCode.FLOWER,
    level: 20,
    mainAttribute: {
      title: attributes.get(AttributesCode.BLOOD_PLUS)?.title,
      extra: {
        valueType: attributes.get(AttributesCode.BLOOD_PLUS)?.extra.valueType,
        value: holyRelicValueMap.get(AttributesCode.BLOOD_PLUS) || 0,
      },
    },
  } as HolyRelic,
];

export const featureHolyRelicList: Array<HolyRelic> = [
  {
    type: HolyRelicTypeCode.FEATHER,
    level: 20,
    mainAttribute: {
      title: attributes.get(AttributesCode.ATK_PLUS)?.title,
      extra: {
        valueType: attributes.get(AttributesCode.ATK_PLUS)?.extra.valueType,
        value: holyRelicValueMap.get(AttributesCode.ATK_PLUS) || 0,
      },
    },
  } as HolyRelic,
];

export const hourglassHolyRelicList: Array<HolyRelic> = [];
attributes.forEach((value, key) => {
  switch (key) {
    case AttributesCode.ATK_PERCENT:
    case AttributesCode.DEF_PERCENT:
    case AttributesCode.BLOOD_PERCENT:
    case AttributesCode.RECHARGE_PERCENT:
    case AttributesCode.PROFICIENT_PLUS:
      hourglassHolyRelicList.push({
        type: HolyRelicTypeCode.HOURGLASS,
        level: 20,
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
      cupHolyRelicList.push({
        type: HolyRelicTypeCode.CUP,
        level: 20,
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
    case AttributesCode.ATK_PERCENT:
    case AttributesCode.DEF_PERCENT:
    case AttributesCode.BLOOD_PERCENT:
    case AttributesCode.PROFICIENT_PLUS:
    case AttributesCode.CRIT_DAMAGE:
    case AttributesCode.CRIT_RATE:
      hatHolyRelicList.push({
        type: HolyRelicTypeCode.CUP,
        level: 20,
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
