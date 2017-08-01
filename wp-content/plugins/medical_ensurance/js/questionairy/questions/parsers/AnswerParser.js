///<reference path="../answer/Answer.ts"/>
///<reference path="../answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../answer/singleSelectionAnswer/SingleSelectionAnswer.ts"/>
///<reference path="AnswerVariationsParser.ts"/>
///<reference path="MapParser.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="../answer/AnswerFactory.ts"/>
///<reference path="ObjectType.ts"/>
///<reference path="IAnswerParser.ts"/>
///<reference path="../question/view/IQuestionView.ts"/>
var AnswerParser = (function () {
    function AnswerParser() {
    }
    AnswerParser.prototype.parse = function (answerData, questionViewType) {
        this.questionViewType = questionViewType;
        return;
    };
    AnswerParser.prototype.createVariationsStructure = function (answer, variationsStructure) {
        var answerVariations = AnswerVariationsParser.parse(variationsStructure);
        var answerVariationsIterator = answerVariations.getIterator();
        while (answerVariationsIterator.hasNext()) {
            var answerVariation = answerVariationsIterator.next();
            var variationIndex = answerVariation.getIndex();
            answer.addVariation(answerVariation);
            answerVariation.setIndex(variationIndex);
        }
    };
    AnswerParser.prototype.createVariations = function (answer, variationsData) {
        for (var key in variationsData) {
            var value = variationsData[key];
            if (value) {
                var answerVariationByKey = answer.getVariation(key);
                var variationSubQuestionCollection = this.getSubQuestionCollection(value.collection);
                var variationHasSubQuestions = variationSubQuestionCollection.size() > 0;
                if (variationHasSubQuestions) {
                    this.createVariationChildren(variationSubQuestionCollection, answerVariationByKey);
                }
            }
        }
    };
    AnswerParser.prototype.getSubQuestionCollection = function (data) {
        return MapParser.parse(data);
    };
    AnswerParser.prototype.createVariationChildren = function (variationSubQuestionCollection, variation) {
        if (variation) {
            var subQuestionsIterator = variationSubQuestionCollection.getIterator();
            while (subQuestionsIterator.hasNext()) {
                var questionData = subQuestionsIterator.next();
                var questionIndex = questionData.index;
                var question = QuestionParser.parse(questionData, this.questionViewType);
                variation.addQuestion(question);
                question.setIndex(questionIndex);
            }
        }
    };
    return AnswerParser;
}());
//# sourceMappingURL=AnswerParser.js.map