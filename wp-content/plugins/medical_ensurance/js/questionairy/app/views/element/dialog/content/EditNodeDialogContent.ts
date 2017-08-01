///<reference path="TextEditableDialogContent.ts"/>
///<reference path="WYSIWYGDialogContent.ts"/>
///<reference path="PlaceholderInputElement.ts"/>
///<reference path="../../../../../questions/answer/textAnswer/TextInputAnswer.ts"/>
///<reference path="../../../../../questions/ICompositeNode.ts"/>

class EditNodeDialogContent extends WYSIWYGDialogContent{

    private type:string = "";
    private showTextAtResultComboBox:any;
    private showTextAtResult:boolean;

    private placeholderContainer:any;
    private placeholderInputElement:PlaceholderInputElement;

    private data:any;

    constructor(parent:any){
        super(parent);
    }
    init():void {
        super.init();

        this.data = this.parent.object;

        this.createShowAtResultComboBoxListener();
        this.placeholderContainer = this.$j('#placeholderContainer');

        this.type = this.data.getType();

        this.showTextAtResult = this.data.getTextShowAtResult();

        this.updateShowTextAtResultCombo();
        this.updateAnswerTypeText();

        if(this.type === ObjectType.TEXT_INPUT_ANSWER || this.type === ObjectType.DATE_SELECTION_ANSWER){
            this.createPlaceholderInputElement();
        }
    }

    private createPlaceholderInputElement():void{
        this.placeholderInputElement = new PlaceholderInputElement(this.placeholderContainer);
        var placeholderText:string = this.data.getPlaceholderText();
        this.placeholderInputElement.setText(placeholderText);
    }

    protected createChildren():void {
        super.createChildren();
        this.html += this.createPlaceholderContainer();
        this.html += this.createShowAtResultCheckBox();

        this.html += '<div id="answerTypeContainer"></div>';
    }

    private createPlaceholderContainer():string {
        return '<div id="placeholderContainer"></div>';
    }

    private createShowAtResultCheckBox():string{
        if(this.showTextAtResult){
            return '<input type="checkbox" id="showTextAtResult" checked="checked"> show text at result';
        }
        else{
            return '<input type="checkbox" id="showTextAtResult"> show text at result';
        }
    }

    private createShowAtResultComboBoxListener():void{
        this.showTextAtResultComboBox = this.$j('#showTextAtResult');
        this.showTextAtResultComboBox.change(()=>this.showAtResultComboBoxChanged());
    }

    private showAtResultComboBoxChanged():void {
        this.showTextAtResult = this.showTextAtResultComboBox.is(":checked");
    }

    protected createTextInput():string {
        return '<div id="dataTextInput">'+this.parent.object.text+'</div>';
    }

    protected createParentText():string {
        return '';
    }

    protected onConfirmed():void{
        super.onConfirmed();

        if(this.isTextValid){
            EventBus.dispatchEvent(NodeDialogEventType.UPDATE, this.getData());
        }
        else{
            this.addTextErrorText();
        }
    }

    private getData():any {
        var data:any = {node:this.parent, text:this.text, showTextAtResult:this.showTextAtResult};

        if(this.type == ObjectType.TEXT_INPUT_ANSWER || this.type === ObjectType.DATE_SELECTION_ANSWER){
            data.placeholderText = this.getPlaceholderInputText();
        }
        return data;
    }

    private getPlaceholderInputText():string {
        return this.placeholderInputElement.getText()
    }

    private updateShowTextAtResultCombo():void {
        if(this.showTextAtResult){
            this.$j('#showTextAtResult').attr("checked","checked");
        }
    }

    private updateAnswerTypeText():void {
        this.$j('#answerTypeContainer').text('Type: '+this.type);
    }
}
