///<reference path="Dialog.ts"/>
///<reference path="content/RemoveNodeConfirmationDialogContent.ts"/>
///<reference path="../NodeDialogEventType.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
class RemoveNodeConfirmationDialog extends Dialog{

    constructor(parent:any){
        super(parent);
    }

    protected createContent():void {
        this.content = new RemoveNodeConfirmationDialogContent(this.parent);
        EventBus.addEventListener(NodeDialogEventType.REMOVE, ()=>this.onConfirm());
    }
    protected onConfirm():void{
        EventBus.removeEventListener(NodeDialogEventType.REMOVE, ()=>this.onConfirm());
        this.close();
    }

    protected createHeaderText():string{
        return '<h4 class="removeConfirmationDialogHeader">Remove confirmation</h4>';
    }

    protected confirmBtnClickHandler():void{
        (this.content as RemoveNodeConfirmationDialogContent).onConfirm();
    }

    // TODO refactor to move into parent class
    protected createFooter():string{
        var footerHtml:string = '<div class="modal-footer">';
        footerHtml += '<span id="confirmButton" class="btn btn-success">Remove</span>';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>';// content
        footerHtml += '</div>';// dialog
        footerHtml += '</div>';// footer
        footerHtml += '</div>';// modalWindow

        return footerHtml;
    }
}
