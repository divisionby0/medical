///<reference path="AnswerRenderer.ts"/>
///<reference path="BooleanAnswerRenderer.ts"/>
class MultipleSelectionAnswerRenderer extends AnswerRenderer{
    constructor(data:Question, container:any){
        super(data, container);
    }

    protected createChildren():void{
        this.createChildrenContainer();
        this.createText();
        this.updateText();

        var formatCollection:FormatCollection = new FormatCollection(this.data.getAnswer());
        var items:Question[] = formatCollection.format();
        new SortChildren(items);

        for(var i:number = 0; i<items.length; i++){
            var optionSubQuestion:Question = items[i];

            var optionContainer:any = this.$j('<div>');
            this.childrenContainer.append(optionContainer);
            var renderer:BooleanAnswerRenderer = new BooleanAnswerRenderer(optionSubQuestion, optionContainer);
            this.children.push(renderer);
        }
    }

    protected updateText():void{
        var showText:boolean = this.data.getTextShowAtResult();

        var resultContainerPrefix:string = '<div style="display: block; float: left;">';

        if(showText){
            var questionText:string = "<div style='display: inline-block; float: left;'>"+this.data.getText()+"</div>";
        }
        else{
            var questionText:string = "";
        }

        var resultContainerPostfix:string = '</div>';

        var resultHtml:string = resultContainerPrefix+questionText+resultContainerPostfix;
        this.textLabel.html(resultHtml);
    }
}
