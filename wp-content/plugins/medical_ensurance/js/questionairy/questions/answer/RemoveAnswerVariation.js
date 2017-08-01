var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="variation/AnswerVariation.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="../collection/RemoveCollectionItem.ts"/>
///<reference path="../../../collections/Map.ts"/>
var RemoveAnswerVariation = (function (_super) {
    __extends(RemoveAnswerVariation, _super);
    function RemoveAnswerVariation(collection) {
        _super.call(this, collection);
    }
    RemoveAnswerVariation.prototype.traverseChildren = function (id) {
        var iterator = this.collection.getIterator();
        while (iterator.hasNext()) {
            var variation = iterator.next();
            variation.removeAnswer(id);
        }
    };
    return RemoveAnswerVariation;
}(RemoveCollectionItem));
//# sourceMappingURL=RemoveAnswerVariation.js.map