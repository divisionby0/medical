var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../QuestionRenderer.ts"/>
///<reference path="CreateBooleanQuestionChildren.ts"/>
///<reference path="../../RendererType.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
var BooleanQuestionRenderer = (function (_super) {
    __extends(BooleanQuestionRenderer, _super);
    function BooleanQuestionRenderer(data, container) {
        _super.call(this, data, container);
    }
    BooleanQuestionRenderer.prototype.hasUserValue = function () {
        // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
        var isPositiveValue = this.value == this.positiveValueString;
        if (isPositiveValue) {
            return true;
        }
        else {
            var hasChildrenWithUserValue = this.isChildrenHasUserValue();
            if (hasChildrenWithUserValue) {
                this.onError();
            }
            return hasChildrenWithUserValue;
        }
    };
    BooleanQuestionRenderer.prototype.clear = function () {
        this.checked = false;
        this.enabled = false;
        this.control.prop("checked", false);
        this.hideError();
        this.onCheckBoxChanged();
    };
    BooleanQuestionRenderer.prototype.getCollectionToTraverse = function () {
        return this.positiveChildren;
    };
    BooleanQuestionRenderer.prototype.createChildren = function () {
        this.negativeValueString = 'No';
        this.positiveValueString = 'Yes';
        this.answer = this.data.getAnswer();
        this.value = this.answer.getValue();
        this.setInitValue();
        _super.prototype.createChildren.call(this);
        this.createNegativeChildren();
        this.createPositiveChildren();
        this.createCheckboxListener();
    };
    BooleanQuestionRenderer.prototype.createNegativeChildren = function () {
        var negativeVariation = this.answer.getNegativeVariation();
        var negativeChildQuestionsIterator = negativeVariation.getIterator();
        var negativeChildrenCreator = new CreateBooleanQuestionChildren(negativeChildQuestionsIterator, this.childrenContainer, true);
        this.negativeChildren = negativeChildrenCreator.getCollection();
    };
    BooleanQuestionRenderer.prototype.createPositiveChildren = function () {
        var positiveVariation = this.answer.getPositiveVariation();
        var positiveChildQuestionsIterator = positiveVariation.getIterator();
        var positiveChildrenCreator = new CreateBooleanQuestionChildren(positiveChildQuestionsIterator, this.childrenContainer, false);
        this.positiveChildren = positiveChildrenCreator.getCollection();
    };
    BooleanQuestionRenderer.prototype.getControl = function () {
        if (this.value == this.positiveValueString) {
            return this.$j('<input type="checkbox" value="" checked="checked" class="questionContent control">');
        }
        else {
            return this.$j('<input type="checkbox" value="" class="questionContent control">');
        }
    };
    BooleanQuestionRenderer.prototype.createCheckboxListener = function () {
        var _this = this;
        this.control.change(function () { return _this.onCheckBoxChanged(); });
    };
    BooleanQuestionRenderer.prototype.onCheckBoxChanged = function () {
        this.enabled = this.control.is(':checked');
        this.checked = this.enabled;
        if (this.checked) {
            this.hideError();
        }
        this.onCheckedChanged();
        this.onEnabledChanged();
        this.updateAnswer();
    };
    BooleanQuestionRenderer.prototype.clearChildren = function () {
        for (var i = 0; i < this.positiveChildren.length; i++) {
            this.positiveChildren[i].clear();
        }
    };
    // TODO нарушение инкапсуляции !!!
    BooleanQuestionRenderer.prototype.updateAnswer = function () {
        var answerValue;
        if (this.enabled) {
            answerValue = this.positiveValueString;
        }
        else {
            answerValue = this.negativeValueString;
        }
        this.answer.setValue(answerValue);
        EventBus.dispatchEvent("ANSWER_VALUE_CHANGED", { questionId: this.data.getId(), answerValue: answerValue });
    };
    BooleanQuestionRenderer.prototype.onCheckedChanged = function () {
        if (this.checked) {
            this.enablePositive();
            this.enableNegative();
        }
        else {
            this.disableNegative();
            this.disablePositive();
            this.clearChildren();
        }
    };
    BooleanQuestionRenderer.prototype.onEnabledChanged = function () {
        if (!this.enabled) {
            this.updateChildrenEnabled(false);
        }
        else {
            this.updateChildrenEnabled(this.checked);
        }
    };
    BooleanQuestionRenderer.prototype.updateChildrenEnabled = function (enabled) {
        if (enabled) {
            this.enablePositive();
            this.enableNegative();
        }
        else {
            this.disablePositive();
            this.disableNegative();
        }
    };
    BooleanQuestionRenderer.prototype.disableNegative = function () {
        for (var i = 0; i < this.negativeChildren.length; i++) {
            this.negativeChildren[i].setEnabled(false);
        }
    };
    BooleanQuestionRenderer.prototype.enableNegative = function () {
        for (var i = 0; i < this.negativeChildren.length; i++) {
            this.negativeChildren[i].setEnabled(true);
        }
    };
    BooleanQuestionRenderer.prototype.disablePositive = function () {
        for (var i = 0; i < this.positiveChildren.length; i++) {
            this.positiveChildren[i].setEnabled(false);
        }
    };
    BooleanQuestionRenderer.prototype.enablePositive = function () {
        for (var i = 0; i < this.positiveChildren.length; i++) {
            this.positiveChildren[i].setEnabled(true);
        }
    };
    BooleanQuestionRenderer.prototype.setInitValue = function () {
        if (this.value == this.positiveValueString) {
            this.enabled = this.checked = true;
        }
        else {
            this.enabled = this.checked = false;
        }
    };
    BooleanQuestionRenderer.prototype.onError = function () {
        this.showError();
    };
    return BooleanQuestionRenderer;
}(QuestionRenderer));
//# sourceMappingURL=BooleanQuestionRenderer.js.map