///<reference path="MultipleSelectionAnswerParser.ts"/>
///<reference path="SingleSelectionAnswerParser.ts"/>
///<reference path="BooleanAnswerParser.ts"/>
///<reference path="TextInputAnswerParser.ts"/>
///<reference path="DateSelectionAnswerParser.ts"/>
///<reference path="TextViewAnswerParser.ts"/>
var AnswerParserFactory = (function () {
    function AnswerParserFactory() {
    }
    AnswerParserFactory.create = function (type) {
        if (type == ObjectType.MULTIPLE_SELECTION_ANSWER) {
            return new MultipleSelectionAnswerParser();
        }
        else if (type == ObjectType.SINGLE_SELECTION_ANSWER) {
            return new SingleSelectionAnswerParser();
        }
        else if (type == ObjectType.BOOLEAN_ANSWER) {
            return new BooleanAnswerParser();
        }
        else if (type == ObjectType.TEXT_INPUT_ANSWER) {
            return new TextInputAnswerParser();
        }
        else if (type == ObjectType.TEXT_VIEW_ANSWER) {
            return new TextViewAnswerParser();
        }
        else if (type == ObjectType.DATE_SELECTION_ANSWER) {
            //return new TextInputAnswerParser();
            return new DateSelectionAnswerParser();
        }
        return;
    };
    return AnswerParserFactory;
}());
//# sourceMappingURL=AnswerParserFactory.js.map