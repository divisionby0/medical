///<reference path="QuestionRenderer.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
class DateSelectQuestionRenderer extends TextInputQuestionRenderer{

    constructor(data:Question, container:any){
        super(data, container);
    }

    protected getControl():any{
        this.textInput = this.$j('<input id="dateSelectContainer" value="'+this.value+'" placeholder="'+this.placeholderText+'">');
        this.createDatepicker();
        return this.textInput;
    }

    private createDatepicker():void{
        this.textInput.datepicker({onSelect:()=>this.onDateChanged(),
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:2100"});
    }

    protected createTextInputListener():void {
    }

    private onDateChanged():void {
        this.onTextInputChanged();
    }
}
