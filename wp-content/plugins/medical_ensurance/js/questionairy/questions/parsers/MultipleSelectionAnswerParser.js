var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="IAnswerParser.ts"/>
///<reference path="../answer/singleSelectionAnswer/SingleSelectionAnswer.ts"/>
///<reference path="AnswerVariationsParser.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="MapParser.ts"/>
///<reference path="../question/view/QuestionViewFactory.ts"/>
var MultipleSelectionAnswerParser = (function (_super) {
    __extends(MultipleSelectionAnswerParser, _super);
    function MultipleSelectionAnswerParser() {
        _super.apply(this, arguments);
    }
    MultipleSelectionAnswerParser.prototype.parse = function (answerData, questionViewType) {
        var children;
        var questionView;
        if (questionViewType != "") {
            questionView = QuestionViewFactory.getView(questionViewType);
        }
        if (answerData.children) {
            children = answerData.children.collection.items;
        }
        else {
            children = answerData.collection.collection.items;
        }
        var booleanAnswerParser = new BooleanAnswerParser();
        var answer = new MultipleSelectionAnswer();
        for (var key in children) {
            var child = children[key];
            var childAnswerVariationText = child.text;
            // это всегда boolean
            var childBooleanAnswerData = child.answer;
            var childAnswerVariationValue = childBooleanAnswerData.value;
            var childAnswerVariation = new AnswerVariation(childAnswerVariationText);
            var childBooleanAnswer = booleanAnswerParser.parse(childBooleanAnswerData, questionViewType);
            var childNegativeVariation = childBooleanAnswer.getVariation("0");
            var childPositiveVariation = childBooleanAnswer.getVariation("1");
            var addedBooleanQuestion = answer.addVariation(childAnswerVariation);
            addedBooleanQuestion.setView(questionView);
            addedBooleanQuestion.setIndex(child.index);
            if (typeof childAnswerVariationValue === "undefined") {
                addedBooleanQuestion.getAnswer().setValue("No");
            }
            else {
                addedBooleanQuestion.getAnswer().setValue(childAnswerVariationValue);
            }
            var addedBooleanQuestionNegativeVariation = addedBooleanQuestion.getAnswer().getVariation("0");
            var negativeChildrenVariationQuestionsIterator = childNegativeVariation.getIterator();
            while (negativeChildrenVariationQuestionsIterator.hasNext()) {
                var negativeChildVariationQuestion = negativeChildrenVariationQuestionsIterator.next();
                negativeChildVariationQuestion.setView(questionView);
                addedBooleanQuestionNegativeVariation.addQuestion(negativeChildVariationQuestion);
            }
            var addedBooleanQuestionPositiveVariation = addedBooleanQuestion.getAnswer().getVariation("1");
            var positiveChildrenVariationQuestionsIterator = childPositiveVariation.getIterator();
            while (positiveChildrenVariationQuestionsIterator.hasNext()) {
                var positiveChildrenVariationQuestion = positiveChildrenVariationQuestionsIterator.next();
                positiveChildrenVariationQuestion.setView(questionView);
                addedBooleanQuestionPositiveVariation.addQuestion(positiveChildrenVariationQuestion);
            }
        }
        return answer;
    };
    return MultipleSelectionAnswerParser;
}(AnswerParser));
//# sourceMappingURL=MultipleSelectionAnswerParser.js.map