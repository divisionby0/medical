///<reference path="AnswerRendererPDF.ts"/>
///<reference path="../../../../questions/question/Question.ts"/>
///<reference path="../../collection/FormatCollection.ts"/>
///<reference path="../../RendererFactoryClass.ts"/>
class TextInputAnswerRendererPDF extends AnswerRendererPDF{
    
    constructor(data:Question, container:any){
        super(data, container);
    }

    protected createChildren():void{
        this.createChildrenContainer();
        this.createText();
        this.updateText();

        this.orderChildren();
    }

    protected orderChildren():void{
        /*
        var formatCollection:FormatCollection = new FormatCollection(this.data.getAnswer());
        var items:Question[] = formatCollection.format();
        new SortChildren(items);

        for(var i:number = 0; i<items.length; i++){
            var child:ICompositeNode = items[i];
            var type:string;
            type = child.getType();
            var questionRenderer:any = RendererFactoryClass.getClass().create(type, child, this.container);
            this.children.push(questionRenderer);
        }
        */
    }
}
