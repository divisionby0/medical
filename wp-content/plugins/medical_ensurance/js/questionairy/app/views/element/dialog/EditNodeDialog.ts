///<reference path="Dialog.ts"/>
///<reference path="content/EditNodeDialogContent.ts"/>
class EditNodeDialog extends Dialog{
    constructor(parent:any){
        super(parent);
    }

    protected createContent():void {
        this.content = new EditNodeDialogContent(this.parent);
        //this.content.init();
        EventBus.addEventListener(NodeDialogEventType.UPDATE, ()=>this.onConfirm());
    }

    protected onConfirm():void{
        EventBus.removeEventListener(NodeDialogEventType.UPDATE, ()=>this.onConfirm());
        this.close();
    }

    protected confirmBtnClickHandler():void{
        (this.content as EditNodeDialogContent).onConfirm();
    }

    protected createHeaderText():string{
        return '<h4>Node edit</h4>';
    }

    // TODO refactor to move into parent class
    protected createFooter():string{
        var footerHtml:string = '<div class="modal-footer">';
        footerHtml += '<span id="confirmButton" class="btn btn-success">Save</span>';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>';// content
        footerHtml += '</div>';// dialog
        footerHtml += '</div>';// footer
        footerHtml += '</div>';// modalWindow

        return footerHtml;
    }
}