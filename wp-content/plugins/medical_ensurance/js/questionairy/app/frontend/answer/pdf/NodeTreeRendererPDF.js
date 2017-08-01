var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../view/NodeTreeRenderer.ts"/>
var NodeTreeRendererPDF = (function (_super) {
    __extends(NodeTreeRendererPDF, _super);
    function NodeTreeRendererPDF(data, container) {
        _super.call(this, data, container);
    }
    NodeTreeRendererPDF.prototype.createChildrenContainer = function () {
        this.childrenContainer = this.$j('<tr></tr>');
        this.container.append(this.childrenContainer);
    };
    NodeTreeRendererPDF.prototype.createText = function () {
        this.textLabel = this.$j('<table id="treeNodeText"></table>');
        this.childrenContainer.append(this.textLabel);
    };
    return NodeTreeRendererPDF;
}(NodeTreeRenderer));
//# sourceMappingURL=NodeTreeRendererPDF.js.map