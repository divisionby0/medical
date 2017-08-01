var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../../../questions/question/Question.ts"/>
///<reference path="TextInputAnswerRendererPDF.ts"/>
var TextViewAnswerRendererPDF = (function (_super) {
    __extends(TextViewAnswerRendererPDF, _super);
    function TextViewAnswerRendererPDF(data, container) {
        _super.call(this, data, container);
    }
    TextViewAnswerRendererPDF.prototype.createText = function () {
        this.textLabel = this.$j('<tr></tr>');
        this.childrenContainer.append(this.textLabel);
    };
    TextViewAnswerRendererPDF.prototype.createChildrenContainer = function () {
        this.childrenContainer = this.$j('<table id="children"></table>');
        this.container.append(this.childrenContainer);
    };
    return TextViewAnswerRendererPDF;
}(TextInputAnswerRendererPDF));
//# sourceMappingURL=TextViewAnswerRendererPDF.js.map