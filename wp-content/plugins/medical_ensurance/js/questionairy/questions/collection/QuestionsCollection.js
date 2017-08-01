var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../question/Question.ts"/>
///<reference path="CollectionEventDispatcher.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="../utils/Sorter.ts"/>
///<reference path="../sort/SortChildren.ts"/>
///<reference path="SortableCollection.ts"/>
///<reference path="RemoveQuestion.ts"/>
///<reference path="../../../collections/Map.ts"/>
///<reference path="../answer/booleanAnswer/BooleanAnswer.ts"/>
var QuestionsCollection = (function (_super) {
    __extends(QuestionsCollection, _super);
    function QuestionsCollection(text) {
        _super.call(this, text);
        this.collection = new Map("questions");
        this.text = text;
    }
    QuestionsCollection.prototype.getType = function () {
        return undefined;
    };
    QuestionsCollection.prototype.addQuestion = function (question) {
        var collectionSize = this.collection.size();
        this.collection.add(question.getId().toString(), question);
        var newIndex = collectionSize;
        question.setIndex(newIndex);
        this.onCollectionChanged();
    };
    QuestionsCollection.prototype.removeQuestion = function (id) {
        var removeQuestion = new RemoveQuestion(this.collection);
        var result = removeQuestion.execute(id);
        if (result) {
            this.onCollectionChanged();
        }
    };
    QuestionsCollection.prototype.clear = function () {
        this.collection.clear();
    };
    QuestionsCollection.prototype.removeAnswer = function (id) {
        var questionsIterator = this.collection.getIterator();
        while (questionsIterator.hasNext()) {
            var question = questionsIterator.next();
            question.removeAnswer(id);
        }
    };
    QuestionsCollection.prototype.getQuestion = function (text) {
        return this.collection.get(text);
    };
    QuestionsCollection.prototype.getText = function () {
        return this.text;
    };
    QuestionsCollection.prototype.size = function () {
        return this.collection.size();
    };
    QuestionsCollection.prototype.hasChildren = function () {
        return this.collection.size() > 0;
    };
    QuestionsCollection.prototype.getIterator = function () {
        return this.collection.getIterator();
    };
    QuestionsCollection.prototype.getEncoder = function () {
        return this.collection.getEncoder();
    };
    // override ICompositeNode method
    QuestionsCollection.prototype.getData = function () {
        var data = new Array();
        var iterator = this.collection.getIterator();
        while (iterator.hasNext()) {
            var question = iterator.next();
            data.push(question.getData());
        }
        this.sortChildren(data);
        return data;
    };
    return QuestionsCollection;
}(SortableCollection));
//# sourceMappingURL=QuestionsCollection.js.map