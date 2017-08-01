///<reference path="TextInputAnswerRenderer.ts"/>
class TextViewAnswerRenderer extends TextInputAnswerRenderer{
    constructor(data:Question, container:any){
        super(data, container);
    }

    protected updateText():void{
        var resultContainerPrefix:string = '<div style="display: block; float: left; width: 100%;">';
        var questionText:string = "<div style='display: block; float: left; width: 100%;'>"+this.data.getText()+"</div>";
        var resultContainerPostfix:string = '</div>';

        var resultHtml:string = resultContainerPrefix+questionText+resultContainerPostfix;
        this.textLabel.html(resultHtml);
    }
}
