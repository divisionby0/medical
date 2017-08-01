///<reference path="../../../questions/collection/QuestionsCollection.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
var FormatCollection = (function () {
    function FormatCollection(collection) {
        this.collection = collection;
    }
    FormatCollection.prototype.format = function () {
        var items = new Array();
        var iterator = this.collection.getIterator();
        while (iterator.hasNext()) {
            var item = iterator.next();
            items.push(item);
        }
        return items;
    };
    return FormatCollection;
}());
//# sourceMappingURL=FormatCollection.js.map