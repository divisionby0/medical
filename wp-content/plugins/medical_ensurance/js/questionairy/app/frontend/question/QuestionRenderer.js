var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../../questions/question/Question.ts"/>
///<reference path="../view/NodeTreeRenderer.ts"/>
///<reference path="../answer/AnswerRenderer.ts"/>
///<reference path="../UserQuestionsRendererFactory.ts"/>
///<reference path="IUserAnswer.ts"/>
var QuestionRenderer = (function (_super) {
    __extends(QuestionRenderer, _super);
    function QuestionRenderer(data, container) {
        _super.call(this, data, container);
    }
    QuestionRenderer.prototype.createChildren = function () {
        this.createAnswer();
        this.createValue();
        this.createErrorContainer();
        _super.prototype.createChildren.call(this);
    };
    QuestionRenderer.prototype.createAnswer = function () {
        this.answer = this.data.getAnswer();
    };
    QuestionRenderer.prototype.createValue = function () {
        this.value = this.answer.getValue();
    };
    QuestionRenderer.prototype.hasUserValue = function () {
        return false;
    };
    // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
    QuestionRenderer.prototype.isChildrenHasUserValue = function () {
        var result = false;
        var collectionToTraverse = this.getCollectionToTraverse();
        for (var i = 0; i < collectionToTraverse.length; i++) {
            var child = collectionToTraverse[i];
            var childHasUserValue = child.hasUserValue();
            if (childHasUserValue) {
                result = true;
                break;
            }
        }
        return result;
    };
    QuestionRenderer.prototype.getCollectionToTraverse = function () {
        return this.children;
    };
    QuestionRenderer.prototype.setEnabled = function (enabled) {
        this.enabled = enabled;
        if (this.enabled) {
            this.control.attr('disabled', false);
            this.control.show();
            this.textLabel.removeClass("disabledElement");
        }
        else {
            this.control.attr('disabled', true);
            this.control.hide();
            this.textLabel.addClass("disabledElement");
        }
        this.onEnabledChanged();
    };
    QuestionRenderer.prototype.onEnabledChanged = function () {
        if (this.enabled) {
            this.textLabel.removeClass('disabledElement');
        }
        else {
            this.textLabel.addClass('disabledElement');
        }
        this.updateChildrenEnabled(this.enabled);
    };
    QuestionRenderer.prototype.updateChildrenEnabled = function (enabled) {
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.setEnabled(enabled);
        }
    };
    QuestionRenderer.prototype.showError = function () {
        this.errorContainer.show();
        this.errorContainer.addClass("errorBackground");
    };
    QuestionRenderer.prototype.hideError = function () {
        this.errorContainer.hide();
        this.errorContainer.removeClass("errorBackground");
    };
    QuestionRenderer.prototype.createErrorContainer = function () {
        this.errorContainer = this.$j('<div style="color: yellow; display: none;">Has answered children questions. Please check parent or remove sub answers </div>');
        this.container.append(this.errorContainer);
    };
    return QuestionRenderer;
}(NodeTreeRenderer));
//# sourceMappingURL=QuestionRenderer.js.map