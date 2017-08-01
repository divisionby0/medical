///<reference path="NodeTreeRendererPDF.ts"/>
class AnswerRendererPDF extends NodeTreeRendererPDF{
    
    constructor(data:Question, container:any){
        super(data, container);
    }

    protected createChildrenContainer():void{
        this.childrenContainer = this.$j('<tr id="childrenContainer"></tr>');
        this.container.append(this.childrenContainer);
    }
}