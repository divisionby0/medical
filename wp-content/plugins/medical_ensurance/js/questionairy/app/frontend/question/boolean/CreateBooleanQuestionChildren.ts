///<reference path="../../../../questions/question/Question.ts"/>
///<reference path="../QuestionRenderer.ts"/>
///<reference path="../../UserQuestionsRendererFactory.ts"/>
///<reference path="../../RendererFactoryClass.ts"/>
///<reference path="../../../../questions/ICompositeNode.ts"/>
///<reference path="../../../../../collections/iterators/MapIterator.ts"/>
///<reference path="../../../../../libs/jqueryTS/jquery.d.ts"/>
class CreateBooleanQuestionChildren{
    
    private children:any[];

    private $j;

    constructor(dataIterator:MapIterator, container:any, isNegativeChildren:boolean){
        this.$j = jQuery.noConflict();
        this.children = new Array();
        var totalChildren:number = dataIterator.size();
        var childrenContainer:any;

        if(totalChildren == 0){
            return;
        }
        else{
            if(isNegativeChildren){
                childrenContainer = this.$j('<div id="negativeChildren" style="border-width: 1px; border-color: red; margin-top: 2px;margin-bottom: 2px;">');
            }
            else{
                childrenContainer = this.$j('<div id="negativeChildren" style=" border-width: 1px; border-color: green; margin-top: 2px; margin-bottom: 2px;">');
            }
        }

        while(dataIterator.hasNext()){
            var subQuestion:ICompositeNode = dataIterator.next();
            var questionContainer:any = this.$j('<div style="width: 100%; float: left; display: block;"></div>');
            childrenContainer.append(questionContainer);
            var negativeChildQuestionRenderer:any = RendererFactoryClass.getClass().create(subQuestion.getType(), subQuestion, questionContainer);
            this.children.push(negativeChildQuestionRenderer);
        }
        container.append(childrenContainer);
    }
    getCollection():any[]{
        return this.children;
    }
}
