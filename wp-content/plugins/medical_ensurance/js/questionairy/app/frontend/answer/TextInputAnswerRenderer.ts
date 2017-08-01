///<reference path="AnswerRenderer.ts"/>
///<reference path="../RendererFactoryClass.ts"/>
///<reference path="../collection/FormatCollection.ts"/>
class TextInputAnswerRenderer extends AnswerRenderer{
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
    }
    
    protected updateText():void{
        var showText:boolean = this.data.getTextShowAtResult();

        var resultContainerPrefix:string = '<div style="display: block; float: left; width: 100%;">';

        if(showText){
            var questionText:string = "<div style='display: block; float: left;'>"+this.data.getText()+"</div>";
        }
        else{
            var questionText:string = "";
        }

        var answerText:string = '<div style="color:blue;float: left;display: block;padding-left: 20px;"><b>'+this.data.getAnswer().getValue()+'</b></div>';
        var resultContainerPostfix:string = '</div>';

        var resultHtml:string = resultContainerPrefix+questionText+answerText+resultContainerPostfix;
        this.textLabel.html(resultHtml);
    }
    
}


