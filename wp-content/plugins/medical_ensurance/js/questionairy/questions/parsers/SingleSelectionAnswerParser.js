var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="IAnswerParser.ts"/>
///<reference path="AnswerVariationsParser.ts"/>
///<reference path="MapParser.ts"/>
///<reference path="QuestionParser.ts"/>
var SingleSelectionAnswerParser = (function (_super) {
    __extends(SingleSelectionAnswerParser, _super);
    function SingleSelectionAnswerParser() {
        _super.apply(this, arguments);
    }
    SingleSelectionAnswerParser.prototype.parse = function (answerData, questionViewType) {
        this.questionViewType = questionViewType;
        var answer = this.createAnswer();
        answer.setValue(answerData.value);
        var variationsStructure = answerData.variations;
        var variationsData = answerData.variations.items;
        this.createVariationsStructure(answer, variationsStructure);
        this.createVariations(answer, variationsData);
        var value = answer.getValue();
        this.updateSelection(value, answer);
        return answer;
    };
    SingleSelectionAnswerParser.prototype.createAnswer = function () {
        return new SingleSelectionAnswer();
    };
    SingleSelectionAnswerParser.prototype.updateSelection = function (value, answer) {
        if (typeof value === "undefined") {
            var variationsIterator = answer.getIterator();
            if (variationsIterator.hasNext()) {
                var firstItem = variationsIterator.next();
                var firstValue = firstItem.getText();
                answer.setValue(firstValue);
            }
        }
    };
    return SingleSelectionAnswerParser;
}(AnswerParser));
//# sourceMappingURL=SingleSelectionAnswerParser.js.map