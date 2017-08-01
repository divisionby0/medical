///<reference path="../../select/Select.ts"/>
///<reference path="../../../../TypeSelectElementData.ts"/>
///<reference path="../../NodeDialogEventType.ts"/>
///<reference path="WYSIWYGDialogContent.ts"/>
///<reference path="PlaceholderInputElement.ts"/>
///<reference path="../../../../../../events/EventBus.ts"/>
class QuestionCreateDialogContent extends WYSIWYGDialogContent{
    
    private isTypeValid:boolean = false;

    private questionType:string = "";
    private showTextAtResultComboBox:any;
    private showTextAtResult:boolean;
    
    private placeholderContainer:any;
    private placeholderInputElement:PlaceholderInputElement;

    constructor(parent:any){
        super(parent);
    }

    init():void {
        super.init();

        this.showTextAtResult = true;
        this.placeholderContainer = this.$j('#placeholderContainer');
        
        for(var i:number=0; i<this.children.length; i++){
            var element:IHtmlElement = this.children[i];
            element.init();
        }
        
        this.setFocusOnInput();
        this.createSelectListener();
        this.createShowAtResultComboBoxListener();
    }

    destroy():void {
        super.destroy();
        for(var i:number=0; i<this.children.length; i++){
            var element:IHtmlElement = this.children[i];
            element.destroy();
        }
        this.removeSelectListener();
    }

    // override
    protected createChildren():void {

        var typeSelectElementData:TypeSelectElementData = new TypeSelectElementData();
        var select:IHtmlElement = new Select("Select question type",typeSelectElementData.getData());

        this.html += this.createParentText();
        this.html += this.createTextInput();
        this.html += this.createTextInputErrorText();
        
        this.html += this.createPlaceholderContainer();
        
        this.html += '<p>Answer type:</p>';
        this.html += select.getHtml();
        this.html += this.typeSelectErrorText();
        this.html += this.createShowTextAtResultCheckBox();
        this.html += '</div>';

        this.children.push(select);
        this.createWysiwygEditor();
    }

    // override
    protected onConfirmed():void{
        super.onConfirmed();

        if(this.isTextValid){

            this.isTypeValid = this.validateType();

            if(this.isTypeValid){
                var data:any = this.getData();
                EventBus.dispatchEvent(NodeDialogEventType.CREATE, data);
            }
            else{
                this.addTypeErrorText();
            }
        }
        else{
            this.addTextErrorText();
        }
    }

    private getData():any {
        var data:any = {text:this.text, type:this.questionType, showTextAtResult:this.showTextAtResult};

        if(this.questionType == ObjectType.TEXT_INPUT_ANSWER || this.questionType == ObjectType.DATE_SELECTION_ANSWER){
            data.placeholderText = this.getPlaceholderInputText();
        }
        return data;
    }

    private validateType():boolean{
        if(this.questionType == ""){
            return false;
        }
        else{
            return true;
        }
    }

    private createPlaceholderInputElement():void{
        this.placeholderInputElement = new PlaceholderInputElement(this.placeholderContainer);
    }
    private removePlaceholderInputElement():void {
        if(this.placeholderInputElement){
            this.placeholderInputElement.destroy();
            this.placeholderInputElement = null;
        }
    }
    private getPlaceholderInputText():string {
        return this.placeholderInputElement.getText()
    }

    private typeSelectErrorText():string{
        return '<span class="label label-danger hidden" id="typeSelectErrorText">Incorrect. You must select type.</span>';
    }
    private addTypeErrorText():void{
        this.$j("#typeSelectErrorText").removeClass("hidden");
    }
    private removeTypeErrorText():void{
        this.$j("#typeSelectErrorText").addClass("hidden");
    }

    private setFocusOnInput():void{
        this.$j('#questionTextInput').focus();
    }

    private createShowTextAtResultCheckBox():string{
        return '<input type="checkbox" checked="checked" id="showTextAtResultCombo"> show text at result';
    }
    private createShowAtResultComboBoxListener():void{
        this.showTextAtResultComboBox = this.$j('#showTextAtResultCombo');
        this.showTextAtResultComboBox.change(()=>this.showAtResultComboBoxChanged());
    }

    private showAtResultComboBoxChanged():void {
        this.showTextAtResult = this.showTextAtResultComboBox.is(":checked");
    }

    private createSelectListener():void {
        EventBus.addEventListener(SelectEventType.SELECTED_ITEM_CHANGED, (data)=>this.onTypeChanged(data));
    }
    private removeSelectListener():void {
        EventBus.removeEventListener(SelectEventType.SELECTED_ITEM_CHANGED, (data)=>this.onTypeChanged(data));
    }

    private onTypeChanged(data:any):void{
        this.questionType = data.id;
        this.removeTypeErrorText();

        this.removePlaceholderInputElement();
        
        if(this.questionType == ObjectType.TEXT_INPUT_ANSWER || this.questionType == ObjectType.DATE_SELECTION_ANSWER){
            this.createPlaceholderInputElement();
        }
    }

    private createPlaceholderContainer():string {
        return '<div id="placeholderContainer"></div>';
    }
}
