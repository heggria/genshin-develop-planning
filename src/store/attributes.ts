import { makeAutoObservable } from 'mobx';

import {
  holyRelicAvgEntryMap,
  holyRelicEntryStatisticMap,
} from '../app/common/attributes-list';
import {
  actualAttributes,
  charBaseAttributes,
  holyRelicAllList,
  holyRelicSimpleAttributes,
  weaponBaseAttributes,
} from '../app/common/form-config';
import { Attribute, Entry, HolyRelic } from '../app/common/interface';
import { AttrCode, HolyRelicTypeCode } from '../app/common/type-code';

export class AttributesStore {
  constructor() {
    makeAutoObservable(this);
    this.resetHolyRelicList();
    this.initCharBaseAttributesList();
    this.countActualAttributes();
    this.countEntryStatisticsList();
  }

  initCharBaseAttributesList() {
    this.charBaseAttributesList.forEach((value: Attribute, key: AttrCode) => {
      let c = 0;
      switch (key) {
        case 'atk_base':
          c = 250;
          break;
        case 'def_base':
          c = 639;
          break;
        case 'blood_base':
          c = 10000;
          break;
        case 'recharge_percent':
          c = 100;
          break;
        case 'crit_rate':
          c = 5;
          break;
        case 'crit_damage':
          c = 50;
          break;
      }
      value.value = c;
    });
    this.weaponBaseAttributesList.forEach((value: Attribute, key: AttrCode) => {
      let c = 0;
      switch (key) {
        case 'atk_base':
          c = 607;
          break;
        case 'crit_damage':
          c = 66.4;
          break;
      }
      value.value = c;
    });

    this.holyRelicSimpleAttributesList.forEach((value: Attribute, key: AttrCode) => {
      let c = 0;
      switch (key) {
        case 'atk_plus':
          c = 500;
          break;
        case 'def_plus':
          c = 83;
          break;
        case 'blood_plus':
          c = 6390;
          break;
        case 'recharge_percent':
          c = 10;
          break;
        case 'proficient_plus':
          c = 289;
          break;
        case 'crit_rate':
          c = 73.9;
          break;
        case 'crit_damage':
          c = 80;
          break;
      }
      value.value = c;
    });
  }

  resetHolyRelicList() {
    this.holyRelicList = new Map();
    holyRelicAllList.forEach((value, key) => {
      if (key === 'hourglass') this.holyRelicList.set(key, value[4]);
      else if (key === 'cup') this.holyRelicList.set(key, value[5]);
      else if (key === 'hat') this.holyRelicList.set(key, value[4]);
      else this.holyRelicList.set(key, value[0]);
    });
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
  entryStatisticsList: Map<AttrCode, Entry> = new Map([...holyRelicEntryStatisticMap]);

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

  setHolyRelicList = (code: HolyRelicTypeCode, holyRelic: HolyRelic | undefined) => {
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
      switch (item?.mainAttrType) {
        case 'atk_percent':
          atkOffset +=
            (item.mainAttr.value / 100) *
            ((this.charBaseAttributesList.get('atk_base')?.value || 0) +
              (this.weaponBaseAttributesList.get('atk_base')?.value || 0));
          break;
        case 'crit_rate':
          critRateOffset += item.mainAttr.value;
          break;
        case 'proficient_plus':
          proficientOffset += item.mainAttr.value;
          break;
        case 'crit_damage':
          critDamageOffset += item.mainAttr.value;
          break;
      }
    });
    console.log(critRateOffset, proficientOffset, critDamageOffset);

    let x = this.getValue(this.actualAttributesList, 'atk');
    let y = this.getValue(this.holyRelicSimpleAttributesList, 'atk_plus');
    let atk = [x, x - y + 311 + atkOffset];

    x = this.getValue(this.actualAttributesList, 'crit_rate');
    y = this.getValue(this.holyRelicSimpleAttributesList, 'crit_rate');
    let critRate = [x, x - y + critRateOffset];

    x = this.getValue(this.actualAttributesList, 'proficient');
    y = this.getValue(this.holyRelicSimpleAttributesList, 'proficient_plus');
    let proficient = [x, x - y + proficientOffset];

    x = this.getValue(this.actualAttributesList, 'crit_damage');
    y = this.getValue(this.holyRelicSimpleAttributesList, 'crit_damage');
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

  getValue(attributesList: Map<AttrCode, Attribute>, code: AttrCode) {
    return attributesList.get(code)?.value || 0;
  }

  countDamage(atk: number, critRate: number, critDamage: number, proficient: number) {
    critRate = critRate > 100 ? 100 : critRate;
    return (
      atk *
      (1 + ((critRate / 100) * critDamage) / 100) *
      (1 + (2.78 * proficient) / (1400 + proficient))
    );
  }

