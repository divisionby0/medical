var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../utils/formatters/MoneyFormatter.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/questionairy/app/FrontendUserQuestions.ts"/>
///<reference path="../views/SelectionForm.ts"/>
///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="../BasePage.ts"/>
///<reference path="questions/PersonQuestionsView.ts"/>
///<reference path="confirmation/PersonConfirmationView.ts"/>
///<reference path="error/PersonDetailsErrorView.ts"/>
///<reference path="NavigateToPrevPageDetector.ts"/>
///<reference path="confirmation/PersonConfirmationAnswersView.ts"/>
///<reference path="../../utils/QuoteSaver.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/db/DB.ts"/>
var PersonDetailsPage = (function (_super) {
    __extends(PersonDetailsPage, _super);
    function PersonDetailsPage() {
        _super.call(this);
        this.prevPage = "application-creation";
        this.nextPage = "/medicalissusselectionpage";
        this.QUESTIONS = "QUESTIONS";
        this.CONFIRMATION = "CONFIRMATION";
        this.COMPLETE = "COMPLETE";
        this.PREV_PAGE_REQUESTED = "PREV_PAGE_REQUESTED";
        this.answerInvalidErrorType = "answerInvalid";
        this.confirmationInvalidErrorType = "confirmationInvalid";
    }
    PersonDetailsPage.prototype.create = function () {
        this.companyData = this.getCompany();
        this.parseCompany(this.companyData);
        this.persons = this.getPersons();
        this.currentPerson = this.getUncompletePerson();
        this.onCurrentPersonChanged();
        this.createNavigationListeners();
    };
    PersonDetailsPage.prototype.onCurrentPersonChanged = function () {
        var isUndefined = typeof this.currentPerson == 'undefined';
        if (!isUndefined) {
            this.currentState = this.QUESTIONS;
            this.onStateChanged();
        }
        else {
            this.savePersonsData();
            this.navigateTo(this.nextPage);
        }
    };
    PersonDetailsPage.prototype.savePersonsData = function () {
        var quoteId = Cookie.getQuoteId();
        var personsData = this.persons.getData();
        var decodedPersonsData = escape(personsData);
        alert("saving persons data quoteId=" + quoteId);
        DB.savePersons(decodedPersonsData, quoteId);
    };
    PersonDetailsPage.prototype.getUncompletePerson = function () {
        var personIterator = this.persons.getIterator();
        while (personIterator.hasNext()) {
            var person = personIterator.next();
            if (!person.getIsComplete()) {
                return person;
            }
        }
        return;
    };
    PersonDetailsPage.prototype.onStateChanged = function () {
        if (this.currentState == this.QUESTIONS) {
            this.showQuestions();
        }
        else if (this.currentState == this.CONFIRMATION) {
            this.showConfirmation();
        }
    };
    PersonDetailsPage.prototype.showQuestions = function () {
        this.questionsView = new PersonQuestionsView(this.currentPerson, this.companyId);
    };
    PersonDetailsPage.prototype.hideQuestions = function () {
        if (this.questionsView) {
            this.questionsView.destroy();
        }
    };
    PersonDetailsPage.prototype.showConfirmation = function () {
        this.confirmationView = new PersonConfirmationAnswersView(this.currentPerson);
    };
    PersonDetailsPage.prototype.hideConfirmation = function () {
        if (this.confirmationView) {
            this.confirmationView.destroy();
        }
    };
    PersonDetailsPage.prototype.createNavigationListeners = function () {
        var _this = this;
        this.$j("#nextButton").click(function () { return _this.onNextButtonClick(); });
        this.$j("#prevButton").click(function () { return _this.onPrevButtonClick(); });
    };
    PersonDetailsPage.prototype.onNextButtonClick = function () {
        this.hideError();
        if (this.currentState == this.QUESTIONS) {
            var personMedicalAnswerIsValid = this.questionsView.isValid();
            if (personMedicalAnswerIsValid) {
                this.onQuestionsAnswerValid();
            }
            else {
                this.showError(this.answerInvalidErrorType);
            }
        }
        else if (this.currentState == this.CONFIRMATION) {
            var dataIsValid = this.confirmationView.isValid();
            if (dataIsValid) {
                this.onAnswersConfirmed();
            }
            else {
                this.showError(this.confirmationInvalidErrorType);
            }
        }
    };
    PersonDetailsPage.prototype.onPrevButtonClick = function () {
        var personIterator = this.persons.getIterator();
        var navigateToPrevPageDetector = new NavigateToPrevPageDetector(personIterator);
        var prevPageNavigateRequested = navigateToPrevPageDetector.detect(this.currentState);
        if (prevPageNavigateRequested) {
            this.navigateTo(this.prevPage);
        }
        else {
            this.prevPerson();
        }
    };
    PersonDetailsPage.prototype.prevPerson = function () {
        this.dropCompleteForEachPerson();
        this.hideConfirmation();
        this.hideQuestions();
        this.hideError();
        this.currentPerson = this.getUncompletePerson();
        this.onCurrentPersonChanged();
    };
    PersonDetailsPage.prototype.dropCompleteForEachPerson = function () {
        var personIterator = this.persons.getIterator();
        while (personIterator.hasNext()) {
            var person = personIterator.next();
            person.setIsComplete(false);
        }
    };
    PersonDetailsPage.prototype.onQuestionsAnswerValid = function () {
        this.hideQuestions();
        this.currentState = this.CONFIRMATION;
        this.onStateChanged();
    };
    PersonDetailsPage.prototype.onAnswersConfirmed = function () {
        this.hideConfirmation();
        this.currentPerson.setIsComplete(true);
        this.currentPerson = this.getUncompletePerson();
        this.onCurrentPersonChanged();
    };
    PersonDetailsPage.prototype.navigateTo = function (page) {
        console.log("navigate to " + page);
        //this.$j("#confirmationHeaderContainer").text("Please wait...");
        //this.$j("#personDetailsContainer").hide();
        if (page == "/medicalissusselectionpage") {
            this.$j("#confirmationHeaderContainer").text("Please wait...");
            this.$j("#personDetailsContainer").hide();
            this.$j("#nextButton").hide();
            this.$j("#prevButton").hide();
        }
        NavigatorUtil.navigateTo(page);
    };
    PersonDetailsPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    PersonDetailsPage.prototype.parseCompany = function (companyData) {
        this.companyId = companyData.companyId;
    };
    PersonDetailsPage.prototype.hideError = function () {
        if (this.errorView) {
            this.errorView.destroy();
        }
    };
    PersonDetailsPage.prototype.showError = function (type) {
        this.errorView = new PersonDetailsErrorView(this.$j("#userPersonalDataErrorText"));
        if (type == "answerInvalid") {
            this.errorView.showAnswerError();
        }
        else if (type == "confirmationInvalid") {
            this.errorView.showConfirmationError();
        }
    };
    return PersonDetailsPage;
}(BasePage));
//# sourceMappingURL=PersonDetailsPage.js.map