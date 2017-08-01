var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../Answer.ts"/>
var SingleSelectionAnswer = (function (_super) {
    __extends(SingleSelectionAnswer, _super);
    function SingleSelectionAnswer() {
        _super.call(this, "");
        this.type = ObjectType.SINGLE_SELECTION_ANSWER;
    }
    return SingleSelectionAnswer;
}(Answer));
//# sourceMappingURL=SingleSelectionAnswer.js.map