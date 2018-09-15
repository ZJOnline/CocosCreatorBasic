import { UIBase } from "../Utils/UIBase";
import SceneManager, { SceneName } from "../Utils/SceneManager/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BackUI extends UIBase {

    @property(cc.Node)
    btn_back: cc.Node;

    // onLoad () {}

    start () {
        this.btn_back.on("click", this.onBack, this);
    }

    // update (dt) {}

    onBack() {
        SceneManager.Instance.loadScene(SceneName.Main);
    }
}
