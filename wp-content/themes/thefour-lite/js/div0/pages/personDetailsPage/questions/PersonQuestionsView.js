///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/app/FrontendUserQuestions.ts"/>
///<reference path="../validator/PersonMedicalDeclarationAnswerValidator.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePerson.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/questions/utils/QuestionCollectionCutter.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
var PersonQuestionsView = (function () {
    function PersonQuestionsView(person, companyId) {
        this.hasAnsweredSavedQuestions = false;
        this.$j = jQuery.noConflict();
        this.person = person;
        this.companyId = companyId;
        this.createChildren();
    }
    PersonQuestionsView.prototype.destroy = function () {
        this.$j("#questionsRootContainer").empty();
    };
    PersonQuestionsView.prototype.isValid = function () {
        var validator = new PersonMedicalDeclarationAnswerValidator(this.userQuestionsView.getData());
        return validator.validate();
    };
    PersonQuestionsView.prototype.getAnswers = function () {
        return this.person.getQuestions().getEncoder().encode();
    };
    PersonQuestionsView.prototype.createChildren = function () {
        this.$j("#personHeaderContainer").show();
        this.$j("#confirmationHeaderContainer").hide();
        this.$j("#personHeaderContainer").text(this.person.getFirstName() + "   " + this.person.getLastName());
        this.$j("#firstNameContainer").text(this.person.getFirstName());
        this.$j("#lastNameContainer").text(this.person.getLastName());
        this.$j("#genderContainer").text(this.person.getGender());
        this.$j("#dateOfBirthContainer").text(this.person.getBirthday());
        this.$j("#ageContainer").text(this.person.getAge());
        this.getQuestions();
    };
    PersonQuestionsView.prototype.getQuestions = function () {
        var questionsLoaded = this.questionsIsLoaded();
        if (!questionsLoaded) {
            this.loadQuestions();
        }
        else {
            this.createSavedQuestionsFrontend();
        }
    };
    PersonQuestionsView.prototype.onQuestionsLoadComplete = function (response) {
        this.$j("#questionsPreloaderTextContainer").addClass("hidden");
        var personQuestions;
        var dataDecoder = new MapJsonDecoder(response);
        var map = dataDecoder.decode();
        var parsedQuestions = QuestionCollectionParser.parse(map, '');
        console.log("this.person.getMedicalDeclarationRequired()=" + this.person.getMedicalDeclarationRequired());
        if (!this.person.getMedicalDeclarationRequired()) {
            var collectionCutter = new QuestionCollectionCutter(parsedQuestions);
            var cuttedQuestions = collectionCutter.getQuestionsBeforeFirstBoolean();
            personQuestions = cuttedQuestions;
        }
        else {
            personQuestions = parsedQuestions;
        }
        var encodedQuestionsData = personQuestions.getEncoder().encode();
        this.userQuestionsView = new FrontendUserQuestions(encodedQuestionsData, "questionsRootContainer");
        this.person.setQuestions(this.userQuestionsView.getData());
    };
    PersonQuestionsView.prototype.questionsIsLoaded = function () {
        return !this.$j.isEmptyObject(this.person.getQuestions());
    };
    PersonQuestionsView.prototype.loadQuestions = function () {
        var _this = this;
        this.$j("#questionsPreloaderTextContainer").removeClass("hidden");
        var data = { 'action': 'loadQuestions', 'companyId': this.companyId };
        this.$j.post(ajaxurl, data, function (response) { return _this.onQuestionsLoadComplete(response); });
    };
    PersonQuestionsView.prototype.createSavedQuestionsFrontend = function () {
        var savedQuestionsData = this.person.getQuestions().getEncoder().encode();
        this.userQuestionsView = new FrontendUserQuestions(savedQuestionsData, "questionsRootContainer");
        this.person.setQuestions(this.userQuestionsView.getData());
    };
    return PersonQuestionsView;
}());
//# sourceMappingURL=PersonQuestionsView.js.map