///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/questions/collection/QuestionsCollection.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/questions/answer/Answer.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/questions/question/Question.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/questions/answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/questions/question/FirstRootQuestion.ts"/>
class PersonMedicalDeclarationAnswerValidator{
    
    private questions:QuestionsCollection;
    
    constructor(questions:QuestionsCollection){
        this.questions = questions;
    }

    // предпологается что первый вопрос это всегда TextView, а первый вложенный в него это вопрос с типом ответа boolean
    public validate():boolean{

        var firstRootQuestionGetter:FirstRootQuestion = new FirstRootQuestion(this.questions);
        var firstRootQuestionAnswer:BooleanAnswer = firstRootQuestionGetter.getAnswer();

        if(firstRootQuestionAnswer && firstRootQuestionAnswer.getType() == ObjectType.BOOLEAN_ANSWER){
            var firstSubQuestionAnswerValue:string = firstRootQuestionAnswer.getValue();
            return firstSubQuestionAnswerValue == "Yes" ? true:false;
        }
        else{
            console.error("First sub question is not boolean.");
            return false;
        }
    }
}
