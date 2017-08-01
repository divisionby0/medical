var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../Answer.ts"/>
///<reference path="../../parsers/ObjectType.ts"/>
var MultipleSelectionAnswer = (function (_super) {
    __extends(MultipleSelectionAnswer, _super);
    function MultipleSelectionAnswer() {
        _super.call(this, "");
        this.type = ObjectType.MULTIPLE_SELECTION_ANSWER;
        this.children = new QuestionsCollection('questions');
    }
    MultipleSelectionAnswer.prototype.getData = function () {
        return this.children.getData();
    };
    MultipleSelectionAnswer.prototype.getIterator = function () {
        return this.children.getIterator();
    };
    MultipleSelectionAnswer.prototype.removeQuestion = function (id) {
        this.children.removeQuestion(id);
    };
    // override
    MultipleSelectionAnswer.prototype.addVariation = function (variation) {
        var question = new Question(variation.getText());
        var answer = new BooleanAnswer();
        question.createAnswer(answer);
        this.children.addQuestion(question);
        this.onCollectionChanged();
        return question;
    };
    // override
    MultipleSelectionAnswer.prototype.removeVariation = function (id) {
        _super.prototype.removeVariation.call(this, id);
        this.children.removeQuestion(id);
        this.children.removeAnswer(id);
    };
    MultipleSelectionAnswer.prototype.getVariation = function (id) {
        return this.children.getQuestion(id);
    };
    return MultipleSelectionAnswer;
}(Answer));
//# sourceMappingURL=MultipleSelectionAnswer.js.map