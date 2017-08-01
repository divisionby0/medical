///<reference path="CollectionEventDispatcher.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="../sort/SortChildren.ts"/>
class SortableCollection extends CollectionEventDispatcher implements ICompositeNode{
    
    protected index:number = 0;

    getId():number {
        return undefined;
    }
    
    getData():any {
        return undefined;
    }

    getIterator():MapIterator {
        return undefined;
    }

    getIndex():number {
        return this.index;
    }

    setIndex(index:number):void {
        this.index = index;
    }

    setText(text:string):void {
    }

    getText():string {
        return undefined;
    }

    setTextShowAtResult(value:boolean):void {
    }

    getTextShowAtResult():boolean {
        return undefined;
    }

    getType():string {
        return undefined;
    }

    protected sortChildren(nodes:any[]):void{
        new SortChildren(nodes);
    }
}
