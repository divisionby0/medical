var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../question/Question.ts"/>
///<reference path="RemoveCollectionItem.ts"/>
///<reference path="../../../collections/Map.ts"/>
///<reference path="../ICompositeNode.ts"/>
var RemoveQuestion = (function (_super) {
    __extends(RemoveQuestion, _super);
    function RemoveQuestion(collection) {
        _super.call(this, collection);
    }
    RemoveQuestion.prototype.traverseChildren = function (id) {
        var questionsIterator = this.collection.getIterator();
        while (questionsIterator.hasNext()) {
            var question = questionsIterator.next();
            question.removeQuestion(id);
        }
    };
    return RemoveQuestion;
}(RemoveCollectionItem));
//# sourceMappingURL=RemoveQuestion.js.map