var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../Answer.ts"/>
///<reference path="../variation/AnswerVariation.ts"/>
///<reference path="../../parsers/ObjectType.ts"/>
var BooleanAnswer = (function (_super) {
    __extends(BooleanAnswer, _super);
    function BooleanAnswer() {
        _super.call(this, "");
        this.type = ObjectType.BOOLEAN_ANSWER;
        this.createVariations();
        this.setValue("No");
    }
    BooleanAnswer.prototype.createVariations = function () {
        var negativeAnswerVariation = new AnswerVariation("No");
        var positiveAnswerVariation = new AnswerVariation("Yes");
        negativeAnswerVariation.setRemovable(false);
        positiveAnswerVariation.setRemovable(false);
        negativeAnswerVariation.setIndex(0);
        positiveAnswerVariation.setIndex(1);
        this.variations.add("0", negativeAnswerVariation);
        this.variations.add("1", positiveAnswerVariation);
    };
    BooleanAnswer.prototype.getNegativeVariation = function () {
        return this.variations.get("0");
    };
    BooleanAnswer.prototype.getPositiveVariation = function () {
        return this.variations.get("1");
    };
    BooleanAnswer.prototype.addVariation = function (variation) {
        //console.error("Cannot modify variations for boolean answer.");
    };
    BooleanAnswer.prototype.removeVariation = function (id) {
        var variationsIterator = this.variations.getIterator();
        while (variationsIterator.hasNext()) {
            var variation = variationsIterator.next();
            variation.removeAnswer(id);
            variation.removeQuestion(id);
        }
    };
    return BooleanAnswer;
}(Answer));
//# sourceMappingURL=BooleanAnswer.js.map