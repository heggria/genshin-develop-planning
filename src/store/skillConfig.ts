import { makeAutoObservable, observable } from 'mobx';

import { SingleAttack } from '../app/common/interface';
import { AtkTypeCode, ElementTypeCode, ReactionTypeCode } from '../app/common/type-code';
import { AttackSubModule } from '../app/layout/MainLayout/panels/SkillGroupPanel/SkillGroupPanel';

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
    this.skillList.push(
      observable({
        id: timestamp,
        title: '未命名',
        damageMultiplier: 100,
        atkType: { name: '普通攻击', code: AtkTypeCode.NORMAL_ATK },
        hitRate: 1,
        elementClass: {
          name: '无属性',
          code: ElementTypeCode.NONE,
        },
        reactionType: {
          name: '无反应',
          code: ReactionTypeCode.NONE,
        },
        costTime: 1,
        effectiveBuff: [],
        collected: false,
      }),
    );
    // this.skillList.push(attack);
  };

  changeSkillList = (attack: SingleAttack, index: number) => {
    this.skillList[index] = attack;
  };

  delSkillList = (index: number) => {
    this.skillList = this.skillList.filter((item, i) => index !== i);
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
