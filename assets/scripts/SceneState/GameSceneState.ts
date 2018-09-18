import ISceneState from "../Utils/SceneManager/ISceneState";
import { SceneName } from "../Utils/SceneManager/SceneManager";
import { UIManager, UI_CONFIG, UI_TRANSITION_TYPE } from "../Utils/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameSceneState extends ISceneState {

    /**
     *
     */
    constructor() {
        super();
        this.stateName = SceneName.Game;
    }

    enterScene() {
        console.log("enter game scene");
        UIManager.get_inst().show(UI_CONFIG.BackUI, {
            transType: UI_TRANSITION_TYPE.FadeIn,
            // tweenFunc: Function,
            duration: 1,
        });
    }
    
    exitScene() {
        console.log("leave game scene");
    }





}
