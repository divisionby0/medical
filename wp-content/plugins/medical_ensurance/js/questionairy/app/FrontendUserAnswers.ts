///<reference path="FrontendUserQuestions.ts"/>
///<reference path="frontend/RendererType.ts"/>
///<reference path="../questions/parsers/QuestionCollectionParser.ts"/>
///<reference path="frontend/UserAnswersRendererFactory.ts"/>
///<reference path="BaseApplication.ts"/>
class FrontendUserAnswers extends BaseApplication{

    private container:any;
    
    constructor(dataString:string, containerId:string){
        super(dataString, containerId);
    }

    protected init():void{
        this.container = this.$j("#"+this.containerId);
        this.onDataLoaded(this.dataString);
    }

    protected onDataLoaded(data:string):void {
        super.onDataLoaded(data);

        this.setAnswerRendererFactory();

        this.questions = QuestionCollectionParser.parse(this.map, '');

        var formatCollection:FormatCollection = new FormatCollection(this.questions);
        var items:Question[] = formatCollection.format();
        new SortChildren(items);

        for(var i:number = 0; i<items.length; i++){
            var question:Question = items[i];
            this.createRenderer(question, this.container);
        }
    }

    protected setAnswerRendererFactory():void{
        RendererFactoryClass.setClass(UserAnswersRendererFactory);
    }

    protected createRenderer(question:Question, container:any):void{
        RendererFactoryClass.getClass().create(question.getType(), question, container);
    }
}
