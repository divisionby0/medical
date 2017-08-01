///<reference path="../Answer.ts"/>
class TextInputAnswer extends Answer{
    protected type:string = ObjectType.TEXT_INPUT_ANSWER;
    protected children:QuestionsCollection = new QuestionsCollection('questions');

    constructor(){
        super("");
    }

    getData():any{
        return this.children.getData();
    }

    public getIterator():MapIterator {
        return this.children.getIterator();
    }

    public addQuestion(question:Question):void{

        var collectionSize:number = this.children.size();
        this.children.addQuestion(question);
        var newIndex:number = collectionSize;
        question.setIndex(newIndex);
    }
    
    public removeQuestion(id:number):void{
        this.children.removeQuestion(id);
    }

    public removeVariation(id:number):void{
        super.removeVariation(id);
        this.children.removeAnswer(id);
        this.children.removeQuestion(id);
        
        
    }
}
