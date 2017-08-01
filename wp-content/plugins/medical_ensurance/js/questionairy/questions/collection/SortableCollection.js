var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="CollectionEventDispatcher.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="../sort/SortChildren.ts"/>
var SortableCollection = (function (_super) {
    __extends(SortableCollection, _super);
    function SortableCollection() {
        _super.apply(this, arguments);
        this.index = 0;
    }
    SortableCollection.prototype.getId = function () {
        return undefined;
    };
    SortableCollection.prototype.getData = function () {
        return undefined;
    };
    SortableCollection.prototype.getIterator = function () {
        return undefined;
    };
    SortableCollection.prototype.getIndex = function () {
        return this.index;
    };
    SortableCollection.prototype.setIndex = function (index) {
        this.index = index;
    };
    SortableCollection.prototype.setText = function (text) {
    };
    SortableCollection.prototype.getText = function () {
        return undefined;
    };
    SortableCollection.prototype.setTextShowAtResult = function (value) {
    };
    SortableCollection.prototype.getTextShowAtResult = function () {
        return undefined;
    };
    SortableCollection.prototype.getType = function () {
        return undefined;
    };
    SortableCollection.prototype.sortChildren = function (nodes) {
        new SortChildren(nodes);
    };
    return SortableCollection;
}(CollectionEventDispatcher));
//# sourceMappingURL=SortableCollection.js.map