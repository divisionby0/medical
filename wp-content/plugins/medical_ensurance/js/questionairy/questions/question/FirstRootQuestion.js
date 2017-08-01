///<reference path="../collection/QuestionsCollection.ts"/>
///<reference path="../answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../../../collections/iterators/MapIterator.ts"/>
///<reference path="Question.ts"/>
var FirstRootQuestion = (function () {
    function FirstRootQuestion(questions) {
        this.questions = questions;
    }
    FirstRootQuestion.prototype.getAnswer = function () {
        var firstQuestion = this.getFirstQuestion(this.questions);
        var firstQuestionAnswer = this.getQuestionAnswer(firstQuestion);
        var firstSubQuestion;
        var iterator = firstQuestionAnswer.getIterator();
        while (iterator.hasNext()) {
            firstSubQuestion = iterator.next();
            break;
        }
        var firstSubQuestionAnswer = firstSubQuestion.getAnswer();
        if (firstSubQuestionAnswer.getType() == ObjectType.BOOLEAN_ANSWER) {
            return firstSubQuestionAnswer;
        }
        else {
            return null;
        }
    };
    FirstRootQuestion.prototype.getFirstQuestion = function (collection) {
        var questionsIterator = this.questions.getIterator();
        var firstQuestion;
        while (questionsIterator.hasNext()) {
            firstQuestion = questionsIterator.next();
            break;
        }
        return firstQuestion;
    };
    FirstRootQuestion.prototype.getQuestionAnswer = function (question) {
        return question.getAnswer();
    };
    return FirstRootQuestion;
}());
//# sourceMappingURL=FirstRootQuestion.js.map