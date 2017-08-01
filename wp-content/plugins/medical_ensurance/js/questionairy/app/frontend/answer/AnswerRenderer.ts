///<reference path="../view/IDataRenderer.ts"/>
///<reference path="../../../questions/answer/Answer.ts"/>
///<reference path="../view/NodeTreeRenderer.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
///<reference path="../../../../libs/jqueryTS/jquery.d.ts"/>
class AnswerRenderer extends NodeTreeRenderer{
    protected answer:Answer;
    protected value:string;

    constructor(data:Question, container:any){
        super(data, container);
    }

    protected createChildren():void{
        this.answer = this.data.getAnswer();
        this.value = this.answer.getValue();
        
        this.createChildrenContainer();
        this.createText();
        this.updateText();
    }
    
    protected createText():void{
        this.textLabel = this.$j('<div id="treeNodeText" style="display: block; float: left; width: 100%;">');
        this.childrenContainer.append(this.textLabel);
    }

    protected updateText():void{
        var resultHtml:string = this.data.getText();
        this.textLabel.html(resultHtml);
    }

    protected createChildrenContainer():void{
        this.childrenContainer = this.$j('<div id="childrenContainer" class="container"></div>');
        //this.childrenContainer = this.$j('<div id="childrenContainer" style="width: 1170px;max-width: 91.40625%;margin: 0 auto;z-index: -1000;">');
        this.container.append(this.childrenContainer);
    }
}
