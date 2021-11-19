import { makeAutoObservable } from 'mobx';

import { AttackSubModule, SingleAttack } from '../app/common/interface';
import { AtkTypeCode, ElementTypeCode, ReactionTypeCode } from '../app/common/type-code';

export class SkillConfigStore {
  constructor() {
    makeAutoObservable(this);
  }

  skillList: Array<SingleAttack> = [
    // {
    //   id: '1',
    //   title: 'Q-一段伤害',
    //   damageMultiplier: 100,
    //   atkType: { name: '元素爆发', code: AtkTypeCode.ELEMENTAL_EXPLOSION },
    //   hitRate: 1,
    //   elementClass: {
    //     name: '雷',
    //     code: ElementClassCode.THUNDER,
    //   },
    //   reactionType: {
    //     name: '无反应',
    //     code: ReactionTypeCode.NONE,
    //   },
    //   costTime: 1,
    //   effectiveBuff: [],
    //   collected: false,
    // },
  ];

  skillGroup: Array<AttackSubModule> = [];

  skillGroupEditable = false;

  addSkillList = (/*attack: SingleAttack*/) => {
    const timestamp = new Date().getTime().toString();
    this.skillList.push({
      id: timestamp,
      title: '未命名',
      damageMultiplier: 100,
      atkType: AtkTypeCode.NORMAL_ATK,
      hitRate: 100,
      elementType: ElementTypeCode.NONE,
      reactionType: ReactionTypeCode.NONE,
      costTime: 1,
      effectiveBuff: [],
      collected: false,
    } as SingleAttack);
    // this.skillList.push(attack);
  };

  asyncSkillListChange = () => {
    let c = new Array<AttackSubModule>();
    this.skillGroup.map((item) => {
      let index = this.findIndex(this.skillList, item.skill.id) as number;
      console.log(index);
      if (index >= 0) {
        c.push({ skill: this.skillList[index], arrangementId: item.arrangementId });
      }
    });
    this.skillGroup = c;
  };

  findIndex = (array: Array<any>, id: string) => {
    for (let index in array) {
      if (array[index].id === id) return index;
    }
    return -1;
  };

  changeSkillList = (attack: SingleAttack, index: number) => {
    this.skillList[index] = attack;
    this.asyncSkillListChange();
  };

  moveSkill = (hoverIndex: number, dragIndex: number) => {
    const dragCard = this.skillGroup[dragIndex];
    this.skillGroup.splice(dragIndex, 1);
    this.skillGroup.splice(hoverIndex, 0, dragCard);
  };

  delSkillList = (index: number) => {
    this.skillList = this.skillList.filter((item, i) => index !== i);
    this.asyncSkillListChange();
  };

  setSkillGroupEditable = (skillGroupEditable: boolean) => {
    this.skillGroupEditable = skillGroupEditable;
  };

  setSkillGroup = (skillGroup: Array<AttackSubModule>) => {
    this.skillGroup = skillGroup;
  };

  addSkillGroup = (attackSubModule: AttackSubModule) => {
    // console.log(attackSubModule);
    this.skillGroup.push(attackSubModule);
    // this.skillList.push(attack);
  };

  delSkillGroup = (index: number) => {
    this.skillGroup = this.skillGroup.filter((item, i) => index !== i);
    // this.skillList.push(attack);
  };
}
