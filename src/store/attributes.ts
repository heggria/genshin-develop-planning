import { makeAutoObservable } from 'mobx';

import {
  holyRelicAvgEntryMap,
  holyRelicEntryStatisticMap,
} from '../app/common/attributes-list';
import {
  actualAttributes,
  charBaseAttributes,
  cupHolyRelicList,
  featureHolyRelicList,
  flowerHolyRelicList,
  hatHolyRelicList,
  holyRelicSimpleAttributes,
  hourglassHolyRelicList,
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
    this.initCharBaseAttributesList();
    this.countActualAttributes();
    this.countEntryStatisticsList();
  }

  initCharBaseAttributesList() {
    this.charBaseAttributesList.forEach((value: Attribute, key: AttributesCode) => {
      let c = 0;
      switch (key) {
        case AttributesCode.ATK_BASE:
          c = 250;
          break;
        case AttributesCode.DEF_BASE:
          c = 639;
          break;
        case AttributesCode.BLOOD_BASE:
          c = 10000;
          break;
        case AttributesCode.RECHARGE_PERCENT:
          c = 100;
          break;
        case AttributesCode.CRIT_RATE:
          c = 5;
          break;
        case AttributesCode.CRIT_DAMAGE:
          c = 50;
          break;
      }
      value.extra.value = c;
    });
    this.weaponBaseAttributesList.forEach((value: Attribute, key: AttributesCode) => {
      let c = 0;
      switch (key) {
        case AttributesCode.ATK_BASE:
          c = 607;
          break;
        case AttributesCode.CRIT_DAMAGE:
          c = 66.4;
          break;
      }
      value.extra.value = c;
    });

    this.holyRelicSimpleAttributesList.forEach(
      (value: Attribute, key: AttributesCode) => {
        let c = 0;
        switch (key) {
          case AttributesCode.ATK_PLUS:
            c = 500;
            break;
          case AttributesCode.DEF_PLUS:
            c = 83;
            break;
          case AttributesCode.BLOOD_PLUS:
            c = 6390;
            break;
          case AttributesCode.RECHARGE_PERCENT:
            c = 10;
            break;
          case AttributesCode.PROFICIENT_PLUS:
            c = 289;
            break;
          case AttributesCode.CRIT_RATE:
            c = 73.9;
            break;
          case AttributesCode.CRIT_DAMAGE:
            c = 80;
            break;
        }
        value.extra.value = c;
      },
    );
  }

  resetHolyRelicList() {
    this.holyRelicList = new Map([
      [HolyRelicTypeCode.FLOWER, flowerHolyRelicList[0]],
      [HolyRelicTypeCode.FEATHER, featureHolyRelicList[0]],
      [HolyRelicTypeCode.HOURGLASS, hourglassHolyRelicList[4]],
      [HolyRelicTypeCode.CUP, cupHolyRelicList[5]],
      [HolyRelicTypeCode.HAT, hatHolyRelicList[4]],
    ]);
  }

  resetEntryStatisticsData = () => {
    return {
      validEntriesNumber: 0,
      validEntriesMaximumNumber: 0,
      currentEntryDamageGain: 0, // 普通伤害增益
      currentEntryReactionDamageGain: 0, // 增幅反应伤害增益
      averageGraduationEntryTotalScore: 0,
      theoreticalGraduationEntryTotalScore: 0,
      validEntriesDistributionAverageScore: 0,
      validEntriesDistributionTheoryScore: 0,
    };
  };

  // 圣遗物预设
  holyRelicList: Map<HolyRelicTypeCode, HolyRelic | undefined> = new Map();

  // 圣遗物词条统计
  entryStatisticsList: Map<AttributesCode, Entry> = new Map([
    ...holyRelicEntryStatisticMap,
  ]);

  // 圣遗物统计数据
  entryStatisticsData = this.resetEntryStatisticsData();

  // 当前属性
  actualAttributesList = new Map([...actualAttributes]);

  // 人物属性
  charBaseAttributesList = new Map([...charBaseAttributes]);

  // 武器属性
  weaponBaseAttributesList = new Map([...weaponBaseAttributes]);

  // 圣遗物属性
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

    // 攻击区
    let atkOffset = 0;
    let critRateOffset = 0;
    let proficientOffset = 0;
    let critDamageOffset = 0;
    this.holyRelicList.forEach((item) => {
      switch (item?.mainAttributeType) {
        case AttributesCode.ATK_PERCENT:
          atkOffset +=
            (item.mainAttribute.extra.value / 100) *
            ((this.charBaseAttributesList.get(AttributesCode.ATK_BASE)?.extra.value ||
              0) +
              (this.weaponBaseAttributesList.get(AttributesCode.ATK_BASE)?.extra.value ||
                0));
          break;
        case AttributesCode.CRIT_RATE:
          critRateOffset += item.mainAttribute.extra.value;
          break;
        case AttributesCode.PROFICIENT_PLUS:
          proficientOffset += item.mainAttribute.extra.value;
          break;
        case AttributesCode.CRIT_DAMAGE:
          critDamageOffset += item.mainAttribute.extra.value;
          break;
      }
    });
    console.log(critRateOffset, proficientOffset, critDamageOffset);

    let x = this.getValue(this.actualAttributesList, AttributesCode.ATK);
    let y = this.getValue(this.holyRelicSimpleAttributesList, AttributesCode.ATK_PLUS);
    let atk = [x, x - y + 311 + atkOffset];

    x = this.getValue(this.actualAttributesList, AttributesCode.CRIT_RATE);
    y = this.getValue(this.holyRelicSimpleAttributesList, AttributesCode.CRIT_RATE);
    let critRate = [x, x - y + critRateOffset];

    x = this.getValue(this.actualAttributesList, AttributesCode.PROFICIENT);
    y = this.getValue(this.holyRelicSimpleAttributesList, AttributesCode.PROFICIENT_PLUS);
    let proficient = [x, x - y + proficientOffset];

    x = this.getValue(this.actualAttributesList, AttributesCode.CRIT_DAMAGE);
    y = this.getValue(this.holyRelicSimpleAttributesList, AttributesCode.CRIT_DAMAGE);
    let critDamage = [x, x - y + critDamageOffset];

    this.entryStatisticsData.currentEntryReactionDamageGain =
      (this.countDamage(atk[0], critRate[0], critDamage[0], proficient[0]) /
        this.countDamage(atk[1], critRate[1], critDamage[1], proficient[1])) *
      100;
    this.entryStatisticsData.currentEntryDamageGain =
      (this.countDamage(atk[0], critRate[0], critDamage[0], 0) /
        this.countDamage(atk[1], critRate[1], critDamage[1], 0)) *
      100;
  };

  getValue(attributesList: Map<AttributesCode, Attribute>, code: AttributesCode) {
    return attributesList.get(code)?.extra.value || 0;
  }

  countDamage(atk: number, critRate: number, critDamage: number, proficient: number) {
    critRate = critRate > 100 ? 100 : critRate;
    return (
      atk *
      (1 + ((critRate / 100) * critDamage) / 100) *
      (1 + (2.78 * proficient) / (1400 + proficient))
    );
  }

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
