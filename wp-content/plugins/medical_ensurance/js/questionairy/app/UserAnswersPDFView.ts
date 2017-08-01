///<reference path="frontend/PDFAnswersRendererFactory.ts"/>
///<reference path="FrontendUserAnswers.ts"/>
///<reference path="frontend/RendererFactoryClass.ts"/>
class UserAnswersPDFView extends FrontendUserAnswers{
    
    constructor(dataString:string, containerId:string){
        super(dataString, containerId);
    }

    protected setAnswerRendererFactory():void{
        console.log("UserAnswersPDFView  setAnswerRendererFactory()");
        RendererFactoryClass.setClass(PDFAnswersRendererFactory);
    }
    
    protected createRenderer(question:Question, container:any):void{
        console.log("Answer renderer factory class: "+RendererFactoryClass.getClass());
        RendererFactoryClass.getClass().create(question.getType(), question, container);
    }
}
