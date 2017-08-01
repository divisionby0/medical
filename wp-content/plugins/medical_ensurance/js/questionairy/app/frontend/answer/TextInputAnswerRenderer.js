var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="AnswerRenderer.ts"/>
///<reference path="../RendererFactoryClass.ts"/>
///<reference path="../collection/FormatCollection.ts"/>
var TextInputAnswerRenderer = (function (_super) {
    __extends(TextInputAnswerRenderer, _super);
    function TextInputAnswerRenderer(data, container) {
        _super.call(this, data, container);
    }
    TextInputAnswerRenderer.prototype.createChildren = function () {
        this.createChildrenContainer();
        this.createText();
        this.updateText();
        this.orderChildren();
    };
    TextInputAnswerRenderer.prototype.orderChildren = function () {
        var formatCollection = new FormatCollection(this.data.getAnswer());
        var items = formatCollection.format();
        new SortChildren(items);
        for (var i = 0; i < items.length; i++) {
            var child = items[i];
            var type;
            type = child.getType();
            var questionRenderer = RendererFactoryClass.getClass().create(type, child, this.container);
            this.children.push(questionRenderer);
        }
    };
    TextInputAnswerRenderer.prototype.updateText = function () {
        var showText = this.data.getTextShowAtResult();
        var resultContainerPrefix = '<div style="display: block; float: left; width: 100%;">';
        if (showText) {
            var questionText = "<div style='display: block; float: left;'>" + this.data.getText() + "</div>";
        }
        else {
            var questionText = "";
        }
        var answerText = '<div style="color:blue;float: left;display: block;padding-left: 20px;"><b>' + this.data.getAnswer().getValue() + '</b></div>';
        var resultContainerPostfix = '</div>';
        var resultHtml = resultContainerPrefix + questionText + answerText + resultContainerPostfix;
        this.textLabel.html(resultHtml);
    };
    return TextInputAnswerRenderer;
}(AnswerRenderer));
//# sourceMappingURL=TextInputAnswerRenderer.js.map