///<reference path="TextEditableDialogContent.ts"/>
///<reference path="WYSIWYGDialogContent.ts"/>
///<reference path="PlaceholderInputElement.ts"/>
///<reference path="../../../../../questions/answer/textAnswer/TextInputAnswer.ts"/>
///<reference path="../../../../../questions/ICompositeNode.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EditNodeDialogContent = (function (_super) {
    __extends(EditNodeDialogContent, _super);
    function EditNodeDialogContent(parent) {
        _super.call(this, parent);
        this.type = "";
    }
    EditNodeDialogContent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.data = this.parent.object;
        this.createShowAtResultComboBoxListener();
        this.placeholderContainer = this.$j('#placeholderContainer');
        this.type = this.data.getType();
        this.showTextAtResult = this.data.getTextShowAtResult();
        this.updateShowTextAtResultCombo();
        this.updateAnswerTypeText();
        if (this.type === ObjectType.TEXT_INPUT_ANSWER || this.type === ObjectType.DATE_SELECTION_ANSWER) {
            this.createPlaceholderInputElement();
        }
    };
    EditNodeDialogContent.prototype.createPlaceholderInputElement = function () {
        this.placeholderInputElement = new PlaceholderInputElement(this.placeholderContainer);
        var placeholderText = this.data.getPlaceholderText();
        this.placeholderInputElement.setText(placeholderText);
    };
    EditNodeDialogContent.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.html += this.createPlaceholderContainer();
        this.html += this.createShowAtResultCheckBox();
        this.html += '<div id="answerTypeContainer"></div>';
    };
    EditNodeDialogContent.prototype.createPlaceholderContainer = function () {
        return '<div id="placeholderContainer"></div>';
    };
    EditNodeDialogContent.prototype.createShowAtResultCheckBox = function () {
        if (this.showTextAtResult) {
            return '<input type="checkbox" id="showTextAtResult" checked="checked"> show text at result';
        }
        else {
            return '<input type="checkbox" id="showTextAtResult"> show text at result';
        }
    };
    EditNodeDialogContent.prototype.createShowAtResultComboBoxListener = function () {
        var _this = this;
        this.showTextAtResultComboBox = this.$j('#showTextAtResult');
        this.showTextAtResultComboBox.change(function () { return _this.showAtResultComboBoxChanged(); });
    };
    EditNodeDialogContent.prototype.showAtResultComboBoxChanged = function () {
        this.showTextAtResult = this.showTextAtResultComboBox.is(":checked");
    };
    EditNodeDialogContent.prototype.createTextInput = function () {
        return '<div id="dataTextInput">' + this.parent.object.text + '</div>';
    };
    EditNodeDialogContent.prototype.createParentText = function () {
        return '';
    };
    EditNodeDialogContent.prototype.onConfirmed = function () {
        _super.prototype.onConfirmed.call(this);
        if (this.isTextValid) {
            EventBus.dispatchEvent(NodeDialogEventType.UPDATE, this.getData());
        }
        else {
            this.addTextErrorText();
        }
    };
    EditNodeDialogContent.prototype.getData = function () {
        var data = { node: this.parent, text: this.text, showTextAtResult: this.showTextAtResult };
        if (this.type == ObjectType.TEXT_INPUT_ANSWER || this.type === ObjectType.DATE_SELECTION_ANSWER) {
            data.placeholderText = this.getPlaceholderInputText();
        }
        return data;
    };
    EditNodeDialogContent.prototype.getPlaceholderInputText = function () {
        return this.placeholderInputElement.getText();
    };
    EditNodeDialogContent.prototype.updateShowTextAtResultCombo = function () {
        if (this.showTextAtResult) {
            this.$j('#showTextAtResult').attr("checked", "checked");
        }
    };
    EditNodeDialogContent.prototype.updateAnswerTypeText = function () {
        this.$j('#answerTypeContainer').text('Type: ' + this.type);
    };
    return EditNodeDialogContent;
}(WYSIWYGDialogContent));
//# sourceMappingURL=EditNodeDialogContent.js.map