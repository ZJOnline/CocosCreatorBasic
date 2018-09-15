const {ccclass, property} = cc._decorator;

export default abstract class ISceneState {

    stateName: string;

    /**
     * 进入场景
     */
    abstract enterScene();

    /**
     * 离开场景
     */
    abstract exitScene()

}
