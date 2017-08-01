var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="TextEditableDialogContent.ts"/>
///<reference path="../../NodeDialogEventType.ts"/>
///<reference path="../../../../../questions/parsers/ObjectType.ts"/>
///<reference path="../../../../../../events/EventBus.ts"/>
var AnswerCreationDialogContent = (function (_super) {
    __extends(AnswerCreationDialogContent, _super);
    function AnswerCreationDialogContent(parent) {
        _super.call(this, parent);
    }
    AnswerCreationDialogContent.prototype.getTextInputLegendText = function () {
        return "Answer text:";
    };
    AnswerCreationDialogContent.prototype.onConfirmed = function () {
        _super.prototype.onConfirmed.call(this);
        if (this.isTextValid) {
            EventBus.dispatchEvent(NodeDialogEventType.CREATE, { text: this.text, type: ObjectType.QUESTION });
        }
        else {
            this.addTextErrorText();
        }
    };
    return AnswerCreationDialogContent;
}(TextEditableDialogContent));
//# sourceMappingURL=AnswerCreationDialogContent.js.map