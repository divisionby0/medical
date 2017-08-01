var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../textAnswer/TextInputAnswer.ts"/>
var DateSelectionAnswer = (function (_super) {
    __extends(DateSelectionAnswer, _super);
    function DateSelectionAnswer() {
        _super.call(this);
        this.type = ObjectType.DATE_SELECTION_ANSWER;
    }
    return DateSelectionAnswer;
}(TextInputAnswer));
//# sourceMappingURL=DateSelectionAnswer.js.map