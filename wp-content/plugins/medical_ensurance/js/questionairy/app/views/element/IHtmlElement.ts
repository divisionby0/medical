///<reference path="IDestroable.ts"/>
interface IHtmlElement extends IDestroable{
    getHtml():string;
    init():void;
}
