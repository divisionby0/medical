///<reference path="../IHtmlElement.ts"/>
///<reference path="SelectEventType.ts"/>
///<reference path="../../../../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
class Select implements IHtmlElement{

    private html:string = '';
    private label:string = '';
    private items:any[];

    private element:any;
    private selectedItem:any;
    private btnId:string = "btn_"+Math.round(Math.random()*10000);

    private $j:any;
    private elementId:string;

    constructor(label:string, items:any[]){

        this.$j = jQuery.noConflict();

        this.elementId = 'select_'+Math.round(Math.random()*10000);

        this.label = label;
        this.items = items;
        this.createElement();
    }
    
    public getHtml():string{
        return this.html;
    }

    public init():void{
        this.createListener();
    }
    public destroy():void{
        this.removeListener();
    }

    private createElement():void{
        var dropdownPrefix:string = '<div class="dropdown" id="typeSelect">';
        var buttonPrefix:string = '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id="'+this.btnId+'">'+this.label;
        var span:string = '<span class="caret"></span>';
        var buttonPostfix:string = '</button>';
        var dropdownPostfix:string = '</div>';

        var typesContainerPrefix:string = '<ul class="dropdown-menu" id="'+this.elementId+'">';
        var typesContainerPostfix:string = '</ul>';

        this.html += dropdownPrefix;
        this.html += buttonPrefix;
        this.html += span;
        this.html += buttonPostfix;
        this.html += typesContainerPrefix;

        for(var i:number = 0; i<this.items.length; i++){
            var item:any = this.items[i];
            var itemId:string = item.id;
            var itemText:string = item.text;
            var elementHtml:string = '<li id="'+itemId+'"><a class="mouseClickableElement">'+itemText+'</a></li>';
            this.html += elementHtml;
        }
        this.html += typesContainerPostfix;
        this.html += dropdownPostfix;

        this.element = this.$j(this.html);
    }

    private onSelect(item:any):void{
        this.selectedItem = item;
        this.$j("#"+this.btnId).text(this.selectedItem.text);
        EventBus.dispatchEvent(SelectEventType.SELECTED_ITEM_CHANGED, this.selectedItem);
    }

    private createListener():void {
        var context = this;

        var jQueryImpl = this.$j;

        jQueryImpl("#"+this.elementId+" li").on("click",function(){
            var selectedItem:any = {id:jQueryImpl(this).attr('id'), text:jQueryImpl(this).text()};
            context.onSelect(selectedItem);
        });
    }
    private removeListener():void {
        this.$j(".dropdown-menu li").off("click");
    }

}
