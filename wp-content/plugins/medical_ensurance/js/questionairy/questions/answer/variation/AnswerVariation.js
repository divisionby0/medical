var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../collection/QuestionsCollection.ts"/>
///<reference path="../../sort/SortChildren.ts"/>
var AnswerVariation = (function (_super) {
    __extends(AnswerVariation, _super);
    function AnswerVariation(text) {
        _super.call(this, text);
        this.type = ObjectType.ANSWER_VARIATION;
        this.removable = true;
        this.showTextAtResult = true;
        this.id = Math.round(Math.random() * 100000);
    }
    AnswerVariation.prototype.setTextShowAtResult = function (value) {
        this.showTextAtResult = value;
    };
    AnswerVariation.prototype.getTextShowAtResult = function () {
        return this.showTextAtResult;
    };
    AnswerVariation.prototype.setRemovable = function (removable) {
        this.removable = removable;
    };
    AnswerVariation.prototype.getId = function () {
        return this.id;
    };
    // override
    AnswerVariation.prototype.setText = function (text) {
        this.text = text;
        this.onCollectionChanged();
    };
    AnswerVariation.prototype.getText = function () {
        return this.text;
    };
    AnswerVariation.prototype.getType = function () {
        return this.type;
    };
    // override
    AnswerVariation.prototype.getData = function () {
        var data = { id: this.id, index: this.index, text: this.text, type: this.type, nodes: [], object: this, showTextAtResult: this.showTextAtResult };
        var iterator = this.collection.getIterator();
        while (iterator.hasNext()) {
            var question = iterator.next();
            data.nodes.push(question.getData());
        }
        this.sortChildren(data.nodes);
        return data;
    };
    return AnswerVariation;
}(QuestionsCollection));
//# sourceMappingURL=AnswerVariation.js.map