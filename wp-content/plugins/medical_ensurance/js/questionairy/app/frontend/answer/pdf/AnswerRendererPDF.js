var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="NodeTreeRendererPDF.ts"/>
var AnswerRendererPDF = (function (_super) {
    __extends(AnswerRendererPDF, _super);
    function AnswerRendererPDF(data, container) {
        _super.call(this, data, container);
    }
    AnswerRendererPDF.prototype.createChildrenContainer = function () {
        this.childrenContainer = this.$j('<tr id="childrenContainer"></tr>');
        this.container.append(this.childrenContainer);
    };
    return AnswerRendererPDF;
}(NodeTreeRendererPDF));
//# sourceMappingURL=AnswerRendererPDF.js.map