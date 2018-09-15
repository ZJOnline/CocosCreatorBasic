import { handler, gen_handler } from "./Utils";
import { UIPoolMgr } from "./UIPoolMgr";
import * as utils from './Utils'
import { TimerMgr } from "./TimerMgr";
import { UIBase } from "./UIBase";
import { TweenFunc } from "./tweenfunc";
import { TweenUtil } from "./TweenUtil";
import SceneManager from "./SceneManager/SceneManager";

export class UIManager {
    private static inst: UIManager;
    private ui_cache: any;           //path => pop_ui
    private ui_stack: Array<string>; //ui stacks
    private ui_show_handler: handler;
    private ui_hide_handler: handler;

    private constructor() {
        this.ui_cache = {};
        this.ui_stack = new Array<string>();
    }

    static get_inst(): UIManager {
        if (!this.inst) {
            this.inst = new UIManager();
        }
        return this.inst;
    }

    private get_ui(path: string): pop_ui {
        let ui: pop_ui = this.ui_cache[path];
        if (!ui) {
            this.ui_cache[path] = ui = { node: null, is_show: false };
        }
        return ui;
    }

    clear() {
        for (let path in this.ui_cache) {
            this.hide(path);
        }
        this.ui_cache = {};
        this.ui_stack.length = 0;
    }

    peek() {
        return this.ui_stack[this.ui_stack.length - 1];
    }

    set_handlers(on_ui_show: handler, on_ui_hide: handler) {
        this.ui_show_handler = on_ui_show;
        this.ui_hide_handler = on_ui_hide;
    }

    is_show(path: string): boolean {
        let ui: pop_ui = this.ui_cache[path];
        return ui != null;
    }

    show(path: string, transition?: UI_TRANSITION, ...params: any[]): void {
        let ui: pop_ui = this.get_ui(path);
        if (ui.is_show) {
            return;
        }
        ui.is_show = true;
        UIPoolMgr.get_inst().get_ui(path, gen_handler((node: cc.Node): void => {
            if (!ui.is_show) {
                UIPoolMgr.get_inst().put_ui(path, node);
                return;
            }
            ui.node = node;
            //应用过渡效果
            this.applyTransitionEffect(node, transition);
            // cc.director.getScene().addChild(node);
            SceneManager.Instance.normal.addChild(node);
            TimerMgr.getInst().once(0, utils.gen_handler(() => {
                //在加到场景同一帧调用界面show方法，计算位置会不准确，故统一在下一帧调用show
                if (!ui.is_show) {
                    return;
                }
                let ui_base: UIBase = node.getComponent(UIBase);
                ui_base.ui_name = path;
                ui_base.__show__(...params);
                //进栈
                this.ui_stack.push(path);
                //钩子函数调用
                if (this.ui_show_handler) {
                    this.ui_show_handler.exec();
                }
            }));
        }, this));
    }

    //关闭界面时不destroy，只是从父节点移除并缓存
    hide(path: string): void {
        let ui: pop_ui = this.ui_cache[path];
        if (!ui) {
            return;
        }
        this.ui_cache[path] = null;
        ui.is_show = false;
        if (ui.node) {
            UIPoolMgr.get_inst().put_ui(path, ui.node);
            //调用hide
            let ui_base: UIBase = ui.node.getComponent(UIBase);
            ui_base.__hide__();
            //出栈
            const lastIdx = this.ui_stack.lastIndexOf(path);
            if (lastIdx != -1) {
                this.ui_stack.splice(lastIdx, 1);
            }
            //钩子函数调用
            if (this.ui_hide_handler) {
                this.ui_hide_handler.exec();
            }
        }
    }

    applyTransitionEffect(node: cc.Node, transition: UI_TRANSITION) {
        if (transition && transition.transType == UI_TRANSITION_TYPE.None) {
            return;
        }
        transition = transition || {
            transType: UI_TRANSITION_TYPE.FadeIn,
            duration: 0.5,
            tweenFunc: TweenFunc.Linear
        };
        switch (transition.transType) {
            case UI_TRANSITION_TYPE.FadeIn:
                TweenUtil.from({ node, duration: transition.duration || 1, opacity: 0, tweenFunc: transition.tweenFunc || TweenFunc.Linear });
                break;
            case UI_TRANSITION_TYPE.RightIn:
                // TweenUtil.from({ node, duration: transition.duration || 1, x: -50, tweenFunc: transition.tweenFunc || TweenFunc.Linear });
                break;
        }
    }
}

type pop_ui = {
    node: cc.Node;
    is_show: boolean;
}

//界面prefab路径配置, 相对于assets/resources目录
export const UI_CONFIG = {
    GameStartUI: "Prefabs/GameStartUI",
    BackUI: "Prefabs/BackUI",
}

interface UI_TRANSITION {
    transType: UI_TRANSITION_TYPE;
    tweenFunc?: Function;
    duration?: number;
}

export const enum UI_TRANSITION_TYPE {
    None = 1,
    FadeIn,
    DropDown,
    PopUp,
    LeftIn,
    RightIn,
}

export enum UI_POP_TYPE {
    Normal = 1,
    Pop = 2,
}