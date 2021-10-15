import { action, computed, makeObservable, observable } from 'mobx';

import { BuffGroup } from '../app/panel/buffConfigPanel/BuffConfigPanel';

export class BuffGroupStore {
  constructor() {
    makeObservable(this, {
      buffGroupsData: observable,
      buffGroupsLen: computed,
      changeBuffGroups: action,
      addBuffGroup: action,
      delBuffGroup: action,
    });
  }

  buffGroupsData: Array<BuffGroup> = [
    {
      title: '',
      allProductivity: 1,
      buffs: [],
    },
  ];

  changeBuffGroups(buffGroup: BuffGroup, index: number) {
    this.buffGroupsData[index] = buffGroup;
  }

  addBuffGroup(buffGroup: BuffGroup) {
    this.buffGroupsData.push(buffGroup);
  }

  delBuffGroup(index: number) {
    this.buffGroupsData = this.buffGroupsData.filter((item, i) => index !== i);
  }

  get buffGroupsLen() {
    return this.buffGroupsData.length;
  }
}

export const BUFF_GROUPS = 'buffGroupStore';
