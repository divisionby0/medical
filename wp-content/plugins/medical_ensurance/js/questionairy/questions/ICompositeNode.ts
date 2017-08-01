///<reference path="../../collections/iterators/MapIterator.ts"/>
interface ICompositeNode{
    getId():number;
    getData():any;
    getIterator():MapIterator;
    getIndex():number;
    setIndex(index:number):void;

    setText(text:string):void;
    getText():string;

    setTextShowAtResult(value:boolean):void;
    getTextShowAtResult():boolean;
    
    getType():string;
}
