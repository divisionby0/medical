///<reference path="../collection/QuestionsCollection.ts"/>
///<reference path="../../app/views/element/treeView/TreeViewEventType.ts"/>
///<reference path="../collection/CollectionEventType.ts"/>
///<reference path="move/MoveNode.ts"/>
///<reference path="move/MoveNodeUp.ts"/>
///<reference path="move/MoveNodeDown.ts"/>
var CollectionChangeOrderListener = (function () {
    function CollectionChangeOrderListener(collection) {
        this.collection = collection;
        this.createListeners();
    }
    CollectionChangeOrderListener.prototype.updateCollection = function (collection) {
        this.collection = collection;
    };
    CollectionChangeOrderListener.prototype.createListeners = function () {
        var _this = this;
        EventBus.addEventListener(TreeViewEventType.NODE_MOVE_UP_REQUEST, function (data) { return _this.onMoveUpNodeRequest(data); });
        EventBus.addEventListener(TreeViewEventType.NODE_MOVE_DOWN_REQUEST, function (data) { return _this.onMoveDownNodeRequest(data); });
    };
    CollectionChangeOrderListener.prototype.onMoveUpNodeRequest = function (data) {
        var moveNodeUp = new MoveNodeUp(this.collection);
        moveNodeUp.move(data);
        this.onCollectionChanged();
    };
    CollectionChangeOrderListener.prototype.onMoveDownNodeRequest = function (data) {
        var moveNodeDown = new MoveNodeDown(this.collection);
        moveNodeDown.move(data);
        this.onCollectionChanged();
    };
    CollectionChangeOrderListener.prototype.onCollectionChanged = function () {
        EventBus.dispatchEvent(CollectionEventType.COLLECTION_CHANGED, null);
    };
    return CollectionChangeOrderListener;
}());
//# sourceMappingURL=CollectionChangeOrderListener.js.map