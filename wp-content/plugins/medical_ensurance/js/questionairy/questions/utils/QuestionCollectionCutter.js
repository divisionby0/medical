///<reference path="../collection/QuestionsCollection.ts"/>
var QuestionCollectionCutter = (function () {
    function QuestionCollectionCutter(questions) {
        this.questions = questions;
    }
    QuestionCollectionCutter.prototype.getQuestionsBeforeFirstBoolean = function () {
        var firstQuestion = this.getFirstQuestion(this.questions);
        var firstQuestionAnswer = this.getQuestionAnswer(firstQuestion);
        var firstSubQuestion;
        var iterator = firstQuestionAnswer.getIterator();
        while (iterator.hasNext()) {
            firstSubQuestion = iterator.next();
            break;
        }
        this.cutSubQuestionChildren(firstSubQuestion);
        return this.questions;
    };
    QuestionCollectionCutter.prototype.cutSubQuestionChildren = function (question) {
        var answer = this.getQuestionAnswer(question);
        var iterator = answer.getVariationsIterator();
        while (iterator.hasNext()) {
            var variation = iterator.next();
            this.removeChildren(variation);
        }
    };
    QuestionCollectionCutter.prototype.removeChildren = function (answerVariation) {
        answerVariation.clear();
    };
    // code duplication with FirstRootQuestion
    QuestionCollectionCutter.prototype.getFirstQuestion = function (collection) {
        var questionsIterator = this.questions.getIterator();
        var firstQuestion;
        while (questionsIterator.hasNext()) {
            firstQuestion = questionsIterator.next();
            break;
        }
        return firstQuestion;
    };
    QuestionCollectionCutter.prototype.getQuestionAnswer = function (question) {
        return question.getAnswer();
    };
    return QuestionCollectionCutter;
}());
//# sourceMappingURL=QuestionCollectionCutter.js.map