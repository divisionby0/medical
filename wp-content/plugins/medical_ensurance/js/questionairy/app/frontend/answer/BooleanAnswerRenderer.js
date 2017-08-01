var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../../questions/answer/variation/AnswerVariation.ts"/>
///<reference path="AnswerRenderer.ts"/>
///<reference path="../../../questions/answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../question/QuestionRenderer.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
var BooleanAnswerRenderer = (function (_super) {
    __extends(BooleanAnswerRenderer, _super);
    function BooleanAnswerRenderer(data, container) {
        _super.call(this, data, container);
        this.isNegative = false;
    }
    BooleanAnswerRenderer.prototype.createChildren = function () {
        this.positiveValueString = 'Yes';
        this.negativeColor = 'red';
        this.positiveColor = 'blue';
        this.answer = this.data.getAnswer();
        this.value = this.answer.getValue();
        this.updateValueColor();
        this.createChildrenContainer();
        this.createText();
        this.updateText();
        this.createNegativeChildren();
        this.createPositiveChildren();
        if (this.value != this.positiveValueString) {
            this.childrenContainer.addClass("negativeValue");
        }
    };
    BooleanAnswerRenderer.prototype.updateText = function () {
        var resultContainerPrefix = '<div style="display: block; float: left; width: 100%;">';
        var questionText = "<div style='display: block; float: left;'>" + this.data.getText() + "</div>";
        var answerText = '<div style="float: left; display: block; padding-left: 20px;"><b style="color:' + this.valueColor + ';"><u>   ' + this.value + '</u></b></div>';
        var resultContainerPostfix = '</div>';
        var resultHtml = resultContainerPrefix + questionText + answerText + resultContainerPostfix;
        this.textLabel.html(resultHtml);
    };
    BooleanAnswerRenderer.prototype.updateValueColor = function () {
        if (this.value == this.positiveValueString) {
            this.valueColor = this.positiveColor;
        }
        else {
            this.valueColor = this.negativeColor;
        }
    };
    BooleanAnswerRenderer.prototype.createNegativeChildren = function () {
        var negativeVariation = this.answer.getNegativeVariation();
        var negativeChildQuestionsIterator = negativeVariation.getIterator();
        var negativeChildrenCreator = new CreateBooleanQuestionChildren(negativeChildQuestionsIterator, this.childrenContainer, true);
        this.negativeChildren = negativeChildrenCreator.getCollection();
    };
    BooleanAnswerRenderer.prototype.createPositiveChildren = function () {
        var positiveVariation = this.answer.getPositiveVariation();
        var positiveChildQuestionsIterator = positiveVariation.getIterator();
        var positiveChildrenCreator = new CreateBooleanQuestionChildren(positiveChildQuestionsIterator, this.childrenContainer, false);
        this.positiveChildren = positiveChildrenCreator.getCollection();
    };
    return BooleanAnswerRenderer;
}(AnswerRenderer));
//# sourceMappingURL=BooleanAnswerRenderer.js.map