var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../BasePage.ts"/>
///<reference path="../../utils/QuoteSaver.ts"/>
///<reference path="../cardDetailsPage/Card.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/db/DB.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
///<reference path="../sendResultEmailPage/SendResultEmailPage.ts"/>
///<reference path="../QuoteId.ts"/>
var ApplicationFinishPage = (function (_super) {
    __extends(ApplicationFinishPage, _super);
    function ApplicationFinishPage() {
        _super.call(this);
        console.log("Im application finish page");
    }
    ApplicationFinishPage.prototype.create = function () {
        this.persons = this.getPersons();
        this.companyData = this.getCompany();
        this.createQuoteId();
        this.loadQuotePersonsData();
    };
    ApplicationFinishPage.prototype.createQuoteId = function () {
        console.log("app finish page creating quote id");
        var savedAppId = this.$j("#appIdContainer").val();
        console.log("outer app id: " + savedAppId);
        this.quoteId = new QuoteId(savedAppId);
    };
    ApplicationFinishPage.prototype.onApplicationSaved = function () {
        var resultEmailPage = new SendResultEmailPage();
        resultEmailPage.create();
    };
    ApplicationFinishPage.prototype.saveApplication = function () {
        var quoteSaver = new QuoteSaver();
        var period = Cookie.getPeriod();
        var encodedPlanData = Cookie.getCompanyPlan();
        var planData = StringUtils.parseURI(encodedPlanData);
        var encodedFormData = Cookie.getUserInputFormData();
        var formData = StringUtils.parseURI(encodedFormData);
        console.log("formData:", formData);
        var startDate = formData.startDate.date;
        var finishDate = formData.finishDate.date;
        startDate = startDate.split("+")[0];
        finishDate = finishDate.split("+")[0];
        var quoteData = JSON.stringify({ company: this.companyData.companyName, benefit: this.companyData.benefit, period: period, deductible: planData.deductible, cost: planData.cost, startDate: startDate, finishDate: finishDate });
        var numPersons = this.persons.size();
        var countryOfOrigin = Cookie.getCountryOfOrigin();
        var visitorType = Cookie.getVisitorType();
        var arrivalDate = Cookie.getArrivalDate();
        var sponsorFirstName = Cookie.getSponsorFirstName();
        var sponsorLastName = Cookie.getSponsorLastName();
        var beneficiaryFirstName = Cookie.getBeneficiaryFirstName();
        var beneficiaryLastName = Cookie.getBeneficiaryLastName();
        var address = Cookie.getAddress();
        var city = Cookie.getSponsorCity();
        var province = Cookie.getSponsorProvince();
        var postalCode = Cookie.getSponsorPostalCode();
        var email = Cookie.getEmail();
        var phone = Cookie.getPhone();
        var applicationType = Cookie.getApplicationType();
        console.log("application type: " + applicationType);
        this.quoteDataToSave = {
            quoteId: this.quoteId.getId(),
            companyName: this.companyData.companyName,
            quoteData: quoteData,
            persons: this.personsData,
            period: period,
            numPersons: numPersons,
            startDate: startDate,
            finishDate: finishDate,
            countryOfOrigin: countryOfOrigin,
            visitorType: visitorType,
            arrivalDate: arrivalDate,
            sponsorFirstName: sponsorFirstName,
            sponsorLastName: sponsorLastName,
            beneficiaryFirstName: beneficiaryFirstName,
            beneficiaryLastName: beneficiaryLastName,
            address: address,
            city: city,
            province: province,
            postalCode: postalCode,
            email: email,
            phone: phone,
            type: applicationType,
            state: "IN_PROGRESS"
        };
        this.$j("#quoteData").val(JSON.stringify(this.quoteDataToSave));
        quoteSaver.save(this.quoteDataToSave);
    };
    ApplicationFinishPage.prototype.onPersonsDataValid = function () {
        console.log("persons data is valid. Data is: ", this.personsData);
        //this.decorateQuoteIdWithCurrentDate();
        this.saveApplication();
        this.$j("#quoteDate").text(this.$j("#quoteData").val());
        this.onApplicationSaved();
        this.deletePersonsTempData();
    };
    ApplicationFinishPage.prototype.deletePersonsTempData = function () {
        DB.deletePersons(this.quoteId.getTempValue());
    };
    ApplicationFinishPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    ApplicationFinishPage.prototype.loadQuotePersonsData = function () {
        var _this = this;
        EventBus.addEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        //DB.loadPersons(this.quoteId.getTempValue());
        console.log("loading persons by app temp id " + this.quoteId.getTempValue());
        DB.loadPersons(this.quoteId.getTempValue());
    };
    ApplicationFinishPage.prototype.personsDataLoadComplete = function (data) {
        var _this = this;
        EventBus.removeEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        this.onPersonDataLoadComplete(data);
    };
    ApplicationFinishPage.prototype.onPersonDataLoadComplete = function (data) {
        console.log("persons data: ", data);
        var dataIsValid = this.validatePersonsLoadedData(data);
        if (dataIsValid) {
            this.personsData = data;
            this.onPersonsDataValid();
        }
        else {
            console.error("persons loaded data not valid. data: " + data);
        }
    };
    ApplicationFinishPage.prototype.validatePersonsLoadedData = function (data) {
        var decodedData = unescape(data);
        try {
            var dataJson = JSON.parse(decodedData);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    return ApplicationFinishPage;
}(BasePage));
//# sourceMappingURL=ApplicationFinishPage.js.map