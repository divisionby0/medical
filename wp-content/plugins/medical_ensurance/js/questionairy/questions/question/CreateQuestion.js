///<reference path="Question.ts"/>
///<reference path="../answer/AnswerFactory.ts"/>
var CreateQuestion = (function () {
    function CreateQuestion() {
    }
    CreateQuestion.prototype.create = function (data) {
        var text = data.text;
        var type = data.type;
        var showTextAtResult = data.showTextAtResult;
        var question = new Question(text);
        question.setTextShowAtResult(showTextAtResult);
        var answer = AnswerFactory.create(type);
        question.createAnswer(answer);
        if (type == ObjectType.TEXT_INPUT_ANSWER || type == ObjectType.DATE_SELECTION_ANSWER) {
            this.updateQuestion(data, question, answer);
        }
        return question;
    };
    CreateQuestion.prototype.updateQuestion = function (data, question, answer) {
        answer.setValue("");
        var placeholderText = data.placeholderText;
        question.setPlaceholder(placeholderText);
    };
    return CreateQuestion;
}());
//# sourceMappingURL=CreateQuestion.js.map