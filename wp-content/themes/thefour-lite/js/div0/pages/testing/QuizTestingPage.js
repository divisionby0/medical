var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../BasePage.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/questionairy/app/FrontendUserQuestions.ts"/>
var QuizTestingPage = (function (_super) {
    __extends(QuizTestingPage, _super);
    function QuizTestingPage() {
        _super.call(this);
    }
    QuizTestingPage.prototype.create = function () {
        var questionsData = this.$j("#sampleQuestions").text();
        console.log("Quiz testing page create...");
        console.log("questions: " + questionsData);
        //new FrontendUserQuestions()
        new FrontendUserQuestions(questionsData, "questionsRootContainer");
    };
    return QuizTestingPage;
}(BasePage));
//# sourceMappingURL=QuizTestingPage.js.map