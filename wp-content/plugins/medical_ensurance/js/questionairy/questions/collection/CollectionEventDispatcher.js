///<reference path="CollectionEventType.ts"/>
///<reference path="../../../events/EventBus.ts"/>
var CollectionEventDispatcher = (function () {
    function CollectionEventDispatcher(text) {
    }
    CollectionEventDispatcher.prototype.onCollectionChanged = function () {
        EventBus.dispatchEvent(CollectionEventType.COLLECTION_CHANGED, null);
    };
    return CollectionEventDispatcher;
}());
//# sourceMappingURL=CollectionEventDispatcher.js.map