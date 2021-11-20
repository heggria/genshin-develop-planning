import { attributes } from './attributes-list';
import { Attribute } from './interface';
import { AttributesCode } from './type-code';

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
