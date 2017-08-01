///<reference path="../../parsers/ObjectType.ts"/>
///<reference path="../../collection/QuestionsCollection.ts"/>
var RemoveNode = (function () {
    function RemoveNode(node, collection) {
        var nodeType = node.object.type;
        var id = node.id;
        if (nodeType == ObjectType.QUESTION) {
            collection.removeQuestion(id);
        }
        else if (nodeType == ObjectType.ANSWER_VARIATION) {
            collection.removeAnswer(id);
        }
    }
    return RemoveNode;
}());
//# sourceMappingURL=RemoveNode.js.map