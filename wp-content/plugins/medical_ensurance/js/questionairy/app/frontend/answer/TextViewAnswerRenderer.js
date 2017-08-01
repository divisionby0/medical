var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="TextInputAnswerRenderer.ts"/>
var TextViewAnswerRenderer = (function (_super) {
    __extends(TextViewAnswerRenderer, _super);
    function TextViewAnswerRenderer(data, container) {
        _super.call(this, data, container);
    }
    TextViewAnswerRenderer.prototype.updateText = function () {
        var resultContainerPrefix = '<div style="display: block; float: left; width: 100%;">';
        var questionText = "<div style='display: block; float: left; width: 100%;'>" + this.data.getText() + "</div>";
        var resultContainerPostfix = '</div>';
        var resultHtml = resultContainerPrefix + questionText + resultContainerPostfix;
        this.textLabel.html(resultHtml);
    };
    return TextViewAnswerRenderer;
}(TextInputAnswerRenderer));
//# sourceMappingURL=TextViewAnswerRenderer.js.map