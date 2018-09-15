/**
 *    Title: UI框架项目
 *           主题: 栈
 *           功能: 后进先去
 *      
 *        
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */


interface IStack<T> {
    top(): T;//获取栈顶元素
    push(item: T);//压栈
    pop(): T;//出栈
    empty(): boolean;//是否空栈
    size(): number;//栈大小
}

class Item<T> {
    private _value: T;
    private _next: Item<T>;
    constructor(value: T, next: Item<T> = null) {
        this._value = value;
        this._next = next;
    }
    set value(value: T) {
        this._value = value;
    }
    get value(): T {
        return this._value;
    }
    set next(next: Item<T>) {
        this._next = next;
    }
    get next(): Item<T> {
        return this._next;
    }
}

class Stack<T> implements IStack<T> {
    private _header: Item<T>;
    private _size: number = 0;
    constructor() {
        this._header = new Item<T>(null);
    }
    top(): T {
        if (this._size === 0) {
            return null;
        }
        return this._header.next.value;
    }

    /**
     * 入栈
     * @param item 添加的元素
     * 将header的下一个元素的引用赋值给新元素的next
     * 再将新元素赋值给header的next
     */
    push(item: T) {
        let newItem = new Item<T>(item);
        newItem.next = this._header.next;
        this._header.next = newItem;
        this._size++;
    }

    /**
     * 出栈
     * 将header之后的第一个元素移除
     * 同时修改header的next到下一个元素
     */
    pop(): T {
        if (this._size === 0) {
            return null;
        }
        let item = this._header.next;
        this._header.next = item.next;
        this._size--;
        item.next = null;//清除引用
        return item.value;
    }

    empty(): boolean {
        return this._size === 0;
    }

    size(): number {
        return this._size;
    }
}