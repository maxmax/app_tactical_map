import menuStore from './menu-store';
import sceneStore from './scene';

class RootStore {}

const rootStore = new RootStore();

export const stores = {
    menuStore,
    sceneStore
}
