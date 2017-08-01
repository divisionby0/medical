var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="QuestionRenderer.ts"/>
var MultipleSelectionQuestionRenderer = (function (_super) {
    __extends(MultipleSelectionQuestionRenderer, _super);
    function MultipleSelectionQuestionRenderer(data, container) {
        _super.call(this, data, container);
    }
    MultipleSelectionQuestionRenderer.prototype.setEnabled = function (enabled) {
        this.enabled = enabled;
        //console.log("Multiple ",this.data.getText(),"setEnabled to",this.enabled);
        if (this.enabled) {
            this.textLabel.removeClass("disabledElement");
        }
        else {
            this.textLabel.addClass("disabledElement");
        }
        this.onEnabledChanged();
    };
    MultipleSelectionQuestionRenderer.prototype.hasUserValue = function () {
        // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
        return this.isChildrenHasUserValue();
    };
    MultipleSelectionQuestionRenderer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var formatCollection = new FormatCollection(this.data.getAnswer());
        var items = formatCollection.format();
        new SortChildren(items);
        for (var i = 0; i < items.length; i++) {
            var optionSubQuestion = items[i];
            var optionContainer = this.$j('<div>');
            this.container.append(optionContainer);
            var renderer = new BooleanQuestionRenderer(optionSubQuestion, optionContainer);
            this.children.push(renderer);
        }
    };
    MultipleSelectionQuestionRenderer.prototype.getControl = function () {
        var control = this.$j('<div>');
        return control;
    };
    return MultipleSelectionQuestionRenderer;
}(QuestionRenderer));
//# sourceMappingURL=MultipleSelectionQuestionRenderer.js.map