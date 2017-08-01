///<reference path="Dialog.ts"/>
///<reference path="content/WYSIWYGDialogContent.ts"/>

class WYSIWYGTestDialog extends Dialog{
    protected createContent():void {
        this.content = new WYSIWYGDialogContent(this.parent);
        this.content.init();
    }

    protected onConfirm():void{
        this.close();
    }

    protected confirmBtnClickHandler():void{
        (this.content as WYSIWYGDialogContent).onConfirm();
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
