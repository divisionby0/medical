var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="TextViewAnswerRenderer.ts"/>
///<reference path="TextInputAnswerRenderer.ts"/>
var DateAnswerRenderer = (function (_super) {
    __extends(DateAnswerRenderer, _super);
    function DateAnswerRenderer(data, container) {
        _super.call(this, data, container);
    }
    DateAnswerRenderer.prototype.orderChildren = function () {
    };
    return DateAnswerRenderer;
}(TextInputAnswerRenderer));
//# sourceMappingURL=DateAnswerRenderer.js.map