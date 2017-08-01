var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="TextEditableDialogContent.ts"/>
var WYSIWYGDialogContent = (function (_super) {
    __extends(WYSIWYGDialogContent, _super);
    function WYSIWYGDialogContent(parent) {
        _super.call(this, parent);
    }
    WYSIWYGDialogContent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.wysiwygEditor.getContent();
    };
    WYSIWYGDialogContent.prototype.destroy = function () {
        this.wysiwygEditor.destroy();
    };
    WYSIWYGDialogContent.prototype.onConfirm = function () {
        this.text = this.wysiwygEditor.getContent();
        this.onConfirmed();
    };
    WYSIWYGDialogContent.prototype.onConfirmed = function () {
        _super.prototype.onConfirmed.call(this);
        if (this.isTextValid) {
        }
        else {
            this.addTextErrorText();
        }
    };
    WYSIWYGDialogContent.prototype.createChildren = function () {
        this.html += this.createParentText();
        this.html += '<p>' + this.getTextInputLegendText() + '</p>';
        this.html += this.createTextInput();
        this.html += this.createTextInputErrorText();
        this.html += '</div>';
        this.createWysiwygEditor();
    };
    WYSIWYGDialogContent.prototype.createWysiwygEditor = function () {
        this.wysiwygEditor = new WYSIWYGEditor();
        this.wysiwygEditor.init('dataTextInput');
    };
    WYSIWYGDialogContent.prototype.createTextInput = function () {
        return '<div id="dataTextInput"></div>';
    };
    return WYSIWYGDialogContent;
}(TextEditableDialogContent));
//# sourceMappingURL=WYSIWYGDialogContent.js.map