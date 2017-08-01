var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../answer/Answer.ts"/>
///<reference path="../collection/CollectionEventDispatcher.ts"/>
///<reference path="../parsers/ObjectType.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="view/IQuestionView.ts"/>
var Question = (function (_super) {
    __extends(Question, _super);
    function Question(text) {
        _super.call(this, text);
        this.type = ObjectType.QUESTION;
        this.placeholder = "";
        this.showTextAtResult = true;
        this.text = text;
        this.id = Math.round(Math.random() * 100000);
    }
    Question.prototype.setTextShowAtResult = function (value) {
        this.showTextAtResult = value;
    };
    Question.prototype.getTextShowAtResult = function () {
        return this.showTextAtResult;
    };
    Question.prototype.setView = function (view) {
        this.view = view;
    };
    Question.prototype.getId = function () {
        return this.id;
    };
    Question.prototype.setText = function (text) {
        this.text = text;
        this.onCollectionChanged();
    };
    Question.prototype.getText = function () {
        return this.text;
    };
    Question.prototype.createAnswer = function (answer) {
        this.answer = answer;
    };
    Question.prototype.getAnswer = function () {
        return this.answer;
    };
    Question.prototype.getAnswerVariation = function (id) {
        return this.answer.getVariation(id);
    };
    Question.prototype.removeQuestion = function (id) {
        this.answer.removeQuestion(id);
    };
    Question.prototype.removeAnswer = function (id) {
        this.answer.removeVariation(id);
    };
    Question.prototype.addAnswerVariation = function (variation) {
        if (this.answer) {
            this.answer.addVariation(variation);
        }
        else {
            throw new Error("Unable to add new answer variation. Answer not created yet");
        }
    };
    Question.prototype.getIterator = function () {
        return this.answer.getIterator();
    };
    // override ICompositeNode method
    Question.prototype.getData = function () {
        var helperText;
        if (this.view) {
            helperText = this.view.decorateText("", this.answer.getType());
        }
        var data = { id: this.id, index: this.index, text: this.text, helperText: helperText, type: this.type, object: this, showTextAtResult: this.showTextAtResult, placeholder: this.placeholder };
        if (this.answer) {
            data.nodes = this.answer.getData();
        }
        this.sortChildren(data.nodes);
        return data;
    };
    Question.prototype.getType = function () {
        return this.answer.getType();
    };
    Question.prototype.setPlaceholder = function (placeholderText) {
        this.placeholder = placeholderText;
    };
    Question.prototype.getPlaceholderText = function () {
        return this.placeholder;
    };
    return Question;
}(SortableCollection));
//# sourceMappingURL=Question.js.map