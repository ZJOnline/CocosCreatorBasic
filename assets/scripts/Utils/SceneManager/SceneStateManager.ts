import ISceneState from "./ISceneState";
import MainSceneState from "../../SceneState/MainSceneState";
import { SceneName } from "./SceneManager";
import GameSceneState from "../../SceneState/GameSceneState";
import * as a from "../../SceneState";

export default class SceneStateManager {

    curState: ISceneState = null;
    states: Map<string,ISceneState>;

    /**
     *
     */
    constructor() {
        this.states = new Map();
        let state: ISceneState;
        state = new MainSceneState();
        this.states.set(SceneName.Main, state);
        state = new GameSceneState();
        this.states.set(SceneName.Game, state);
    }

    changeSceneState(state: string) {
        if (!this.states.has(state)) {
            console.log("don't have this state:", state);
            return;
        }
        let nextState = this.states.get(state);
        if (this.curState != null && this.curState.stateName == nextState.stateName) {
            console.log("change same state");
            return;
        }
        if (this.curState != null) {
            this.curState.exitScene();
        }
        nextState.enterScene();
        this.curState = nextState;
    }

    getCurrentState() {
        return this.curState;
    }
}
