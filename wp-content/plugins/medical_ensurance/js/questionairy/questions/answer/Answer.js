var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="variation/AnswerVariation.ts"/>
///<reference path="../parsers/ObjectType.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="../utils/Sorter.ts"/>
///<reference path="RemoveAnswerVariation.ts"/>
///<reference path="../../../collections/Map.ts"/>
var Answer = (function (_super) {
    __extends(Answer, _super);
    function Answer(text) {
        _super.call(this, text);
        this.variations = new Map("variations");
        this.type = ObjectType.ANSWER;
        this.text = text;
    }
    // override ICompositeNode method
    Answer.prototype.getData = function () {
        var data = new Array();
        var variationsIterator = this.variations.getIterator();
        while (variationsIterator.hasNext()) {
            var variation = variationsIterator.next();
            data.push(variation.getData());
        }
        this.sortChildren(data);
        return data;
    };
    //TODO remove
    Answer.prototype.getVariationsIterator = function () {
        return this.variations.getIterator();
    };
    Answer.prototype.getIterator = function () {
        return this.variations.getIterator();
    };
    Answer.prototype.getText = function () {
        return this.text;
    };
    Answer.prototype.addVariation = function (variation) {
        var collectionSize = this.variations.size();
        this.variations.add(variation.getId().toString(), variation);
        var newIndex = collectionSize;
        variation.setIndex(newIndex);
        console.log("Answer addVariation id=" + variation.getId());
        this.onCollectionChanged();
        return variation;
    };
    Answer.prototype.removeVariation = function (id) {
        var removeAnswerVariation = new RemoveAnswerVariation(this.variations);
        var result = removeAnswerVariation.execute(id);
        if (result) {
            this.onCollectionChanged();
        }
    };
    Answer.prototype.removeQuestion = function (id) {
        var iterator = this.variations.getIterator();
        while (iterator.hasNext()) {
            var variation = iterator.next();
            variation.removeQuestion(id);
        }
    };
    Answer.prototype.getVariation = function (id) {
        return this.variations.get(id);
    };
    Answer.prototype.getType = function () {
        return this.type;
    };
    Answer.prototype.getValue = function () {
        return this.value;
    };
    Answer.prototype.setValue = function (value) {
        this.value = value;
    };
    return Answer;
}(SortableCollection));
//# sourceMappingURL=Answer.js.map