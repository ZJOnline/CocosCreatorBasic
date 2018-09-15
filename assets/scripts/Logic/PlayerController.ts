// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    canvas: cc.Node;

    // onLoad () {}

    start () {
        this.canvas = cc.find("Canvas");
        if (this.canvas) {
            // this.canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            // this.canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            // this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }
    }

    onTouchMove(event: cc.Event.EventTouch) {
        this.node.position = this.node.position.add(event.getLocation().sub(event.getPreviousLocation()));
    }

    // update (dt) {}
}
