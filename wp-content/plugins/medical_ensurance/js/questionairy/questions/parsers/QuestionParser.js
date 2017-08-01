///<reference path="../question/Question.ts"/>
///<reference path="AnswerParser.ts"/>
///<reference path="AnswerParserFactory.ts"/>
///<reference path="../question/view/QuestionViewFactory.ts"/>
var QuestionParser = (function () {
    function QuestionParser() {
    }
    QuestionParser.parse = function (questionData, questionViewType) {
        var questionText = questionData.text;
        var showTextAtResult = questionData.showTextAtResult;
        var newQuestion = new Question(questionText);
        newQuestion.setTextShowAtResult(showTextAtResult);
        newQuestion.setView(QuestionViewFactory.getView(questionViewType));
        var type = questionData.answer.type;
        var answerParser = AnswerParserFactory.create(type);
        var answer = answerParser.parse(questionData.answer, questionViewType);
        newQuestion.createAnswer(answer);
        if (typeof answer.getValue() === "undefined") {
            answer.setValue("No");
        }
        if (type == ObjectType.TEXT_INPUT_ANSWER || type == ObjectType.DATE_SELECTION_ANSWER) {
            var placeholder = questionData.placeholder;
            if (placeholder) {
                newQuestion.setPlaceholder(placeholder);
            }
        }
        return newQuestion;
    };
    return QuestionParser;
}());
//# sourceMappingURL=QuestionParser.js.map