var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="SingleSelectionAnswerParser.ts"/>
var BooleanAnswerParser = (function (_super) {
    __extends(BooleanAnswerParser, _super);
    function BooleanAnswerParser() {
        _super.apply(this, arguments);
    }
    BooleanAnswerParser.prototype.createAnswer = function () {
        return new BooleanAnswer();
    };
    BooleanAnswerParser.prototype.parse = function (answerData, questionViewType) {
        var answer = _super.prototype.parse.call(this, answerData, questionViewType);
        if (typeof answerData.value === "undefined") {
            answer.setValue("No");
        }
        else {
            answer.setValue(answerData.value);
        }
        return answer;
    };
    BooleanAnswerParser.prototype.createVariationsStructure = function (answer, variationsStructure) {
        var answerVariations = AnswerVariationsParser.parse(variationsStructure);
        var answerVariationsIterator = answerVariations.getIterator();
        var counter = 0;
        while (answerVariationsIterator.hasNext()) {
            var answerVariation = answerVariationsIterator.next();
            answer.addVariation(answerVariation);
            answerVariation.setIndex(counter);
            counter++;
        }
    };
    return BooleanAnswerParser;
}(SingleSelectionAnswerParser));
//# sourceMappingURL=BooleanAnswerParser.js.map