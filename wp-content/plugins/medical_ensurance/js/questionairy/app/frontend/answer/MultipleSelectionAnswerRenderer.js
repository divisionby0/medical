var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="AnswerRenderer.ts"/>
///<reference path="BooleanAnswerRenderer.ts"/>
var MultipleSelectionAnswerRenderer = (function (_super) {
    __extends(MultipleSelectionAnswerRenderer, _super);
    function MultipleSelectionAnswerRenderer(data, container) {
        _super.call(this, data, container);
    }
    MultipleSelectionAnswerRenderer.prototype.createChildren = function () {
        this.createChildrenContainer();
        this.createText();
        this.updateText();
        var formatCollection = new FormatCollection(this.data.getAnswer());
        var items = formatCollection.format();
        new SortChildren(items);
        for (var i = 0; i < items.length; i++) {
            var optionSubQuestion = items[i];
            var optionContainer = this.$j('<div>');
            this.childrenContainer.append(optionContainer);
            var renderer = new BooleanAnswerRenderer(optionSubQuestion, optionContainer);
            this.children.push(renderer);
        }
    };
    MultipleSelectionAnswerRenderer.prototype.updateText = function () {
        var showText = this.data.getTextShowAtResult();
        var resultContainerPrefix = '<div style="display: block; float: left;">';
        if (showText) {
            var questionText = "<div style='display: inline-block; float: left;'>" + this.data.getText() + "</div>";
        }
        else {
            var questionText = "";
        }
        var resultContainerPostfix = '</div>';
        var resultHtml = resultContainerPrefix + questionText + resultContainerPostfix;
        this.textLabel.html(resultHtml);
    };
    return MultipleSelectionAnswerRenderer;
}(AnswerRenderer));
//# sourceMappingURL=MultipleSelectionAnswerRenderer.js.map