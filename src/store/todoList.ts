import { action, computed, observable } from 'mobx';

class TodoListStore {
  @observable Inputvalue = '';

  @action
  changeInput(value: any) {
    this.Inputvalue = value;
    //  console.log(value)
  }

  @computed
  get todolen() {
    return this.Inputvalue.length;
  }
}

export default TodoListStore;
