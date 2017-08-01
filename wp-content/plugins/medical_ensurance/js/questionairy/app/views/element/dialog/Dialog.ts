///<reference path="../IHtmlElement.ts"/>
///<reference path="../../../../../libs/bootstrap/typescriptDef/index.d.ts"/>
///<reference path="../../../../../libs/jqueryTS/jquery.d.ts"/>
class Dialog{
    protected content:IHtmlElement;
    protected parent:any;
    private html:string;
    protected header:string = "Dialog header";

    private $j:any;

    constructor(parent:any){
        this.$j = jQuery.noConflict();

        this.parent = parent;
        this.createContent();

        this.createHtml();
        this.createBtnListener();
        this.createCloseListener();
    }

    protected onConfirm():void{
    }

    private createBtnListener():void{
        this.$j("#confirmButton").click(()=>this.confirmBtnClickHandler());
    }
    private removeBtnListener():void{
        this.$j("#confirmButton").unbind('click');
    }

    protected confirmBtnClickHandler():void{
    }

    private createCloseListener():void {
        this.$j('#dynamicModal').on('hidden.bs.modal', ()=>this.close());
    }
    private removeCloseListener():void {
        this.$j('#dynamicModal').off('hidden.bs.modal', ()=>this.close());
    }

    protected close():void{
        this.removeBtnListener();
        this.removeCloseListener();
        
        if(this.content){
            this.content.destroy();
        }
        this.$j('.modal.in').modal('hide');
        this.$j('body').removeClass('modal-open');
        this.$j('.modal-backdrop').remove();
        this.$j('#dynamicModal').remove();
    }

    protected createContent():void{
    }

    private createHtml():void{
        this.html =  '<div id="dynamicModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';

        var contentHtml:string = "";
        if(this.content){
            contentHtml = this.content.getHtml();
        }

        this.html += '<div class="modal-dialog">';
        this.html += '<div class="modal-content">';
        this.html += '<div class="modal-header">';
        this.html += '<a class="close" data-dismiss="modal">×</a>';
        this.html += this.createHeaderText();
        this.html += '</div>';
        this.html += '<div class="modal-body">';
        
        this.html += contentHtml;

        this.html += this.createFooter();

        this.$j('body').append(this.html);
        this.$j("#dynamicModal").modal();
        this.$j("#dynamicModal").modal('show');

        if(this.content) {
            this.content.init();
        }
    }

    protected createHeaderText():string{
        return '<h4>'+this.header+'</h4>';
    }

    protected createFooter():string{
        var footerHtml:string = '<div class="modal-footer">';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>';// content
        footerHtml += '</div>';// dialog
        footerHtml += '</div>';// footer
        footerHtml += '</div>';// modalWindow

        return footerHtml;
    }
}
