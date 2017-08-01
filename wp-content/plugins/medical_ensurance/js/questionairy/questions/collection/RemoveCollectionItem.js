///<reference path="../question/Question.ts"/>
///<reference path="../../../collections/Map.ts"/>
///<reference path="../ICompositeNode.ts"/>
var RemoveCollectionItem = (function () {
    function RemoveCollectionItem(collection) {
        this.collection = collection;
    }
    RemoveCollectionItem.prototype.execute = function (id) {
        var idExists = this.collection.has(id.toString());
        if (idExists) {
            var questionToRemove = this.collection.get(id.toString());
            var questionIndex = questionToRemove.getIndex();
            this.updateIndexes(questionIndex);
            this.collection.remove(id.toString());
        }
        else {
            this.traverseChildren(id);
        }
        return idExists;
    };
    RemoveCollectionItem.prototype.traverseChildren = function (id) {
    };
    RemoveCollectionItem.prototype.updateIndexes = function (indexToRemove) {
        var iterator = this.collection.getIterator();
        while (iterator.hasNext()) {
            var question = iterator.next();
            var questionIndex = question.getIndex();
            if (questionIndex > indexToRemove) {
                question.setIndex(questionIndex - 1);
            }
        }
    };
    return RemoveCollectionItem;
}());
//# sourceMappingURL=RemoveCollectionItem.js.map