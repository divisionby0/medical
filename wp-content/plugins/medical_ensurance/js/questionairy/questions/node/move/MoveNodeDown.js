var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="MoveNode.ts"/>
var MoveNodeDown = (function (_super) {
    __extends(MoveNodeDown, _super);
    function MoveNodeDown(collection) {
        _super.call(this, collection);
    }
    MoveNodeDown.prototype.getNodeNewIndex = function (currentIndex) {
        return currentIndex + 1;
    };
    MoveNodeDown.prototype.isIndexAvailable = function (index) {
        return index < this.parentCollectionIterator.size();
    };
    return MoveNodeDown;
}(MoveNode));
//# sourceMappingURL=MoveNodeDown.js.map