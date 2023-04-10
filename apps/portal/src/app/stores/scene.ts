import 'reflect-metadata';
import { makeObservable, makeAutoObservable, observable, action, toJS } from 'mobx';
import {
  SceneObjectProps,
  DialogInfoProps,
  SceneMainProps,
  CurrentSceneProps,
  TerrainProps,
} from './scene-props';

class SceneStore {
  @observable terrain = {};
  //@observable show: boolean;
  //@observable pending: boolean;
  //@observable sceneObjects: SceneObjectProps[] = [];
  //@observable mainObject: SceneMainProps | {} = {};
  //@observable currentScene: CurrentSceneProps | {} = {};
  // @observable parentType: AssetType;
  //@observable sceneObjects: SceneObjectsProps[] = [];
  // @observable sceneObjects: SceneObjectsProps[] = [];
  // @observable mainObject: {};
  // https://mobx.js.org/actions.html
  @observable scenes = [];
  @observable sceneObjects = [];
  @observable terrains = [];
  // terrain = {};
  @observable state = "pending"; // "pending", "done" or "error"
  @observable showDialogInfo = false;
  @observable dialogInfo = {};
  @observable stateTerrainNavigation = "pending";
  @observable terrainNavigation = [];
  @observable getTerrainState = "pending";

  constructor() {
    makeAutoObservable(this)
  }

  getScenes() {
    const url = `/assets/scenes.json`;
    // this.sceneObjects = []
    // this.state = "pending"
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log('KKKKKKKLLLLLL___getScenes___', result);
        this.scenes = result;
        // this.state = "done";
      })
  }

  getScene(id: number) {
    const url = `/assets/scenes.json`;
    this.sceneObjects = []
    this.state = "pending"
    fetch(url)
      .then(response => response.json())
      .then(result => {
        this.sceneObjects = result[id].sceneObjects;
        // console.log('this_______________sceneObjects_______', toJS(this.sceneObjects));
        this.state = "done";
      })
  }

  getTerrains() {
    const url = `/assets/scenes.json`;
    // this.sceneObjects = []
    this.state = "pending"
    fetch(url)
      .then(response => response.json())
      .then(result => {
        const resultTerrains = result[0].sceneObjects[1].terrains || [];
        // this.terrains = result.terrains[0];
        this.terrains = resultTerrains;
        this.state = "done";
      })
  }

  getTerrain(id: number) {
    const url = `/assets/scenes.json`;
    // this.sceneObjects = []
    this.getTerrainState = "pending"
    fetch(url)
      .then(response => {
        const mainresponse = response.json();
        return mainresponse;
      })
      .then(result => {
        const resultTerrain = result[0]?.sceneObjects[0]?.terrains[id] || {};

        console.log('getTerrainData___resultTerrain____', resultTerrain);

        this.terrain = resultTerrain;
        this.getTerrainState = "done";
      })
  }

  getTerrainNavigation() {
    const url = `/assets/navigation.json`;
    // this.sceneObjects = []
    this.stateTerrainNavigation = "pending"
    fetch(url)
      .then(response => {
        const mainresponse = response.json();
        return mainresponse;
      })
      .then(result => {
        // const resultTerrain = result[0]?.sceneObjects[0]?.terrains[1] || {};

        this.terrainNavigation = result;
        console.log('terrain____________GGGGGG____', this.terrainNavigation);
        this.stateTerrainNavigation = "done";
        console.log('terrain__________KKKKKK______', this.stateTerrainNavigation);
      })
  }

  getTerrainData() {
    return toJS(this.terrain)
  }

  terrainNavigationData() {
    return toJS(this.terrainNavigation)
  }

  getScenesData() {
    return toJS(this.scenes)
  }

  getInfoDialog(props: DialogInfoProps) {
    if (props) {
      this.showDialogInfo = true;
      this.dialogInfo = props;
    }
  }

  closeInfoDialog() {
    this.showDialogInfo = false;
  }

}

const sceneStore = new SceneStore();

export default sceneStore;
export { SceneStore };
