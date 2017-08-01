///<reference path="../questions/collection/QuestionsCollection.ts"/>
///<reference path="BaseApplication.ts"/>
///<reference path="frontend/question/QuestionRenderer.ts"/>
///<reference path="frontend/answer/AnswerRenderer.ts"/>
///<reference path="frontend/UserQuestionsRendererFactory.ts"/>
///<reference path="../questions/answer/variation/AnswerVariation.ts"/>
///<reference path="../questions/collection/CollectionEventType.ts"/>
///<reference path="saver/SaveFile.ts"/>
///<reference path="frontend/RendererType.ts"/>
///<reference path="frontend/RendererFactoryClass.ts"/>
///<reference path="../questions/sort/SortChildren.ts"/>
///<reference path="frontend/collection/FormatCollection.ts"/>
///<reference path="frontend/question/IUserAnswer.ts"/>
class FrontendUserQuestions extends BaseApplication{

    private container:any;
    private renderers:IUserAnswer[];

    constructor(dataString:string, containerId:string){
        super(dataString, containerId);
    }

    public getData():QuestionsCollection{
        return this.questions;
    }
    
    protected init():void{
        this.renderers = new Array();
        this.container = this.$j("#"+this.containerId);
        this.onDataLoaded(this.dataString);
    }

    protected onDataLoaded(data:string):void {
        super.onDataLoaded(data);

        RendererFactoryClass.setClass(UserQuestionsRendererFactory);

        this.questions = QuestionCollectionParser.parse(this.map, '');
        
        var formatCollection:FormatCollection = new FormatCollection(this.questions);
        var items:Question[] = formatCollection.format();
        new SortChildren(items);

        for(var i:number = 0; i<items.length; i++){
            var question:Question = items[i];
            var renderer:QuestionRenderer = this.createRenderer(question, this.container);

            this.renderers.push(renderer);
            
            var rendererHasUserValue:boolean = renderer.hasUserValue();
        }

        //console.log("Frontend questions: ",this.questions.getEncoder().encode());

        EventBus.addEventListener("ANSWER_VALUE_CHANGED", (data)=>this.onAnswerValueChanged(data));
    }

    private onAnswerValueChanged(data):void{
        //console.log("onAnswerValueChanged",data);
        //console.log("ANSWERS:", this.questions.getEncoder().encode());
    }
    
    private createRenderer(question:Question, container:any):QuestionRenderer{
        return RendererFactoryClass.getClass().create(question.getType(), question, container);
    }
}
