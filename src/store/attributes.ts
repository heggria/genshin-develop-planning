import { makeAutoObservable } from 'mobx';

import {
  holyRelicAvgEntryMap,
  holyRelicEntryStatisticMap,
} from '../app/common/attributes-list';
import {
  actualAttributes,
  charBaseAttributes,
  featureHolyRelicList,
  flowerHolyRelicList,
  holyRelicSimpleAttributes,
  weaponBaseAttributes,
} from '../app/common/form-config';
import { Attribute, Entry, HolyRelic } from '../app/common/interface';
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
    this.countEntryStatisticsList();
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

  resetEntryStatisticsData = () => {
    return {
      validEntriesNumber: 0,
      validEntriesMaximumNumber: 0,
      currentEntryDamageGain: 0,
      averageGraduationEntryTotalScore: 0,
      theoreticalGraduationEntryTotalScore: 0,
      validEntriesDistributionAverageScore: 0,
      validEntriesDistributionTheoryScore: 0,
    };
  };

  holyRelicList: Map<HolyRelicTypeCode, HolyRelic | undefined> = new Map();

  entryStatisticsList: Map<AttributesCode, Entry> = new Map([
    ...holyRelicEntryStatisticMap,
  ]);

  entryStatisticsData = this.resetEntryStatisticsData();

  actualAttributesList = new Map([...actualAttributes]);

  charBaseAttributesList = new Map([...charBaseAttributes]);

  weaponBaseAttributesList = new Map([...weaponBaseAttributes]);

  holyRelicSimpleAttributesList = new Map([...holyRelicSimpleAttributes]);

  setHolyRelicList = (code: HolyRelicTypeCode, holyRelic: HolyRelic) => {
    // eslint-disable-next-line no-debugger
    this.holyRelicList.set(code, holyRelic);
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };

  countEntryStatisticsData = () => {
    let flag = false;
    this.entryStatisticsData = this.resetEntryStatisticsData();
    this.entryStatisticsList.forEach((element) => {
      if (element.efficient) {
        if (!isNaN(element.mount) && isFinite(element.mount)) {
          this.entryStatisticsData.validEntriesNumber += element.mount;
        }
        if (this.entryStatisticsData.validEntriesMaximumNumber < 45) {
          if (!flag) {
            this.entryStatisticsData.validEntriesMaximumNumber += 6 * 5;
            flag = true;
          } else {
            this.entryStatisticsData.validEntriesMaximumNumber += 5;
          }
        }
      }
    });
  };

  setEntryStatisticsList = (code: AttributesCode, holyRelic: Entry) => {
    // eslint-disable-next-line no-debugger
    this.entryStatisticsList.set(code, holyRelic);
    this.countEntryStatisticsData();
  };

  countEntryStatisticsList = () => {
    this.entryStatisticsList.forEach((value: Entry, key: AttributesCode) => {
      let c = this.holyRelicSimpleAttributesList;
      let v = c.get(key)?.extra.value || 0;
      let offset = 0;
      this.holyRelicList.forEach((hr: HolyRelic | undefined) => {
        console.log(hr?.mainAttributeType, value.attributeType);
        if (hr && hr.mainAttributeType === value.attributeType) {
          offset += hr.mainAttribute?.extra.value;
        }
      });
      switch (key) {
        case AttributesCode.ATK_PERCENT:
          v =
            (((c.get(AttributesCode.ATK_PLUS)?.extra.value || 0) -
              (this.holyRelicList.get(HolyRelicTypeCode.FEATHER)?.mainAttribute?.extra
                .value || 0)) /
              ((this.charBaseAttributesList.get(AttributesCode.ATK_BASE)?.extra.value ||
                0) +
                (this.weaponBaseAttributesList.get(AttributesCode.ATK_BASE)?.extra
                  .value || 0) || 0)) *
            100;
          break;
        case AttributesCode.DEF_PERCENT:
          v =
            ((c.get(AttributesCode.DEF_PLUS)?.extra.value || 0) /
              ((this.charBaseAttributesList.get(AttributesCode.DEF_BASE)?.extra.value ||
                0) +
                (this.weaponBaseAttributesList.get(AttributesCode.DEF_BASE)?.extra
                  .value || 0) || 0)) *
            100;
          break;
        case AttributesCode.BLOOD_PERCENT:
          v =
            (((c.get(AttributesCode.BLOOD_PLUS)?.extra.value || 0) -
              (this.holyRelicList.get(HolyRelicTypeCode.FLOWER)?.mainAttribute?.extra
                .value || 0)) /
              ((this.charBaseAttributesList.get(AttributesCode.BLOOD_BASE)?.extra.value ||
                0) +
                (this.weaponBaseAttributesList.get(AttributesCode.BLOOD_BASE)?.extra
                  .value || 0) || 0)) *
            100;
          break;
      }
      this.entryStatisticsList.set(key, {
        ...value,
        mount: (v - offset) / (holyRelicAvgEntryMap.get(key) || 0),
      } as Entry);
    });
    this.countEntryStatisticsData();
  };

  setCharBaseAttributesList = (map: Map<AttributesCode, Attribute>) => {
    this.charBaseAttributesList = map;
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };

  setWeaponBaseAttributesList = (map: Map<AttributesCode, Attribute>) => {
    this.weaponBaseAttributesList = map;
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };

  setHolyRelicSimpleAttributesList = (map: Map<AttributesCode, Attribute>) => {
    this.holyRelicSimpleAttributesList = map;
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };
  // 计算所有属性
  countActualAttributes = () => {
    this.actualAttributesList.forEach((value: Attribute, key: AttributesCode) => {
      let base1 = 0;
      let base2 = 0;
      let percent: number[] = [];
      let plus: number[] = [];
      // holyRelicList 圣遗物属性注入
      // this.holyRelicList.forEach((v: HolyRelic | undefined, k: HolyRelicTypeCode) => {
      //   console.log(v?.mainAttributeType, key);
      //   if (v && v.mainAttributeType === key) {
      //     switch (k) {
      //       case HolyRelicTypeCode.HOURGLASS:
      //       case HolyRelicTypeCode.CUP:
      //       case HolyRelicTypeCode.HAT:
      //         v.mainAttribute?.extra.valueType === ValueTypeCode.PERCENT
      //           ? percent.push(v.mainAttribute?.extra.value)
      //           : plus.push(v.mainAttribute?.extra.value);
      //     }
      //   }
      // });
      switch (key) {
        case AttributesCode.ATK:
          base1 =
            this.charBaseAttributesList.get(AttributesCode.ATK_BASE)?.extra.value || 0;
          base2 =
            this.weaponBaseAttributesList.get(AttributesCode.ATK_BASE)?.extra.value || 0;
          plus.push(
            this.holyRelicSimpleAttributesList.get(AttributesCode.ATK_PLUS)?.extra
              .value || 0,
            this.holyRelicList.get(HolyRelicTypeCode.FEATHER)?.mainAttribute?.extra
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
            this.holyRelicList.get(HolyRelicTypeCode.FLOWER)?.mainAttribute?.extra
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
      percent.map((num) => (percentSum += num || 0));
      // console.log(percentSum);
      let plusSum = 0;
      plus.map((num) => (plusSum += num || 0));
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
