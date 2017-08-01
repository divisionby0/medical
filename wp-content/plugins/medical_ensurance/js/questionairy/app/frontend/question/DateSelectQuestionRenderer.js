var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="QuestionRenderer.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
var DateSelectQuestionRenderer = (function (_super) {
    __extends(DateSelectQuestionRenderer, _super);
    function DateSelectQuestionRenderer(data, container) {
        _super.call(this, data, container);
    }
    DateSelectQuestionRenderer.prototype.getControl = function () {
        this.textInput = this.$j('<input id="dateSelectContainer" value="' + this.value + '" placeholder="' + this.placeholderText + '">');
        this.createDatepicker();
        return this.textInput;
    };
    DateSelectQuestionRenderer.prototype.createDatepicker = function () {
        var _this = this;
        this.textInput.datepicker({ onSelect: function () { return _this.onDateChanged(); },
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:2100" });
    };
    DateSelectQuestionRenderer.prototype.createTextInputListener = function () {
    };
    DateSelectQuestionRenderer.prototype.onDateChanged = function () {
        this.onTextInputChanged();
    };
    return DateSelectQuestionRenderer;
}(TextInputQuestionRenderer));
//# sourceMappingURL=DateSelectQuestionRenderer.js.map