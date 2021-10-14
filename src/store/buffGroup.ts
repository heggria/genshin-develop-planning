import { action, computed, observable } from 'mobx';

import { BuffGroup, BuffTypeCode } from '../app/panel/buffConfigPanel/BuffConfigPanel';

class BuffGroupStore {
  @observable buffGroupsData: Array<BuffGroup> = [
    {
      title: '1111',
      allProductivity: 0.1,
      buffs: [
        {
          type: { code: BuffTypeCode.FIRE_DAMAGE, name: '火伤加成%' },
          value: 10000,
          productivity: 1,
        },
      ],
    },
    {
      title: '1111',
      allProductivity: 0.1,
      buffs: [
        {
          type: { code: BuffTypeCode.FIRE_DAMAGE, name: '火伤加成%' },
          value: 10000,
          productivity: 1,
        },
      ],
    },
  ];

  @action
  changeBuffGroups(buffGroup: Array<BuffGroup>) {
    this.buffGroupsData = buffGroup;
    //  console.log(value)
  }

  @computed
  get buffGroupsLen() {
    return this.buffGroupsData.length;
  }
}

export default BuffGroupStore;
