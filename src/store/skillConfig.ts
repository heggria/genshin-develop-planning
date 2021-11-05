import { action, makeObservable, observable } from 'mobx';

export class SkillConfigStore {
  constructor() {
    makeObservable(this, {
      skillGroupEditable: observable,
      setSkillGroupEditable: action,
    });
  }

  skillGroupEditable = false;

  setSkillGroupEditable = (skillGroupEditable: boolean) => {
    this.skillGroupEditable = skillGroupEditable;
  };
}
