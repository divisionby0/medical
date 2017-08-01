///<reference path="TextViewAnswerRenderer.ts"/>
///<reference path="TextInputAnswerRenderer.ts"/>
class DateAnswerRenderer extends TextInputAnswerRenderer{
    constructor(data:Question, container:any){
        super(data, container);
    }

    protected orderChildren():void{

    }
}
