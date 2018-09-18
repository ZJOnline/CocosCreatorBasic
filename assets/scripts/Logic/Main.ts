import SceneManager from "../Utils/SceneManager/SceneManager";
import { LoaderMgr } from "../Utils/LoaderMgr";
import { gen_handler } from "../Utils/Utils";
import { TimerMgr } from "../Utils/TimerMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    private static m_instance: Main;
    public static get Instance() {
        return Main.m_instance;
    }

    canvas: any;

    onLoad() {
        Main.m_instance = this;
        cc.game.addPersistRootNode(this.node);

        LoaderMgr.get_inst().loadAsset("Prefabs/Canvas", gen_handler((_node: any): void => {
            this.canvas = _node;
        }), cc.Prefab);
    }

    start () {
        SceneManager.Instance.loadScene("Main");
    }

    update(dt) {
        TimerMgr.getInst().update(dt);
    }
}
