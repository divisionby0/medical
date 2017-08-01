///<reference path="../QuestionRenderer.ts"/>
///<reference path="CreateBooleanQuestionChildren.ts"/>
///<reference path="../../RendererType.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
class BooleanQuestionRenderer extends QuestionRenderer{
    private negativeChildren:any[];
    private positiveChildren:any[];
    private checked:boolean;

    private negativeValueString:string;
    private positiveValueString:string;

    constructor(data:Question, container:any){
        super(data, container);
    }

    hasUserValue():boolean{
        // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
        var isPositiveValue:boolean = this.value == this.positiveValueString;

        if(isPositiveValue){
            return true;
        }
        else{
            var hasChildrenWithUserValue:boolean = this.isChildrenHasUserValue();

            if(hasChildrenWithUserValue){
                this.onError();
            }
            return hasChildrenWithUserValue;
        }
    }

    clear():void{
        this.checked = false;
        this.enabled = false;

        this.control.prop( "checked", false );

        this.hideError();
        this.onCheckBoxChanged();
    }
    
    protected getCollectionToTraverse():any[]{
        return this.positiveChildren;
    }

    protected createChildren():void{
        this.negativeValueString = 'No';
        this.positiveValueString = 'Yes';

        this.answer = this.data.getAnswer();
        this.value = this.answer.getValue();

        this.setInitValue();

        super.createChildren();

        this.createNegativeChildren();
        this.createPositiveChildren();

        this.createCheckboxListener();
    }

    private createNegativeChildren():void{
        var negativeVariation:AnswerVariation = (this.answer as BooleanAnswer).getNegativeVariation();
        var negativeChildQuestionsIterator:MapIterator = negativeVariation.getIterator();
       
        var negativeChildrenCreator:CreateBooleanQuestionChildren = new CreateBooleanQuestionChildren(negativeChildQuestionsIterator, this.childrenContainer, true);
        this.negativeChildren = negativeChildrenCreator.getCollection();
    }

    private createPositiveChildren():void{
        var positiveVariation:AnswerVariation = (this.answer as BooleanAnswer).getPositiveVariation();
        var positiveChildQuestionsIterator:MapIterator = positiveVariation.getIterator();

        var positiveChildrenCreator:CreateBooleanQuestionChildren = new CreateBooleanQuestionChildren(positiveChildQuestionsIterator, this.childrenContainer, false);
        this.positiveChildren = positiveChildrenCreator.getCollection();
    }

    protected getControl():any{
        if(this.value == this.positiveValueString){
            return this.$j('<input type="checkbox" value="" checked="checked" class="questionContent control">');
        }
        else{
            return this.$j('<input type="checkbox" value="" class="questionContent control">');
        }
    }

    private createCheckboxListener():void {
        this.control.change(()=>this.onCheckBoxChanged());
    }

    private onCheckBoxChanged():void{
        this.enabled = this.control.is(':checked');
        this.checked = this.enabled;

        if(this.checked){
            this.hideError();
        }

        this.onCheckedChanged();
        this.onEnabledChanged();

        this.updateAnswer();
    }

    private clearChildren():void{
        for(var i:number = 0; i<this.positiveChildren.length; i++){
            this.positiveChildren[i].clear();
        }
    }

    // TODO нарушение инкапсуляции !!!
    private updateAnswer():void{
        var answerValue:any;
        if(this.enabled){
            answerValue = this.positiveValueString;
        }
        else{
            answerValue = this.negativeValueString;
            
        }
        this.answer.setValue(answerValue);
        EventBus.dispatchEvent("ANSWER_VALUE_CHANGED", {questionId:this.data.getId(), answerValue:answerValue});
    }

    private onCheckedChanged():void {
        if(this.checked){
            this.enablePositive();
            this.enableNegative();
        }
        else{
            this.disableNegative();
            this.disablePositive();
            this.clearChildren();
        }
    }

    protected onEnabledChanged():void
    {
        if(!this.enabled){
            this.updateChildrenEnabled(false);
        }
        else{
            this.updateChildrenEnabled(this.checked);
        }
    }

    protected updateChildrenEnabled(enabled:boolean):void{
        if(enabled){
            this.enablePositive();
            this.enableNegative();
        }
        else{
            this.disablePositive();
            this.disableNegative();
        }
    }

    private disableNegative():void{
        for(var i:number = 0; i<this.negativeChildren.length; i++){
            this.negativeChildren[i].setEnabled(false);
        }
    }
    private enableNegative():void{
        for(var i:number = 0; i<this.negativeChildren.length; i++){
            this.negativeChildren[i].setEnabled(true);
        }
    }

    private disablePositive():void{
        for(var i:number = 0; i<this.positiveChildren.length; i++){
            this.positiveChildren[i].setEnabled(false);
        }
    }
    private enablePositive():void{
        for(var i:number = 0; i<this.positiveChildren.length; i++){
            this.positiveChildren[i].setEnabled(true);
        }
    }

    private setInitValue():void {

        if(this.value == this.positiveValueString){
            this.enabled = this.checked = true;
        }
        else{
            this.enabled = this.checked = false;
        }
    }

    private onError():void {
        this.showError();
    }
}