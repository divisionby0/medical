///<reference path="../collection/QuestionsCollection.ts"/>
///<reference path="../answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../../../collections/iterators/MapIterator.ts"/>
///<reference path="Question.ts"/>
class FirstRootQuestion{

    private questions:QuestionsCollection;
    
    constructor(questions:QuestionsCollection){
        this.questions = questions;
    }
    
    public getAnswer():BooleanAnswer{
        var firstQuestion:Question = this.getFirstQuestion(this.questions);
        var firstQuestionAnswer:Answer = this.getQuestionAnswer(firstQuestion);

        var firstSubQuestion:Question;

        var iterator:MapIterator = firstQuestionAnswer.getIterator();
        while(iterator.hasNext()){
            firstSubQuestion = iterator.next();
            break;
        }

        var firstSubQuestionAnswer:BooleanAnswer = firstSubQuestion.getAnswer() as BooleanAnswer;

        if(firstSubQuestionAnswer.getType() == ObjectType.BOOLEAN_ANSWER){
            return firstSubQuestionAnswer;
        }
        else{
            return null;
        }
    }

    private getFirstQuestion(collection:QuestionsCollection):Question{
        var questionsIterator:MapIterator = this.questions.getIterator();
        var firstQuestion:Question;

        while(questionsIterator.hasNext()){
            firstQuestion = questionsIterator.next();
            break;
        }
        return firstQuestion;
    }

    private getQuestionAnswer(question:Question):Answer{
        return question.getAnswer();
    }
}
