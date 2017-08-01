///<reference path="../NodeDialogEventType.ts"/>
///<reference path="content/QuestionCreateDialogContent.ts"/>
///<reference path="Dialog.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
class CreateQuestionDialog extends Dialog{
    constructor(parent:string){
        super(parent);
    }
    
    protected createContent():void {
        this.content = new QuestionCreateDialogContent(this.parent);
        EventBus.addEventListener(NodeDialogEventType.CREATE, ()=>this.onConfirm());
    }
    protected onConfirm():void{
        EventBus.removeEventListener(NodeDialogEventType.CREATE, ()=>this.onConfirm());
        this.close();
    }

    protected createHeaderText():string{
        return '<h4>Question creation</h4>';
    }

    protected confirmBtnClickHandler():void{
        (this.content as QuestionCreateDialogContent).onConfirm();
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
