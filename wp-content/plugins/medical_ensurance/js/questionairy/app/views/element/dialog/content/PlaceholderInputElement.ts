///<reference path="../../../../../../libs/jqueryTS/jquery.d.ts"/>
class PlaceholderInputElement{

    private container:any;
    private placeholderElement:any;

    private $j:any;

    constructor(container:any){
        this.$j = jQuery.noConflict();
        this.container = container;
        this.placeholderElement = this.$j('<label>placeholder text  <input type="text" placeholder="placeholder text here" id="placeholderInput"></label>');
        this.container.append(this.placeholderElement);
    }

    getText():string{
        return this.$j('#placeholderInput').val();
    }
    setText(text:string):void{
        this.$j('#placeholderInput').val(text);
    }
    
    destroy():void{
        this.container.empty();
    }
}
