var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="../../utils/validators/TextLengthValidator.ts"/>
///<reference path="PersonalInfoRequestView.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/collections/Map.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/collections/json/MapJsonDecoder.ts"/>
///<reference path="../views/SelectionForm.ts"/>
///<reference path="../companyPlanSelectionPage/CompanyPlanSelectionForm.ts"/>
///<reference path="../BasePage.ts"/>
///<reference path="MedicalDeclarationRequirementUpdater.ts"/>
///<reference path="PersonsAdditionalDataRequestView.ts"/>
var ApplicationCreationPage = (function (_super) {
    __extends(ApplicationCreationPage, _super);
    function ApplicationCreationPage() {
        _super.call(this);
        this.prevPage = "plan-selection";
        this.nextPage = "person-details";
    }
    ApplicationCreationPage.prototype.create = function () {
        var _this = this;
        this.views = new Map("personViews");
        this.ages = this.getAges();
        this.persons = this.getPersons();
        this.updatePersonsMedicalDeclarationRequirements();
        this.createChildren();
        EventBus.addEventListener("PERSONAL_INFO_VALUE_CHANGED", function () { return _this.personalInfoValueChangedHandler(); });
        EventBus.addEventListener("PERSONAL_INFO_FIRST_NAME_VALIDATE_ERROR", function (data) { return _this.personalInfoFirstNameValidateErrorHandler(data); });
        EventBus.addEventListener("PERSONAL_INFO_LAST_NAME_VALIDATE_ERROR", function (data) { return _this.personalInfoLastNameValidateErrorHandler(data); });
        EventBus.addEventListener("PERSONAL_INFO_BIRTHDAY_VALIDATE_ERROR", function (data) { return _this.personalInfoBirthdayValidateErrorHandler(data); });
    };
    ApplicationCreationPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    // TODO путаница. Тут я получаю возрасты из элемента, хотя могу получить их из куков !!!!
    ApplicationCreationPage.prototype.getAges = function () {
        var agesData = this.$j("#agesCollectionContainer").text();
        var ages = new Array();
        var agesDecodedObject = JSON.parse(agesData);
        for (var i = 0; i < agesDecodedObject.length; i++) {
            var age = agesDecodedObject[i];
            ages.push(age);
        }
        // disable sorting
        //ages.sort(this.compareFunction);
        return ages;
    };
    ApplicationCreationPage.prototype.createChildren = function () {
        var _this = this;
        this.prevButton = this.$j('#prevButton');
        this.nextButton = this.$j('#nextButton');
        this.prevButton.on("click", function () { return _this.prevButtonClickHandler(); });
        this.nextButton.on("click", function () { return _this.nextButtonClickHandler(); });
        for (var i = 0; i < this.ages.length; i++) {
            var person = this.persons.getPersonByAge(this.ages[i]);
            var personData = { age: this.ages[i] };
            if (person) {
                personData.firstName = person.getFirstName();
                personData.lastName = person.getLastName();
                personData.gender = person.getGender();
                personData.relationship = person.getRelationship();
                personData.birthday = person.getBirthday();
            }
            var view = new PersonalInfoRequestView(personData);
            this.views.add(this.ages[i].toString(), view);
        }
        this.personsAdditionalDataRequestView = new PersonsAdditionalDataRequestView();
    };
    ApplicationCreationPage.prototype.prevButtonClickHandler = function () {
        this.navigateToPrevPage();
    };
    ApplicationCreationPage.prototype.navigateToNextPage = function () {
        NavigatorUtil.navigateTo(this.nextPage);
    };
    ApplicationCreationPage.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    ApplicationCreationPage.prototype.nextButtonClickHandler = function () {
        this.onNextButtonClick();
    };
    ApplicationCreationPage.prototype.onNextButtonClick = function () {
        this.hideError();
        console.log("this.personsAdditionalDataRequestView=" + this.personsAdditionalDataRequestView);
        var validateResult = this.personsAdditionalDataRequestView.validate();
        var dataIsValid = validateResult.isValid;
        if (!dataIsValid) {
            this.errorText = validateResult.errorText;
            this.onDataInvalid();
            return;
        }
        var viewsIterator = this.views.getIterator();
        while (viewsIterator.hasNext()) {
            var view = viewsIterator.next();
            dataIsValid = view.isValid();
            if (!dataIsValid) {
                this.onDataInvalid();
                return;
            }
        }
        this.saveData();
        this.navigateToNextPage();
    };
    ApplicationCreationPage.prototype.onDataInvalid = function () {
        this.showError();
    };
    ApplicationCreationPage.prototype.personalInfoValueChangedHandler = function () {
        this.hideError();
    };
    ApplicationCreationPage.prototype.hideError = function () {
        this.$j("#userPersonalDataErrorText").text("");
        this.$j("#userPersonalDataErrorText").addClass("hidden");
        var viewsIterator = this.views.getIterator();
        while (viewsIterator.hasNext()) {
            var view = viewsIterator.next();
            view.dropError();
        }
    };
    ApplicationCreationPage.prototype.showError = function () {
        this.$j("#userPersonalDataErrorText").text(this.errorText);
        this.$j("#userPersonalDataErrorText").removeClass("hidden");
    };
    ApplicationCreationPage.prototype.saveData = function () {
        var viewsIterator = this.views.getIterator();
        var counter = 0;
        while (viewsIterator.hasNext()) {
            var view = viewsIterator.next();
            var personData = view.getData();
            var age = personData.age;
            var currentPerson = this.persons.getPersonByAge(age);
            currentPerson.setFirstName(personData.firstName);
            currentPerson.setLastName(personData.lastName);
            currentPerson.setGender(personData.gender);
            currentPerson.setBirthday(personData.birthday);
            if (counter == 0) {
                currentPerson.setRelationship("Primary");
            }
            else {
                currentPerson.setRelationship(personData.relationship);
            }
            counter++;
        }
        Cookie.setPersons(this.persons.getData());
    };
    ApplicationCreationPage.prototype.personalInfoFirstNameValidateErrorHandler = function (age) {
        this.errorText = "Person with age " + age + " has invalid first name.";
    };
    ApplicationCreationPage.prototype.personalInfoLastNameValidateErrorHandler = function (age) {
        this.errorText = "Person with age " + age + " has invalid last name.";
    };
    ApplicationCreationPage.prototype.personalInfoBirthdayValidateErrorHandler = function (age) {
        this.errorText = "Person with age " + age + " has invalid birthday.";
    };
    ApplicationCreationPage.prototype.getRateTableGuideData = function () {
        return this.$j("#companyRateTableGuide").text();
    };
    ApplicationCreationPage.prototype.parseRateTableGuide = function (data) {
        var parser = new RateTableGuideParser();
        return parser.parse(data);
    };
    ApplicationCreationPage.prototype.compareFunction = function (a, b) {
        if (a > b) {
            return -1;
        }
        else {
            return 1;
        }
    };
    ApplicationCreationPage.prototype.updatePersonsMedicalDeclarationRequirements = function () {
        var rateTableGuideData = this.getRateTableGuideData();
        var rateTableGuide = this.parseRateTableGuide(rateTableGuideData);
        var medicalDeclarationRequirementUpdater = new MedicalDeclarationRequirementUpdater(this.persons, rateTableGuide);
        medicalDeclarationRequirementUpdater.update();
    };
    return ApplicationCreationPage;
}(BasePage));
//# sourceMappingURL=ApplicationCreationPage.js.map