var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="AnswerParser.ts"/>
///<reference path="../answer/Answer.ts"/>
///<reference path="../answer/textAnswer/TextInputAnswer.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="../question/Question.ts"/>
var TextInputAnswerParser = (function (_super) {
    __extends(TextInputAnswerParser, _super);
    function TextInputAnswerParser() {
        _super.apply(this, arguments);
    }
    TextInputAnswerParser.prototype.parse = function (answerData, questionViewType) {
        this.questionViewType = questionViewType;
        this.answer = this.createAnswer();
        var answerText = answerData.value;
        if (typeof answerText === "undefined") {
            this.answer.setValue(this.getDefaultValue());
        }
        else {
            this.answer.setValue(answerText);
        }
        var subQuestions = this.parseSubQuestions(answerData.children.collection);
        for (var i = 0; i < subQuestions.length; i++) {
            var subQuestion = subQuestions[i];
            if (subQuestion) {
                this.answer.addQuestion(subQuestion);
            }
        }
        return this.answer;
    };
    TextInputAnswerParser.prototype.getDefaultValue = function () {
        return "empty";
    };
    TextInputAnswerParser.prototype.parseSubQuestions = function (collection) {
        var subQuestions = new Array();
        var totalSubQuestions = collection.keys.length;
        for (var i = 0; i < totalSubQuestions; i++) {
            var key = collection.keys[i];
            var subQuestionData = collection.items[key];
            if (subQuestionData) {
                var subQuestion = QuestionParser.parse(subQuestionData, this.questionViewType);
                if (subQuestion) {
                    var index = subQuestionData.index;
                    this.answer.addQuestion(subQuestion);
                    subQuestion.setIndex(index);
                }
            }
        }
        return subQuestions;
    };
    TextInputAnswerParser.prototype.createAnswer = function () {
        return new TextInputAnswer();
    };
    return TextInputAnswerParser;
}(AnswerParser));
//# sourceMappingURL=TextInputAnswerParser.js.map