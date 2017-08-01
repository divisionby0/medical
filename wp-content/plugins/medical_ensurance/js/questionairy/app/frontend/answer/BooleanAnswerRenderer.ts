///<reference path="../../../questions/answer/variation/AnswerVariation.ts"/>
///<reference path="AnswerRenderer.ts"/>
///<reference path="../../../questions/answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../question/QuestionRenderer.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
class BooleanAnswerRenderer extends AnswerRenderer{

    private negativeChildren:any[];
    private positiveChildren:any[];

    private negativeValueString:string;
    private positiveValueString:string;

    private negativeColor:string;
    private positiveColor:string;

    private valueColor:string;

    private isNegative:boolean = false;

    constructor(data:Question, container:any){
        super(data, container);
    }
    
    protected createChildren():void{
        this.positiveValueString = 'Yes';
        this.negativeColor = 'red';
        this.positiveColor = 'blue';

        this.answer = this.data.getAnswer();
        this.value = this.answer.getValue();
        
        this.updateValueColor();

        this.createChildrenContainer();
        this.createText();
        this.updateText();

        this.createNegativeChildren();
        this.createPositiveChildren();

        if(this.value != this.positiveValueString){
            this.childrenContainer.addClass("negativeValue");
        }
    }

    protected updateText():void{
        var resultContainerPrefix:string = '<div style="display: block; float: left; width: 100%;">';
        var questionText:string = "<div style='display: block; float: left;'>"+this.data.getText()+"</div>";
        var answerText:string = '<div style="float: left; display: block; padding-left: 20px;"><b style="color:'+this.valueColor+';"><u>   '+this.value+'</u></b></div>';
        var resultContainerPostfix:string = '</div>';

        var resultHtml:string = resultContainerPrefix+questionText+answerText+resultContainerPostfix;
        this.textLabel.html(resultHtml);
    }

    private updateValueColor():void{
        if(this.value == this.positiveValueString){
            this.valueColor = this.positiveColor;
        }
        else{
            this.valueColor = this.negativeColor;
        }
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
}
