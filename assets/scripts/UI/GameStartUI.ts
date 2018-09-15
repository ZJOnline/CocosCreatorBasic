import { UIBase } from "../Utils/UIBase";
import SceneManager, { SceneName } from "../Utils/SceneManager/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStartUI extends UIBase {

    @property(cc.Node)
    btn_start: cc.Node;

    // onLoad () {}

    start () {
        this.btn_start.on("click", this.onStart, this);
    }

    // update (dt) {}

    onStart() {
        SceneManager.Instance.loadScene(SceneName.Game);
    }
}
