var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="MoveNode.ts"/>
var MoveNodeUp = (function (_super) {
    __extends(MoveNodeUp, _super);
    function MoveNodeUp(collection) {
        _super.call(this, collection);
    }
    MoveNodeUp.prototype.getNodeNewIndex = function (currentIndex) {
        return currentIndex - 1;
    };
    MoveNodeUp.prototype.isIndexAvailable = function (index) {
        return index > -1;
    };
    return MoveNodeUp;
}(MoveNode));
//# sourceMappingURL=MoveNodeUp.js.map