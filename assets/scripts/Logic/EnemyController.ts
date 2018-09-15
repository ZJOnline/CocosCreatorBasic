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
export default class EnemyController extends cc.Component {

    player: cc.Node;

    // onLoad () {}

    start () {
        this.schedule(this.moveToPlayer, 0.5);
    }

    // update (dt) {}

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        console.log("onCollisionEnter");
    }

    moveToPlayer() {
        this.node.stopAllActions();
        
        this.node.runAction(cc.moveTo(10, this.player.position));
    }
}
