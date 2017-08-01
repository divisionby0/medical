var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="TextInputAnswerParser.ts"/>
///<reference path="../answer/textAnswer/TextViewAnswer.ts"/>
var TextViewAnswerParser = (function (_super) {
    __extends(TextViewAnswerParser, _super);
    function TextViewAnswerParser() {
        _super.apply(this, arguments);
    }
    TextViewAnswerParser.prototype.createAnswer = function () {
        return new TextViewAnswer();
    };
    return TextViewAnswerParser;
}(TextInputAnswerParser));
//# sourceMappingURL=TextViewAnswerParser.js.map