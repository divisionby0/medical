///<reference path="../collection/QuestionsCollection.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="../question/view/QuestionAdminView.ts"/>
///<reference path="../question/view/QuestionViewFactory.ts"/>
///<reference path="../../../collections/Map.ts"/>
var QuestionCollectionParser = (function () {
    function QuestionCollectionParser() {
    }
    QuestionCollectionParser.parse = function (map, questionViewType) {
        var questionsCollection = new QuestionsCollection('questions');
        //console.log("parsing ",map);
        try {
            var mapIterator = map.getIterator();
            while (mapIterator.hasNext()) {
                var item = mapIterator.next();
                //console.log("item=",item);
                var type = item.type;
                //console.log("type="+type);
                if (type == "question") {
                    //console.log("is question");
                    var question = QuestionParser.parse(item, questionViewType);
                    var questionIndex = item.index;
                    question.setView(QuestionViewFactory.getView(questionViewType));
                    questionsCollection.addQuestion(question);
                    question.setIndex(questionIndex);
                }
            }
        }
        catch (error) {
            console.error("QuestionCollectionParser error:" + error);
        }
        return questionsCollection;
    };
    return QuestionCollectionParser;
}());
//# sourceMappingURL=QuestionCollectionParser.js.map