import SceneStateManager from "./SceneStateManager";
import Main from "../../Logic/Main";
import { UIManager } from "../UIManager";

export default class SceneManager {

    private static m_instance: SceneManager;
    sceneStateManager: SceneStateManager;
    isLoading: boolean = false;

    sceneObjects: cc.Node;
    normal: cc.Node;
    pop: cc.Node;

    private constructor() {
        this.sceneStateManager = new SceneStateManager();
    }

    static get Instance() {
        if (SceneManager.m_instance == null) {
            SceneManager.m_instance = new SceneManager();
        }
        return SceneManager.m_instance;
    }

    /**
     * 加载场景
     * @param sceneName 场景名
     */
    loadScene(sceneName: string) {
        this.isLoading = true;
        this.clearScene();
        cc.director.loadScene(sceneName, () => {
            this.onSceneLoaded(sceneName);
        })
    }


    onSceneLoaded(sceneName: string) {
        this.isLoading = false;
        this.initCanvas();
        this.sceneStateManager.changeSceneState(sceneName);
    }

    /**
     * 预加载场景，切换时调用loadScene
     * @param sceneName 场景名
     */
    preloadScene(sceneName: string) {
        cc.director.preloadScene(sceneName, (completedCount, totalCount, item) => {
            this.onProgress(completedCount, totalCount, item);
        }, (error) => {
            this.onPreloaded(error);
        });
    }

    onProgress(completedCount: number, totalCount: number, item: any) {

    }

    onPreloaded(error: Error) {

    }

    initCanvas() {
        let canvas:cc.Node = cc.instantiate(Main.Instance.canvas);
        cc.director.getScene().addChild(canvas);
        canvas.position = cc.Vec2.ZERO;
        this.sceneObjects = cc.find("SceneObjects", canvas);
        this.normal = cc.find("Normal", canvas);
        this.pop = cc.find("Pop", canvas);
    }

    clearScene() {
        UIManager.get_inst().clear();
    }
}

export const enum SceneName {
    Launch = "Launch",
    Main = "Main",
    Game = "Game",
}
