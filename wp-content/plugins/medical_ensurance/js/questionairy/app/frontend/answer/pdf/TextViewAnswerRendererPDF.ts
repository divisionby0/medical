///<reference path="../../../../questions/question/Question.ts"/>
///<reference path="TextInputAnswerRendererPDF.ts"/>
class TextViewAnswerRendererPDF extends TextInputAnswerRendererPDF{
    
    constructor(data:Question, container:any){
        super(data, container);
    }

    protected createText():void {
        this.textLabel = this.$j('<tr></tr>');
        this.childrenContainer.append(this.textLabel);
    }

    protected createChildrenContainer():void{
        this.childrenContainer = this.$j('<table id="children"></table>');
        this.container.append(this.childrenContainer);
    }
}
