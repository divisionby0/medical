var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../answer/AnswerRenderer.ts"/>
///<reference path="./QuestionRenderer.ts"/>
///<reference path="../RendererFactoryClass.ts"/>
///<reference path="../../../questions/sort/SortChildren.ts"/>
///<reference path="../collection/FormatCollection.ts"/>
var TextInputQuestionRenderer = (function (_super) {
    __extends(TextInputQuestionRenderer, _super);
    function TextInputQuestionRenderer(data, container) {
        _super.call(this, data, container);
    }
    TextInputQuestionRenderer.prototype.hasUserValue = function () {
        // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
        if (this.value != "") {
            return true;
        }
        else {
            return this.isChildrenHasUserValue();
        }
    };
    TextInputQuestionRenderer.prototype.clear = function () {
        if (this.textInput) {
            this.textInput.val("");
            this.onTextInputChanged();
        }
        _super.prototype.clear.call(this);
    };
    TextInputQuestionRenderer.prototype.setEnabled = function (enabled) {
        this.enabled = enabled;
        this.onEnabledChanged();
    };
    TextInputQuestionRenderer.prototype.onEnabledChanged = function () {
        //console.log("Text ",this.data.getText(),"onEnabledChanged ",this.enabled);
        if (this.enabled) {
            this.control.attr('disabled', false);
            this.textLabel.removeClass("disabledElement");
        }
        else {
            this.control.attr('disabled', true);
            this.textLabel.addClass("disabledElement");
        }
        this.updateChildrenEnabled(this.enabled);
    };
    TextInputQuestionRenderer.prototype.createChildren = function () {
        this.placeholderText = this.getPlaceholderText();
        this.createAnswer();
        this.createValue();
        this.createChildrenContainer();
        this.createText();
        this.updateText();
        this.createControl(this.childrenContainer);
        this.orderChildren();
        this.createTextInputListener();
        this.onEnabledChanged();
    };
    TextInputQuestionRenderer.prototype.orderChildren = function () {
        var formatCollection = new FormatCollection(this.data.getAnswer());
        var items = formatCollection.format();
        new SortChildren(items);
        for (var i = 0; i < items.length; i++) {
            var question = items[i];
            var questionRenderer = RendererFactoryClass.getClass().create(question.getType(), question, this.container);
            this.children.push(questionRenderer);
        }
    };
    TextInputQuestionRenderer.prototype.getControl = function () {
        this.textInput = this.$j('<input type="text" value="' + this.value + '" id="textInput" placeholder="' + this.placeholderText + '">');
        return this.textInput;
    };
    TextInputQuestionRenderer.prototype.createTextInputListener = function () {
        var _this = this;
        if (this.textInput) {
            this.textInput.on('input', function () { return _this.onTextInputChanged(); });
        }
    };
    TextInputQuestionRenderer.prototype.onTextInputChanged = function () {
        this.answer.setValue(this.textInput.val());
    };
    TextInputQuestionRenderer.prototype.getPlaceholderText = function () {
        return this.data.getPlaceholderText();
    };
    return TextInputQuestionRenderer;
}(QuestionRenderer));
//# sourceMappingURL=TextInputQuestionRenderer.js.map