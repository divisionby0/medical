var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="QuotePerson.ts"/>
///<reference path="QuotePersonAdminView.ts"/>
///<reference path="../../../questionairy/app/UserAnswersPDFView.ts"/>
var QuotePersonPDFView = (function (_super) {
    __extends(QuotePersonPDFView, _super);
    function QuotePersonPDFView(person, container) {
        _super.call(this, person, container);
    }
    QuotePersonPDFView.prototype.createQuestionsView = function () {
        var questions = this.person.getQuestions();
        new UserAnswersPDFView(questions, this.questionsContainerId);
    };
    QuotePersonPDFView.prototype.createQuestionsContainer = function () {
        this.questionsContainerId = "questions_" + Math.round(Math.random() * 100000);
        var questionsContainerHeader = this.$j("<div><h1 style='width: 100%; background-color: #dff0d8; text-align: center;'>Medical declaration questions</h1></div>");
        this.questionsContainer = this.$j("<div id='" + this.questionsContainerId + "'></div>");
        this.personContainer.append(questionsContainerHeader);
        this.personContainer.append(this.questionsContainer);
    };
    return QuotePersonPDFView;
}(QuotePersonAdminView));
//# sourceMappingURL=QuotePersonPDFView.js.map