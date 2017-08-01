///<reference path="../answer/Answer.ts"/>
///<reference path="../collection/CollectionEventDispatcher.ts"/>
///<reference path="../parsers/ObjectType.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="view/IQuestionView.ts"/>
class Question extends SortableCollection{
    
    private answer:Answer;
    
    private text:string;
    private id:number;
    
    protected type:string = ObjectType.QUESTION;
    private view:IQuestionView;
    private showTextAtResult:boolean;
    
    private placeholder:string;

    constructor(text:string){
        super(text);
        this.placeholder = "";
        this.showTextAtResult = true;
        this.text = text;
        this.id = Math.round(Math.random()*100000);
    }
    
    public setTextShowAtResult(value:boolean):void{
        this.showTextAtResult = value;
    }
    public getTextShowAtResult():boolean{
        return this.showTextAtResult;
    }
    
    public setView(view:IQuestionView):void{
        this.view = view;
    }

    public getId():number{
        return this.id;
    }
    
    public setText(text:string):void {
        this.text = text;
        this.onCollectionChanged();
    }
    public getText():string {
        return this.text;
    }
    public createAnswer(answer:Answer):void{
        this.answer = answer;
    }
    public getAnswer():Answer{
        return this.answer;
    }

    public getAnswerVariation(id:string):any{
        return this.answer.getVariation(id);
    }

    public removeQuestion(id:number):void{
        this.answer.removeQuestion(id);
    }
    public removeAnswer(id:number):void{
        this.answer.removeVariation(id);
    }
    
    public addAnswerVariation(variation:AnswerVariation):void{
        if(this.answer){
            this.answer.addVariation(variation);
        }
        else{
            throw new Error("Unable to add new answer variation. Answer not created yet");
        }
    }
    public getIterator():MapIterator {
        return this.answer.getIterator();
    }

    // override ICompositeNode method
    public getData():any{

        var helperText:string;

        if(this.view){
            helperText = this.view.decorateText("", this.answer.getType());
        }
        
        var data:any = {id:this.id, index:this.index, text:this.text, helperText:helperText, type:this.type, object:this, showTextAtResult:this.showTextAtResult, placeholder:this.placeholder};
        if(this.answer){
            data.nodes = this.answer.getData();
        }

        this.sortChildren(data.nodes);
        
        return data;
    }

    getType():string {
        return this.answer.getType();
    }

    public setPlaceholder(placeholderText:string):void{
        this.placeholder = placeholderText;
    }
    public getPlaceholderText():string{
        return this.placeholder;
    }
}