  setEntryStatisticsList = (code: AttrCode, holyRelic: Entry) => {
    // eslint-disable-next-line no-debugger
    this.entryStatisticsList.set(code, holyRelic);
    this.countEntryStatisticsData();
  };

  countEntryStatisticsList = () => {
    this.entryStatisticsList.forEach((value: Entry, key: AttrCode) => {
      let c = this.holyRelicSimpleAttributesList;
      let v = c.get(key)?.value || 0;
      let offset = 0;
      this.holyRelicList.forEach((hr: HolyRelic | undefined) => {
        if (hr && hr.mainAttrType === value.attributeType) {
          offset += hr.mainAttr?.value;
        }
      });
      switch (key) {
        case 'atk_percent':
          v =
            (((c.get('atk_plus')?.value || 0) -
              (this.holyRelicList.get('feather')?.mainAttr?.value || 0)) /
              ((this.charBaseAttributesList.get('atk_base')?.value || 0) +
                (this.weaponBaseAttributesList.get('atk_base')?.value || 0) || 0)) *
            100;
          break;
        case 'def_percent':
          v =
            ((c.get('def_plus')?.value || 0) /
              ((this.charBaseAttributesList.get('def_base')?.value || 0) +
                (this.weaponBaseAttributesList.get('def_base')?.value || 0) || 0)) *
            100;
          break;
        case 'blood_percent':
          v =
            (((c.get('blood_plus')?.value || 0) -
              (this.holyRelicList.get('flower')?.mainAttr?.value || 0)) /
              ((this.charBaseAttributesList.get('blood_base')?.value || 0) +
                (this.weaponBaseAttributesList.get('blood_base')?.value || 0) || 0)) *
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

  setCharBaseAttributesList = (map: Map<AttrCode, Attribute>) => {
    this.charBaseAttributesList = map;
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };

  setWeaponBaseAttributesList = (map: Map<AttrCode, Attribute>) => {
    this.weaponBaseAttributesList = map;
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };

  setHolyRelicSimpleAttributesList = (map: Map<AttrCode, Attribute>) => {
    this.holyRelicSimpleAttributesList = map;
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };
  // 计算所有属性
  countActualAttributes = () => {
    this.actualAttributesList.forEach((value: Attribute, key: AttrCode) => {
      let base1 = 0;
      let base2 = 0;
      let percent: number[] = [];
      let plus: number[] = [];
      // holyRelicList 圣遗物属性注入
      // this.holyRelicList.forEach((v: HolyRelic | undefined, k: HolyRelicTypeCode) => {
      //   console.log(v?.mainAttrType, key);
      //   if (v && v.mainAttrType === key) {
      //     switch (k) {
      //       case 'hourglass':
      //       case 'cup':
      //       case 'hat':
      //         v.mainAttr?.valueType === 'percent'
      //           ? percent.push(v.mainAttr?.value)
      //           : plus.push(v.mainAttr?.value);
      //     }
      //   }
      // });
      switch (key) {
        case 'atk':
          base1 = this.charBaseAttributesList.get('atk_base')?.value || 0;
          base2 = this.weaponBaseAttributesList.get('atk_base')?.value || 0;
          plus.push(
            this.holyRelicSimpleAttributesList.get('atk_plus')?.value || 0,
            this.holyRelicList.get('feather')?.mainAttr?.value || 0,
          );
          break;
        case 'def':
          base1 = this.charBaseAttributesList.get('def_base')?.value || 0;
          percent.push(this.weaponBaseAttributesList.get('def_percent')?.value || 0);
          plus.push(this.holyRelicSimpleAttributesList.get('def_plus')?.value || 0);
          break;
        case 'blood':
          base1 = this.charBaseAttributesList.get('blood_base')?.value || 0;
          percent.push(this.weaponBaseAttributesList.get('blood_percent')?.value || 0);
          plus.push(
            this.holyRelicSimpleAttributesList.get('blood_plus')?.value || 0,
            this.holyRelicList.get('flower')?.mainAttr?.value || 0,
          );
          break;
        case 'proficient':
          plus.push(
            this.weaponBaseAttributesList.get('proficient_plus')?.value || 0,
            this.holyRelicSimpleAttributesList.get('proficient_plus')?.value || 0,
          );
          break;

        case 'crit_damage':
        case 'crit_rate':
        case 'recharge_percent':
          // case 'ice_damage':
          // case 'fire_damage':
          // case 'water_damage':
          // case 'rock_damage':
          // case 'wind_damage':
          // case 'thunder_damage':
          // case 'physics_damage':
          plus.push(
            this.charBaseAttributesList.get(key)?.value || 0,
            this.weaponBaseAttributesList.get(key)?.value || 0,
            this.holyRelicSimpleAttributesList.get(key)?.value || 0,
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
        value: (base1 + base2) * percentSum + plusSum,
        valueType: value.valueType || 'number',
      });
    });
  };
}
