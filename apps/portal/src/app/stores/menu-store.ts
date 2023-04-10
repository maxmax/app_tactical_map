import { observable} from 'mobx';

class MenuStore {
  @observable show;
  @observable menu = [];
  @observable state = "pending";

  constructor() {
    this.show = false;
  }

  toggleHeadPanel() {
    this.show = !this.show;
  }

  getMenu() {
    const url = `/assets/scenes.json`;
    this.menu = [];
    this.state = "pending";
    console.log('getMenu______________________', this);
    fetch(url)
      .then(response => response.json())
      .then(result => {
        this.menu = result;
        this.state = "done";
        console.log('getMenu_____2_________________', this);
      })
  }
}

const menuStore = new MenuStore();

export default menuStore;
export { MenuStore };
