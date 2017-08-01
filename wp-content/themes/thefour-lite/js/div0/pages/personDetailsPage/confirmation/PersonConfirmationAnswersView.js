var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/app/FrontendUserAnswers.ts"/>
///<reference path="PersonConfirmationView.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePerson.ts"/>
var PersonConfirmationAnswersView = (function (_super) {
    __extends(PersonConfirmationAnswersView, _super);
    function PersonConfirmationAnswersView(person) {
        _super.call(this, person);
    }
    PersonConfirmationAnswersView.prototype.createChildren = function () {
        var answeredQuestions = this.person.getQuestions();
        this.answers = answeredQuestions.getEncoder().encode();
        this.loadAnswers();
        _super.prototype.createChildren.call(this);
    };
    PersonConfirmationAnswersView.prototype.loadAnswers = function () {
        this.answersView = new FrontendUserAnswers(this.answers, this.containerId);
    };
    return PersonConfirmationAnswersView;
}(PersonConfirmationView));
//# sourceMappingURL=PersonConfirmationAnswersView.js.map