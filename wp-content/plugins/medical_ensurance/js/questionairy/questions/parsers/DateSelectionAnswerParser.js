var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../answer/dateSelectionAnswer/DateSelectionAnswer.ts"/>
///<reference path="../answer/Answer.ts"/>
///<reference path="TextInputAnswerParser.ts"/>
var DateSelectionAnswerParser = (function (_super) {
    __extends(DateSelectionAnswerParser, _super);
    function DateSelectionAnswerParser() {
        _super.apply(this, arguments);
    }
    DateSelectionAnswerParser.prototype.parseSubQuestions = function (collection) {
        return [];
    };
    DateSelectionAnswerParser.prototype.getDefaultValue = function () {
        return "";
    };
    DateSelectionAnswerParser.prototype.createAnswer = function () {
        return new DateSelectionAnswer();
    };
    return DateSelectionAnswerParser;
}(TextInputAnswerParser));
//# sourceMappingURL=DateSelectionAnswerParser.js.map