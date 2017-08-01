///<reference path="Answer.ts"/>
///<reference path="booleanAnswer/BooleanAnswer.ts"/>
///<reference path="singleSelectionAnswer/SingleSelectionAnswer.ts"/>
///<reference path="multipleSelectionAnswer/MultipleSelectionAnswer.ts"/>
///<reference path="textAnswer/TextInputAnswer.ts"/>
///<reference path="dateSelectionAnswer/DateSelectionAnswer.ts"/>
///<reference path="textAnswer/TextViewAnswer.ts"/>
var AnswerFactory = (function () {
    function AnswerFactory() {
    }
    AnswerFactory.create = function (type) {
        if (type == ObjectType.BOOLEAN_ANSWER) {
            return new BooleanAnswer();
        }
        else if (type == ObjectType.SINGLE_SELECTION_ANSWER) {
            return new SingleSelectionAnswer();
        }
        else if (type == ObjectType.MULTIPLE_SELECTION_ANSWER) {
            return new MultipleSelectionAnswer();
        }
        else if (type == ObjectType.TEXT_INPUT_ANSWER) {
            return new TextInputAnswer();
        }
        else if (type == ObjectType.TEXT_VIEW_ANSWER) {
            return new TextViewAnswer();
        }
        else if (type == ObjectType.DATE_SELECTION_ANSWER) {
            return new DateSelectionAnswer();
        }
        return;
    };
    return AnswerFactory;
}());
//# sourceMappingURL=AnswerFactory.js.map