///<reference path="../../IHtmlElement.ts"/>
///<reference path="../../NodeDialogEventType.ts"/>
///<reference path="../../../../../../events/EventBus.ts"/>
class RemoveNodeConfirmationDialogContent implements IHtmlElement{
    private parent:any;
    private html:string = "";
    
    constructor(parent:any){
        this.parent = parent;
        this.createChildren();
    }
    
    getHtml():string {
        return this.html;
    }

    init():void {
    }

    destroy():void {
    }

    onConfirm():void{
        EventBus.dispatchEvent(NodeDialogEventType.REMOVE, this.parent);
    }

    private createChildren() {
        this.html += this.createParentText();
    }

    private createParentText():string{
        var text:string = this.parent.object.getText();
        return '<h3>Really want to remove:</h3><h4><div class="label removeNodeLabel" id="parentNodeTextContainer">'+text+'</div></h4><h4>and all its content ?</h4>';
    }
}
