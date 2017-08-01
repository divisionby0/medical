var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../Answer.ts"/>
var TextInputAnswer = (function (_super) {
    __extends(TextInputAnswer, _super);
    function TextInputAnswer() {
        _super.call(this, "");
        this.type = ObjectType.TEXT_INPUT_ANSWER;
        this.children = new QuestionsCollection('questions');
    }
    TextInputAnswer.prototype.getData = function () {
        return this.children.getData();
    };
    TextInputAnswer.prototype.getIterator = function () {
        return this.children.getIterator();
    };
    TextInputAnswer.prototype.addQuestion = function (question) {
        var collectionSize = this.children.size();
        this.children.addQuestion(question);
        var newIndex = collectionSize;
        question.setIndex(newIndex);
    };
    TextInputAnswer.prototype.removeQuestion = function (id) {
        this.children.removeQuestion(id);
    };
    TextInputAnswer.prototype.removeVariation = function (id) {
        _super.prototype.removeVariation.call(this, id);
        this.children.removeAnswer(id);
        this.children.removeQuestion(id);
    };
    return TextInputAnswer;
}(Answer));
//# sourceMappingURL=TextInputAnswer.js.map