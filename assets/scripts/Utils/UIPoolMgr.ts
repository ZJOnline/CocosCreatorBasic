import { LoaderMgr } from "./LoaderMgr";
import { handler } from "./Utils";
import { UIPool } from "./UIPool";


export class UIPoolMgr
{
    private static _inst:UIPoolMgr;
    private UIPool:UIPool;

    private constructor()
    {
        this.UIPool = new UIPool(); 
    }

    static get_inst():UIPoolMgr
    {
        if(!this._inst)
        {
            this._inst = new UIPoolMgr();
        }
        return this._inst;
    }

    /**
     * 获取ui，先走缓存池，没有的话就重新加载
     * @param path 资源路径
     * @param cb 回调
     */
    get_ui(path:string, cb:handler):void
    {
        let ui:cc.Node = this.UIPool.get(path);
        if(ui)
        {
            // cc.info("UIPoolMgr:get_ui from cache", path);
            cb.exec(ui);
            return;
        }
        // cc.info("UIPoolMgr:get_ui from loader", path);
        LoaderMgr.get_inst().loadPrefabObj(path, cb);
    }

    put_ui(path:string, ui:cc.Node):void
    {
        if(!ui)
        {
            cc.warn("UIPoolMgr:put_ui, invalid node");
            return;
        }
        this.UIPool.put(path, ui);
    }

    clear_atpath(path:string)
    {
        this.UIPool.clear_atpath(path);
    }

    clear()
    {
        this.UIPool.clear();
    }

    dump()
    {
        this.UIPool.dump();
    }
}