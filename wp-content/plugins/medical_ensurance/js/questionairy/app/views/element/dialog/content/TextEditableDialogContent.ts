///<reference path="../../IHtmlElement.ts"/>
///<reference path="../../NodeDialogEventType.ts"/>
///<reference path="../../../../../questions/parsers/ObjectType.ts"/>
///<reference path="../../../../../../libs/jqueryTS/jquery.d.ts"/>
class TextEditableDialogContent implements IHtmlElement {

    protected isTextValid:boolean = false;
    protected html:string = '';
    protected parent:any;
    protected text:string;
    protected children:IHtmlElement[] = new Array();

    protected $j;

    constructor(parent:any) {
        this.$j = jQuery.noConflict();

        this.parent = parent;
        this.createChildren();
        this.removeTextErrorText();
    }

    getHtml():string {
        return this.html;
    }

    init():void {
        this.createTextInputListener();
    }

    destroy():void {
        this.$j("#dataTextInput").val('');
    }

    protected createChildren():void {
        
        this.html += this.createParentText();

        this.html += '<p>'+this.getTextInputLegendText()+'</p>';
        this.html += this.createTextInput();
        this.html += this.createTextInputErrorText();
        this.html += '</div>';
    }

    onConfirm():void{
        this.text = this.$j("#dataTextInput").val();
        this.onConfirmed();
    }
    
    protected onConfirmed():void{
        this.isTextValid = this.validateText();
    }

    protected validateText():boolean{
        if(this.text.length > 0){
            return true;
        }
        else{
            return false;
        }
    }
    
    protected getTextInputLegendText():string{
        return "";
    }
    
    protected createTextInput():string {
        return '<input type="text" class="form-control" id="dataTextInput">';
    }

    protected createTextInputErrorText():string {
        return '<span class="label label-danger hidden" id="textInputErrorText">Incorrect. Must be at least 1 character.</span>';
    }

    protected createParentText():string {
        console.log("createParentText()",this.parent);
        return '<h4>Parent: <span class="label parentNodeContent" id="parentNodeTextContainer">' + this.parent + '</span></h4>';
    }

    private createTextInputListener():void {
        this.$j("#dataTextInput").keydown(()=>this.onTextInputChangeHandler());
    }

    private removeTextInputListener():void {
        this.$j("#dataTextInput").unbind('keydown');
    }
    
    protected addTextErrorText():void {
        this.$j("#textInputErrorText").removeClass("hidden");
    }

    private removeTextErrorText():void {
        this.$j("#textInputErrorText").addClass("hidden");
    }

    private onTextInputChangeHandler():void {
        this.removeTextErrorText();
    }
}

