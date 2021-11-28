import { makeAutoObservable } from 'mobx';

import {
  holyRelicAvgEntryMap,
  holyRelicEntryStatisticMap,
  holyRelicMaxEntryMap,
} from '../app/common/attributes-list';
import { characterList } from '../app/common/character-list';
import {
  actualAttributes,
  charBaseAttributes,
  holyRelicAllList,
  holyRelicSimpleAttributes,
  weaponBaseAttributes,
} from '../app/common/form-config';
import { Attribute, Entry, HolyRelic } from '../app/common/interface';
import { AttrCode, ElementTypeCode, HolyRelicTypeCode } from '../app/common/type-code';
import { weaponList } from '../app/common/weapon-list';

export class AttributesStore {
  constructor() {
    makeAutoObservable(this);
    this.resetHolyRelicList();
    this.initCharBaseAttrList();
    this.ob();
  }

  initCharBaseAttrList() {
    this.charSelectedKey = ['fire', 'HuTao'];
    this.weaponSelectedKey = 'StaffOfHoma';
    this.weaponBaseAttrList.forEach((value: Attribute, key: AttrCode) => {
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

    this.holyRelicAttrList.forEach((value: Attribute, key: AttrCode) => {
      let c = 0;
      switch (key) {
        case 'atk_plus':
          c = 408;
          break;
        case 'def_plus':
          c = 46;
          break;
        case 'blood_plus':
          c = 12894;
          break;
        case 'recharge_percent':
          c = 16.2;
          break;
        case 'proficient_plus':
          c = 114;
          break;
        case 'crit_rate':
          c = 74.6;
          break;
        case 'crit_damage':
          c = 78.5;
          break;
      }
      value.value = c;
    });
  }

  resetHolyRelicList() {
    this.holyRelicList = new Map();
    holyRelicAllList.forEach((value, key) => {
      if (key === 'hourglass') this.holyRelicList.set(key, value[2]);
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
      minGE: [new Array<AttrCode>(), 0, new Array<AttrCode>(), 0] as [
        Array<AttrCode>,
        number,
        Array<AttrCode>,
        number,
      ],
      averageGE: [new Array<AttrCode>(), 0, new Array<AttrCode>(), 0] as [
        Array<AttrCode>,
        number,
        Array<AttrCode>,
        number,
      ],
      theoreticalGE: [new Array<AttrCode>(), 0, new Array<AttrCode>(), 0] as [
        Array<AttrCode>,
        number,
        Array<AttrCode>,
        number,
      ],
      validScore: [0, 0],
    };
  };

  // 圣遗物预设
  holyRelicList: Map<HolyRelicTypeCode, HolyRelic | undefined> = new Map();

  // 圣遗物词条统计
  selectEntry: any[] = [];
  entryStatisticsList: Map<AttrCode, Entry> = new Map([...holyRelicEntryStatisticMap]);

  // 圣遗物统计数据
  entryStatisticsData = this.resetEntryStatisticsData();

  // 当前属性
  actualAttrList = new Map([...actualAttributes]);

  // 人物属性
  charBaseAttrList = new Map([...charBaseAttributes]);

  // 武器属性
  weaponOptions: any = [];
  weaponBaseAttrList = new Map([...weaponBaseAttributes]);

  charSelectedKey?: [ElementTypeCode, string];
  weaponSelectedKey?: string;
  holyRelicAttrList = new Map([...holyRelicSimpleAttributes]);

  setChar = (keys: [ElementTypeCode, string]) => {
    this.charSelectedKey = keys;
    this.weaponSelectedKey = undefined;
    this.ob();
  };
  setWeapon = (keys: string) => {
    this.weaponSelectedKey = keys;
    this.ob();
  };

  ob = () => {
    this.countCharBaseAttr();
    this.countWeaponBaseAttr();
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };

  countCharBaseAttr = () => {
    let char = characterList.get(this.charSelectedKey?.[1]);
    this.charBaseAttrList.forEach((value, key) => {
      value.value = char?.baseAttr?.get(key) || 0;
    });
    this.countActualAttributes();
    this.countEntryStatisticsList();
    this.weaponOptions = [];
    weaponList.forEach((element, key) => {
      if (element.type === char?.weaponType)
        this.weaponOptions.push({
          value: key,
          label: element.name,
        });
    });
  };
  countWeaponBaseAttr = () => {
    let attr = weaponList.get(this.weaponSelectedKey)?.baseAttr;
    this.weaponBaseAttrList.forEach((value, key) => {
      value.value = attr?.get(key) || 0;
    });
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };

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

    let keys = new Array<AttrCode>();
    let keysP = new Array<AttrCode>();
    this.entryStatisticsList.forEach((value, key) => {
      if (value.efficient && key !== 'proficient_plus') keys.push(key);
      if (value.efficient) keysP.push(key);
    });

    let offset = {
      atk: 0,
      critRate: 0,
      proficient: 0,
      critDamage: 0,
    };
    this.holyRelicList.forEach((item) => {
      let offsetSingle = this.countOffset(
        item?.mainAttrType || 'atk_plus',
        item?.mainAttr.value || 0,
      );
      switch (item?.mainAttrType) {
        case 'atk_plus':
        case 'atk_percent':
          offset.atk += offsetSingle;
          break;
        case 'crit_rate':
          offset.critRate += offsetSingle;
          break;
        case 'proficient_plus':
          offset.proficient += offsetSingle;
          break;
        case 'crit_damage':
          offset.critDamage += offsetSingle;
          break;
      }
    });

    let x = this.getValue(this.actualAttrList, 'atk_plus');
    let y = this.getValue(this.holyRelicAttrList, 'atk_plus');
    let atk = [
      x - (!keysP.includes('atk_percent') ? y - offset.atk : 0),
      x - y + offset.atk,
    ];

    x = this.getValue(this.actualAttrList, 'crit_rate');
    y = this.getValue(this.holyRelicAttrList, 'crit_rate');
    let critRate = [
      x - (!keysP.includes('crit_rate') ? y - offset.critRate : 0),
      x - y + offset.critRate,
    ];

    x = this.getValue(this.actualAttrList, 'proficient_plus');
    y = this.getValue(this.holyRelicAttrList, 'proficient_plus');
    let proficient = [
      x - (!keysP.includes('proficient_plus') ? y - offset.proficient : 0),
      x - y + offset.proficient,
    ];

    x = this.getValue(this.actualAttrList, 'crit_damage');
    y = this.getValue(this.holyRelicAttrList, 'crit_damage');
    let critDamage = [
      x - (!keysP.includes('crit_damage') ? y - offset.critDamage : 0),
      x - y + offset.critDamage,
    ];

    this.entryStatisticsData.currentEntryReactionDamageGain =
      (this.countDamage(atk[0], critRate[0], critDamage[0], proficient[0]) /
        this.countDamage(atk[1], critRate[1], critDamage[1], proficient[1])) *
      100;
    this.entryStatisticsData.currentEntryDamageGain =
      (this.countDamage(atk[0], critRate[0], critDamage[0], 0) /
        this.countDamage(atk[1], critRate[1], critDamage[1], 0)) *
      100;

    let min = this.countMaxDamage(
      30,
      15,
      holyRelicAvgEntryMap,
      atk[1],
      critRate[1],
      critDamage[1],
      proficient[1],
      keys,
    );
    let minP = this.countMaxDamage(
      30,
      15,
      holyRelicAvgEntryMap,
      atk[1],
      critRate[1],
      critDamage[1],
      proficient[1],
      keysP,
    );
    let av = this.countMaxDamage(
      35,
      20,
      holyRelicAvgEntryMap,
      atk[1],
      critRate[1],
      critDamage[1],
      proficient[1],
      keys,
    );
    let avP = this.countMaxDamage(
      35,
      20,
      holyRelicAvgEntryMap,
      atk[1],
      critRate[1],
      critDamage[1],
      proficient[1],
      keysP,
    );
    let th = this.countMaxDamage(
      45,
      30,
      holyRelicMaxEntryMap,
      atk[1],
      critRate[1],
      critDamage[1],
      proficient[1],
      keys,
    );

    let thP = this.countMaxDamage(
      45,
      30,
      holyRelicMaxEntryMap,
      atk[1],
      critRate[1],
      critDamage[1],
      proficient[1],
      keysP,
    );

    let lastDamage = this.countDamage(atk[1], critRate[1], critDamage[1], proficient[1]);

    this.entryStatisticsData.minGE[0] = min.entryArray;
    this.entryStatisticsData.minGE[1] = (min.damage / lastDamage) * 100;
    this.entryStatisticsData.minGE[2] = minP.entryArray;
    this.entryStatisticsData.minGE[3] = (minP.damage / lastDamage) * 100;

    this.entryStatisticsData.averageGE[0] = av.entryArray;
    this.entryStatisticsData.averageGE[1] = (av.damage / lastDamage) * 100;
    this.entryStatisticsData.averageGE[2] = avP.entryArray;
    this.entryStatisticsData.averageGE[3] = (avP.damage / lastDamage) * 100;

    this.entryStatisticsData.theoreticalGE[0] = th.entryArray;
    this.entryStatisticsData.theoreticalGE[1] = (th.damage / lastDamage) * 100;
    this.entryStatisticsData.theoreticalGE[2] = thP.entryArray;
    this.entryStatisticsData.theoreticalGE[3] = (thP.damage / lastDamage) * 100;
    this.entryStatisticsData.validScore[0] =
      (this.entryStatisticsData.currentEntryDamageGain /
        this.entryStatisticsData.averageGE[1]) *
      100;
    this.entryStatisticsData.validScore[1] =
      (this.entryStatisticsData.currentEntryReactionDamageGain /
        this.entryStatisticsData.averageGE[3]) *
      100;
  };

  countMaxDamage = (
    entryNum: number,
    singleMaxNum: number,
    holyRelicEntryAttr: Map<AttrCode, number>,
    initAtk: number,
    initCritRate: number,
    initCritDamage: number,
    initProficient: number,
    activatedKey: Array<AttrCode>,
  ) => {
    let damage = activatedKey.includes('proficient_plus')
      ? this.countDamage(initAtk, initCritRate, initCritDamage, initProficient)
      : this.countDamage(initAtk, initCritRate, initCritDamage, 0);
    let atkC = 0;
    let critRateC = 0;
    let proficientC = 0;
    let critDamageC = 0;
    let entryArray = new Array<AttrCode>();
    for (let i = 0; i < entryNum; i++) {
      // 前词条伤害计算
      let offset3 = {
        atk: 0,
        critRate: 0,
        proficient: 0,
        critDamage: 0,
      };
      entryArray.forEach((attrCode) => {
        let offsetSingle = this.countOffset(
          attrCode,
          holyRelicEntryAttr.get(attrCode) || 0,
        );
        switch (attrCode) {
          case 'atk_plus':
          case 'atk_percent':
            offset3.atk += offsetSingle;
            break;
          case 'crit_rate':
            offset3.critRate += offsetSingle;
            break;
          case 'proficient_plus':
            offset3.proficient += offsetSingle;
            break;
          case 'crit_damage':
            offset3.critDamage += offsetSingle;
            break;
        }
      });
      atkC = initAtk + offset3.atk;
      critRateC = initCritRate + offset3.critRate;
      critDamageC = initCritDamage + offset3.critDamage;
      proficientC = initProficient + offset3.proficient;
      // let acDamage = this.countDamage(atkC, critRateC, critDamageC, proficientC);
      holyRelicEntryAttr.forEach((value, key) => {
        if (
          activatedKey.includes(key) &&
          this.countSingleEntryNum(entryArray, key) < singleMaxNum
        ) {
          // 单词条收益计算
          let offset2 = {
            atk: 0,
            critRate: 0,
            proficient: 0,
            critDamage: 0,
          };
          let offsetSingle = this.countOffset(key, value);
          switch (key) {
            case 'atk_plus':
            case 'atk_percent':
              offset2.atk += offsetSingle;
              break;
            case 'crit_rate':
              offset2.critRate += offsetSingle;
              break;
            case 'proficient_plus':
              offset2.proficient += offsetSingle;
              break;
            case 'crit_damage':
              offset2.critDamage += offsetSingle;
              break;
          }
          let cacheDamage = this.countDamage(
            atkC + offset2.atk,
            critRateC + offset2.critRate,
            critDamageC + offset2.critDamage,
            proficientC + offset2.proficient,
          );
          if (cacheDamage > damage) {
            entryArray[i] = key;
            damage = cacheDamage;
          }
        }
      });
    }
    return { damage, entryArray };
  };
  countSingleEntryNum = (entryArray: AttrCode[], key: AttrCode) => {
    let num = 0;
    for (let code of entryArray) {
      if (code === key) num++;
    }
    return num;
  };
  countOffset = (type: AttrCode, value: number) => {
    switch (type) {
      case 'atk_percent':
        return (
          ((value || 0) / 100) *
          ((this.charBaseAttrList.get('atk_base')?.value || 0) +
            (this.weaponBaseAttrList.get('atk_base')?.value || 0))
        );
      case 'atk_plus':
      case 'crit_rate':
      case 'proficient_plus':
      case 'crit_damage':
        return value || 0;
    }
    return 0;
  };

  getValue(AttrList: Map<AttrCode, Attribute>, code: AttrCode) {
    return AttrList.get(code)?.value || 0;
  }

  countDamage(atk: number, critRate: number, critDamage: number, proficient: number) {
    critRate = critRate > 100 ? 100 : critRate;
    return (
      atk *
      (1 + ((critRate / 100) * critDamage) / 100) *
      (1 + (2.78 * proficient) / (1400 + proficient))
    );
  }

  setEntryStatisticsList = (code: AttrCode, entry: Entry) => {
    // eslint-disable-next-line no-debugger
    this.entryStatisticsList.set(code, entry);
    this.countEntryStatisticsData();
  };

  countEntryStatisticsList = () => {
    this.entryStatisticsList.forEach((value: Entry, key: AttrCode) => {
      let c = this.holyRelicAttrList;
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
              ((this.charBaseAttrList.get('atk_base')?.value || 0) +
                (this.weaponBaseAttrList.get('atk_base')?.value || 0) || 0)) *
            100;
          break;
        case 'def_percent':
          v =
            ((c.get('def_plus')?.value || 0) /
              ((this.charBaseAttrList.get('def_base')?.value || 0) +
                (this.weaponBaseAttrList.get('def_base')?.value || 0) || 0)) *
            100;
          break;
        case 'blood_percent':
          v =
            (((c.get('blood_plus')?.value || 0) -
              (this.holyRelicList.get('flower')?.mainAttr?.value || 0)) /
              ((this.charBaseAttrList.get('blood_base')?.value || 0) +
                (this.weaponBaseAttrList.get('blood_base')?.value || 0) || 0)) *
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

  setCharBaseAttrList = (map: Map<AttrCode, Attribute>) => {
    this.charBaseAttrList = map;
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };

  setWeaponBaseAttrList = (map: Map<AttrCode, Attribute>) => {
    this.weaponBaseAttrList = map;
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };

  setHolyRelicAttrList = (map: Map<AttrCode, Attribute>) => {
    this.holyRelicAttrList = map;
    this.countActualAttributes();
    this.countEntryStatisticsList();
  };
  // 计算所有属性
  countActualAttributes = () => {
    this.actualAttrList.forEach((value: Attribute, key: AttrCode) => {
      let base1 = 0;
      let base2 = 0;
      let percent: number[] = [];
      let plus: number[] = [];
      switch (key) {
        case 'atk_plus':
          base1 = this.charBaseAttrList.get('atk_base')?.value || 0;
          base2 = this.weaponBaseAttrList.get('atk_base')?.value || 0;
          percent.push(this.weaponBaseAttrList.get('atk_percent')?.value || 0);
          plus.push(this.holyRelicAttrList.get('atk_plus')?.value || 0);
          break;
        case 'def_plus':
          base1 = this.charBaseAttrList.get('def_base')?.value || 0;
          percent.push(this.weaponBaseAttrList.get('def_percent')?.value || 0);
          plus.push(this.holyRelicAttrList.get('def_plus')?.value || 0);
          break;
        case 'blood_plus':
          base1 = this.charBaseAttrList.get('blood_base')?.value || 0;
          percent.push(this.weaponBaseAttrList.get('blood_percent')?.value || 0);
          plus.push(this.holyRelicAttrList.get('blood_plus')?.value || 0);
          break;
        case 'proficient_plus':
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
            this.charBaseAttrList.get(key)?.value || 0,
            this.weaponBaseAttrList.get(key)?.value || 0,
            this.holyRelicAttrList.get(key)?.value || 0,
          );
          break;
      }
      let percentSum = 1;
      percent.map((num) => (percentSum += num || 0));
      // console.log(percentSum);
      let plusSum = 0;
      plus.map((num) => (plusSum += num || 0));
      this.actualAttrList.set(key, {
        title: value.title || '',
        value: (base1 + base2) * percentSum + plusSum,
        valueType: value.valueType || 'number',
      });
    });
  };
}
