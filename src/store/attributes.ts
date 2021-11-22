import { makeAutoObservable } from 'mobx';

import {
  actualAttributes,
  charBaseAttributes,
  featureHolyRelicList,
  flowerHolyRelicList,
  holyRelicSimpleAttributes,
  weaponBaseAttributes,
} from '../app/common/form-config';
import { Attribute, HolyRelic } from '../app/common/interface';
import {
  AttributesCode,
  HolyRelicTypeCode,
  ValueTypeCode,
} from '../app/common/type-code';

export class AttributesStore {
  constructor() {
    makeAutoObservable(this);
    this.resetHolyRelicList();
    this.countActualAttributes();
  }

  resetHolyRelicList() {
    this.holyRelicList = new Map([
      [HolyRelicTypeCode.FLOWER, flowerHolyRelicList[0]],
      [HolyRelicTypeCode.FEATHER, featureHolyRelicList[0]],
      [HolyRelicTypeCode.HOURGLASS, undefined],
      [HolyRelicTypeCode.CUP, undefined],
      [HolyRelicTypeCode.HAT, undefined],
    ]);
  }

  holyRelicList: Map<HolyRelicTypeCode, HolyRelic | undefined> = new Map();

  actualAttributesList = new Map([...actualAttributes]);

  charBaseAttributesList = new Map([...charBaseAttributes]);

  weaponBaseAttributesList = new Map([...weaponBaseAttributes]);

  holyRelicSimpleAttributesList = new Map([...holyRelicSimpleAttributes]);

  setHolyRelicList = (code: HolyRelicTypeCode, holyRelic: HolyRelic) => {
    console.log(holyRelic);
    this.holyRelicList.set(code, holyRelic);
    console.log(this.holyRelicList.get(code));
    this.countActualAttributes();
  };

  setCharBaseAttributesList = (map: Map<AttributesCode, Attribute>) => {
    this.charBaseAttributesList = map;
    this.countActualAttributes();
  };

  setWeaponBaseAttributesList = (map: Map<AttributesCode, Attribute>) => {
    this.weaponBaseAttributesList = map;
    this.countActualAttributes();
  };

  setHolyRelicSimpleAttributesList = (map: Map<AttributesCode, Attribute>) => {
    this.holyRelicSimpleAttributesList = map;
    this.countActualAttributes();
  };
  // 计算所有属性
  countActualAttributes = () => {
    this.actualAttributesList.forEach((value: Attribute, key: AttributesCode) => {
      let base1 = 0;
      let base2 = 0;
      let percent = [];
      let plus = [];
      switch (key) {
        case AttributesCode.ATK:
          base1 =
            this.charBaseAttributesList.get(AttributesCode.ATK_BASE)?.extra.value || 0;
          base2 =
            this.weaponBaseAttributesList.get(AttributesCode.ATK_BASE)?.extra.value || 0;
          plus.push(
            this.holyRelicSimpleAttributesList.get(AttributesCode.ATK_PLUS)?.extra
              .value || 0,
          );
          break;
        case AttributesCode.DEF:
          base1 =
            this.charBaseAttributesList.get(AttributesCode.DEF_BASE)?.extra.value || 0;
          percent.push(
            this.weaponBaseAttributesList.get(AttributesCode.DEF_PERCENT)?.extra.value ||
              0,
          );
          plus.push(
            this.holyRelicSimpleAttributesList.get(AttributesCode.DEF_PLUS)?.extra
              .value || 0,
          );
          break;
        case AttributesCode.BLOOD:
          base1 =
            this.charBaseAttributesList.get(AttributesCode.BLOOD_BASE)?.extra.value || 0;
          percent.push(
            this.weaponBaseAttributesList.get(AttributesCode.BLOOD_PERCENT)?.extra
              .value || 0,
          );
          plus.push(
            this.holyRelicSimpleAttributesList.get(AttributesCode.BLOOD_PLUS)?.extra
              .value || 0,
          );
          break;
        case AttributesCode.PROFICIENT:
          plus.push(
            this.weaponBaseAttributesList.get(AttributesCode.PROFICIENT_PLUS)?.extra
              .value || 0,
            this.holyRelicSimpleAttributesList.get(AttributesCode.PROFICIENT_PLUS)?.extra
              .value || 0,
          );
          break;

        case AttributesCode.CRIT_DAMAGE:
        case AttributesCode.CRIT_RATE:
        case AttributesCode.RECHARGE_PERCENT:
          // case AttributesCode.ICE_DAMAGE:
          // case AttributesCode.FIRE_DAMAGE:
          // case AttributesCode.WATER_DAMAGE:
          // case AttributesCode.ROCK_DAMAGE:
          // case AttributesCode.WIND_DAMAGE:
          // case AttributesCode.THUNDER_DAMAGE:
          // case AttributesCode.PHYSICS_DAMAGE:
          plus.push(
            this.charBaseAttributesList.get(key)?.extra.value || 0,
            this.weaponBaseAttributesList.get(key)?.extra.value || 0,
            this.holyRelicSimpleAttributesList.get(key)?.extra.value || 0,
          );
          break;
      }
      let percentSum = 1;
      percent.map((num) => (percentSum += num));
      let plusSum = 0;
      plus.map((num) => (plusSum += num));
      this.actualAttributesList.set(key, {
        title: value.title || '',
        extra: {
          value: (base1 + base2) * percentSum + plusSum,
          valueType: value.extra.valueType || ValueTypeCode.NUMBER,
        },
      });
    });
  };
}
