/**
 *    Title: UI框架项目
 *           主题: 队列  
 *           功能: 先进先出
 *   
 *           
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class Queue<T>
{
    private first: Node<T>;
    private last: Node<T>;
    private length = 0;

    /**
     * 尾部添加元素（进队）
     * @param items 元素列表
     * @returns 长度
     */
    enqueue(...items: T[]) {
        items.forEach(item => {
            var node: Node<T> = { item: item, next: null };
            if (this.last) this.last.next = node;
            this.last = node;
            if (!this.first) this.first = node;
            this.length++;
        });
        return this.length;
    }

    /**
     * 头部移除元素（出队）
     */
    dequeue() {
        var removeitem = this.first ? this.first.item : undefined;
        if (this.length == 1)
            this.first = this.last = null;
        if (this.first)
            this.first = this.first.next;
        return removeitem;
    }

    /**
     * 转换为数组
     */
    toArray() {
        var arr: T[] = [];
        var node = this.first;
        while (node) {
            arr.push(node.item);
            node = node.next;
        }
        return arr;
    }

    /**
     * 从数组初始化链表
     */
    fromArray(array: T[]) {
        this.first = this.last = null;
        this.enqueue.apply(this, array);
        return this;
    }
}

interface Node<T> {
    item: T;
    next: Node<T>;
}
