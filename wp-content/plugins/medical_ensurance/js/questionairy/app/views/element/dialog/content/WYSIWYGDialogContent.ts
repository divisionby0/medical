///<reference path="TextEditableDialogContent.ts"/>
declare var WYSIWYGEditor; // plane js class
class WYSIWYGDialogContent extends TextEditableDialogContent{

    protected wysiwygEditor:any;
    
    constructor(parent:any) {
        super(parent);
    }

    init():void {
        super.init();
        this.wysiwygEditor.getContent();
    }

    destroy():void {
        this.wysiwygEditor.destroy();
    }

    onConfirm():void{
        this.text = this.wysiwygEditor.getContent();
        this.onConfirmed();
    }

    protected onConfirmed():void{
        super.onConfirmed();
        if(this.isTextValid){
            
        }
        else{
            this.addTextErrorText();
        }
    }

    protected createChildren():void {
        this.html += this.createParentText();

        this.html += '<p>'+this.getTextInputLegendText()+'</p>';
        this.html += this.createTextInput();
        this.html += this.createTextInputErrorText();
        this.html += '</div>';

        this.createWysiwygEditor();
    }
    
    protected createWysiwygEditor():void{
        this.wysiwygEditor = new WYSIWYGEditor();
        this.wysiwygEditor.init('dataTextInput');
    }
    
    protected createTextInput():string {
        return '<div id="dataTextInput"></div>';
    }
}