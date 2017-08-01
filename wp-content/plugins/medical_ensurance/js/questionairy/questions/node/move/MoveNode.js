///<reference path="../../collection/QuestionsCollection.ts"/>
var MoveNode = (function () {
    function MoveNode(collection) {
        this.collection = collection;
    }
    MoveNode.prototype.move = function (data) {
        var node = data.node;
        var nodeIndex = node.index;
        var currentNodePayload = node.object;
        var parent = data.parentNodePayload;
        if (!parent) {
            console.error("Parent is undefined !");
            // root
            parent = this.collection;
        }
        this.parentCollectionIterator = parent.getIterator();
        var nodeNewIndex = this.getNodeNewIndex(nodeIndex);
        var indexIsAvailable = this.isIndexAvailable(nodeNewIndex);
        if (indexIsAvailable) {
            var nodeToSwitch;
            while (this.parentCollectionIterator.hasNext()) {
                var parentCollectionNode = this.parentCollectionIterator.next();
                if (parentCollectionNode.getIndex() == nodeNewIndex) {
                    nodeToSwitch = parentCollectionNode;
                }
            }
            var nodeToSwitchIndex = nodeToSwitch.getIndex();
            nodeToSwitch.setIndex(nodeIndex);
            currentNodePayload.setIndex(nodeToSwitchIndex);
        }
    };
    MoveNode.prototype.getNodeNewIndex = function (currentIndex) {
        return currentIndex - 1;
    };
    MoveNode.prototype.isIndexAvailable = function (index) {
        return false;
    };
    return MoveNode;
}());
//# sourceMappingURL=MoveNode.js.map