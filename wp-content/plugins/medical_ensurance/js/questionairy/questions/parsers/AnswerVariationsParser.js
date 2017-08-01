///<reference path="../answer/variation/AnswerVariation.ts"/>
///<reference path="MapParser.ts"/>
///<reference path="../../../collections/Map.ts"/>
var AnswerVariationsParser = (function () {
    function AnswerVariationsParser() {
    }
    AnswerVariationsParser.parse = function (variationsData) {
        var variations = new Map('variations');
        var answerVariations = MapParser.parse(variationsData);
        var answerVariationsIterator = answerVariations.getIterator();
        while (answerVariationsIterator.hasNext()) {
            var answerVariationData = answerVariationsIterator.next();
            var answerVariation = new AnswerVariation(answerVariationData.text);
            var index = answerVariationData.index;
            answerVariation.setTextShowAtResult(answerVariationData.showTextAtResult);
            variations.add(answerVariation.getText(), answerVariation);
            answerVariation.setIndex(index);
        }
        return variations;
    };
    return AnswerVariationsParser;
}());
//# sourceMappingURL=AnswerVariationsParser.js.map