var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="TextInputQuestionRenderer.ts"/>
var TextViewQuestionRenderer = (function (_super) {
    __extends(TextViewQuestionRenderer, _super);
    function TextViewQuestionRenderer(data, container) {
        _super.call(this, data, container);
    }
    TextViewQuestionRenderer.prototype.hasUserValue = function () {
        // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
        return this.isChildrenHasUserValue();
    };
    TextViewQuestionRenderer.prototype.getControl = function () {
        return this.$j('');
    };
    return TextViewQuestionRenderer;
}(TextInputQuestionRenderer));
//# sourceMappingURL=TextViewQuestionRenderer.js.map