///<reference path="../collection/QuestionsCollection.ts"/>
class QuestionCollectionCutter{

    private questions:QuestionsCollection;
    
    constructor(questions:QuestionsCollection){
        this.questions = questions;
    }
    
    public getQuestionsBeforeFirstBoolean():QuestionsCollection{

        var firstQuestion:Question = this.getFirstQuestion(this.questions);
        var firstQuestionAnswer:Answer = this.getQuestionAnswer(firstQuestion);

        var firstSubQuestion:Question;
        
        var iterator:MapIterator = firstQuestionAnswer.getIterator();
        while(iterator.hasNext()){
            firstSubQuestion = iterator.next();
            break;
        }

        this.cutSubQuestionChildren(firstSubQuestion);
        
        return this.questions;
    }

    private cutSubQuestionChildren(question:Question):void{
        var answer:Answer = this.getQuestionAnswer(question);
        var iterator:MapIterator = answer.getVariationsIterator();

        while(iterator.hasNext()){
            var variation:AnswerVariation = iterator.next();
            this.removeChildren(variation);
        }
    }

    private removeChildren(answerVariation:AnswerVariation):void{
        answerVariation.clear();
    }

    // code duplication with FirstRootQuestion
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
