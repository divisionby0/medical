///<reference path="../booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../Answer.ts"/>
///<reference path="../../parsers/ObjectType.ts"/>
class MultipleSelectionAnswer extends Answer{
    protected type:string = ObjectType.MULTIPLE_SELECTION_ANSWER;
    private children:QuestionsCollection = new QuestionsCollection('questions');

    constructor(){
        super("");
    }

    getData():any{
        return this.children.getData();
    }

    public getIterator():MapIterator {
        return this.children.getIterator();
    }
    
    public removeQuestion(id:number):void{
        this.children.removeQuestion(id);
    }
    
    // override
    public addVariation(variation:AnswerVariation):Question{
        
        var question:Question = new Question(variation.getText());
        var answer:BooleanAnswer = new BooleanAnswer();
        question.createAnswer(answer);
        
        this.children.addQuestion(question);
        
        this.onCollectionChanged();
        
        return question;
    }

    // override
    public removeVariation(id:number):void{
        super.removeVariation(id);
        this.children.removeQuestion(id);
        this.children.removeAnswer(id);
    }

    public getVariation(id:string):Question{
        return this.children.getQuestion(id);
    }
}
