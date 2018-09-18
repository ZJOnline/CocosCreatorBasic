

const { ccclass, property } = cc._decorator;

@ccclass
export default class JsonReader extends cc.Component {



    // onLoad () {}

    start () {
        cc.loader.loadRes("Data/randName", (err, res) => {
            console.log(res.json[1].name1);
        });
    }

    // update (dt) {}
}
