var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../select/Select.ts"/>
///<reference path="../../../../TypeSelectElementData.ts"/>
///<reference path="../../NodeDialogEventType.ts"/>
///<reference path="WYSIWYGDialogContent.ts"/>
///<reference path="PlaceholderInputElement.ts"/>
///<reference path="../../../../../../events/EventBus.ts"/>
var QuestionCreateDialogContent = (function (_super) {
    __extends(QuestionCreateDialogContent, _super);
    function QuestionCreateDialogContent(parent) {
        _super.call(this, parent);
        this.isTypeValid = false;
        this.questionType = "";
    }
    QuestionCreateDialogContent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.showTextAtResult = true;
        this.placeholderContainer = this.$j('#placeholderContainer');
        for (var i = 0; i < this.children.length; i++) {
            var element = this.children[i];
            element.init();
        }
        this.setFocusOnInput();
        this.createSelectListener();
        this.createShowAtResultComboBoxListener();
    };
    QuestionCreateDialogContent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        for (var i = 0; i < this.children.length; i++) {
            var element = this.children[i];
            element.destroy();
        }
        this.removeSelectListener();
    };
    // override
    QuestionCreateDialogContent.prototype.createChildren = function () {
        var typeSelectElementData = new TypeSelectElementData();
        var select = new Select("Select question type", typeSelectElementData.getData());
        this.html += this.createParentText();
        this.html += this.createTextInput();
        this.html += this.createTextInputErrorText();
        this.html += this.createPlaceholderContainer();
        this.html += '<p>Answer type:</p>';
        this.html += select.getHtml();
        this.html += this.typeSelectErrorText();
        this.html += this.createShowTextAtResultCheckBox();
        this.html += '</div>';
        this.children.push(select);
        this.createWysiwygEditor();
    };
    // override
    QuestionCreateDialogContent.prototype.onConfirmed = function () {
        _super.prototype.onConfirmed.call(this);
        if (this.isTextValid) {
            this.isTypeValid = this.validateType();
            if (this.isTypeValid) {
                var data = this.getData();
                EventBus.dispatchEvent(NodeDialogEventType.CREATE, data);
            }
            else {
                this.addTypeErrorText();
            }
        }
        else {
            this.addTextErrorText();
        }
    };
    QuestionCreateDialogContent.prototype.getData = function () {
        var data = { text: this.text, type: this.questionType, showTextAtResult: this.showTextAtResult };
        if (this.questionType == ObjectType.TEXT_INPUT_ANSWER || this.questionType == ObjectType.DATE_SELECTION_ANSWER) {
            data.placeholderText = this.getPlaceholderInputText();
        }
        return data;
    };
    QuestionCreateDialogContent.prototype.validateType = function () {
        if (this.questionType == "") {
            return false;
        }
        else {
            return true;
        }
    };
    QuestionCreateDialogContent.prototype.createPlaceholderInputElement = function () {
        this.placeholderInputElement = new PlaceholderInputElement(this.placeholderContainer);
    };
    QuestionCreateDialogContent.prototype.removePlaceholderInputElement = function () {
        if (this.placeholderInputElement) {
            this.placeholderInputElement.destroy();
            this.placeholderInputElement = null;
        }
    };
    QuestionCreateDialogContent.prototype.getPlaceholderInputText = function () {
        return this.placeholderInputElement.getText();
    };
    QuestionCreateDialogContent.prototype.typeSelectErrorText = function () {
        return '<span class="label label-danger hidden" id="typeSelectErrorText">Incorrect. You must select type.</span>';
    };
    QuestionCreateDialogContent.prototype.addTypeErrorText = function () {
        this.$j("#typeSelectErrorText").removeClass("hidden");
    };
    QuestionCreateDialogContent.prototype.removeTypeErrorText = function () {
        this.$j("#typeSelectErrorText").addClass("hidden");
    };
    QuestionCreateDialogContent.prototype.setFocusOnInput = function () {
        this.$j('#questionTextInput').focus();
    };
    QuestionCreateDialogContent.prototype.createShowTextAtResultCheckBox = function () {
        return '<input type="checkbox" checked="checked" id="showTextAtResultCombo"> show text at result';
    };
    QuestionCreateDialogContent.prototype.createShowAtResultComboBoxListener = function () {
        var _this = this;
        this.showTextAtResultComboBox = this.$j('#showTextAtResultCombo');
        this.showTextAtResultComboBox.change(function () { return _this.showAtResultComboBoxChanged(); });
    };
    QuestionCreateDialogContent.prototype.showAtResultComboBoxChanged = function () {
        this.showTextAtResult = this.showTextAtResultComboBox.is(":checked");
    };
    QuestionCreateDialogContent.prototype.createSelectListener = function () {
        var _this = this;
        EventBus.addEventListener(SelectEventType.SELECTED_ITEM_CHANGED, function (data) { return _this.onTypeChanged(data); });
    };
    QuestionCreateDialogContent.prototype.removeSelectListener = function () {
        var _this = this;
        EventBus.removeEventListener(SelectEventType.SELECTED_ITEM_CHANGED, function (data) { return _this.onTypeChanged(data); });
    };
    QuestionCreateDialogContent.prototype.onTypeChanged = function (data) {
        this.questionType = data.id;
        this.removeTypeErrorText();
        this.removePlaceholderInputElement();
        if (this.questionType == ObjectType.TEXT_INPUT_ANSWER || this.questionType == ObjectType.DATE_SELECTION_ANSWER) {
            this.createPlaceholderInputElement();
        }
    };
    QuestionCreateDialogContent.prototype.createPlaceholderContainer = function () {
        return '<div id="placeholderContainer"></div>';
    };
    return QuestionCreateDialogContent;
}(WYSIWYGDialogContent));
//# sourceMappingURL=QuestionCreateDialogContent.js.map