///<reference path="Dialog.ts"/>
///<reference path="content/AnswerCreationDialogContent.ts"/>
///<reference path="../NodeDialogEventType.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
class CreateAnswerDialog extends Dialog{
    constructor(parent:string){
        super(parent);
    }

    protected createContent():void {
        this.content = new AnswerCreationDialogContent(this.parent);
        this.content.init();
        EventBus.addEventListener(NodeDialogEventType.CREATE, ()=>this.onConfirm());
    }
    protected onConfirm():void{
        EventBus.removeEventListener(NodeDialogEventType.CREATE, ()=>this.onConfirm());
        this.close();
    }

    protected createHeaderText():string{
        return '<h4>Answer creation</h4>';
    }

    protected confirmBtnClickHandler():void{
        (this.content as AnswerCreationDialogContent).onConfirm();
    }

    // TODO refactor to move into parent class
    protected createFooter():string{
        var footerHtml:string = '<div class="modal-footer">';
        footerHtml += '<span id="confirmButton" class="btn btn-success">Create</span>';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>';// content
        footerHtml += '</div>';// dialog
        footerHtml += '</div>';// footer
        footerHtml += '</div>';// modalWindow

        return footerHtml;
    }
}
