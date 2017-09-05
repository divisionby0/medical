///<reference path="../BasePage.ts"/>
///<reference path="../../utils/QuoteSaver.ts"/>
///<reference path="../cardDetailsPage/Card.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/db/DB.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
///<reference path="../sendResultEmailPage/SendResultEmailPage.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ApplicationFinishPage = (function (_super) {
    __extends(ApplicationFinishPage, _super);
    function ApplicationFinishPage() {
        _super.call(this);
        this.card = this.getCard();
    }
    ApplicationFinishPage.prototype.create = function () {
        this.persons = this.getPersons();
        this.companyData = this.getCompany();
        this.quoteId = Cookie.getQuoteId();
        this.loadQuotePersonsData();
    };
    ApplicationFinishPage.prototype.onApplicationSaved = function () {
        var resultEmailPage = new SendResultEmailPage(this.applicationType);
        resultEmailPage.create();
    };
    ApplicationFinishPage.prototype.saveApplication = function () {
        //console.log("saving application...");
        var quoteSaver = new QuoteSaver();
        var period = Cookie.getPeriod();
        var encodedPlanData = Cookie.getCompanyPlan();
        var planData = StringUtils.parseURI(encodedPlanData);
        var encodedFormData = Cookie.getUserInputFormData();
        var formData = StringUtils.parseURI(encodedFormData);
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
        this.applicationType = Cookie.getApplicationType();
        this.quoteDataToSave = {
            quoteId: this.quoteId,
            companyName: this.companyData.companyName,
            quoteData: quoteData,
            persons: this.personsData,
            period: period,
            numPersons: numPersons,
            startDate: startDate,
            finishDate: finishDate,
            cardType: this.card.getType(),
            cardHolderName: this.card.getHolderName(),
            cardExpDate: this.card.getExpDate(),
            cardNumber: this.card.getNumber(),
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
            type: this.applicationType
        };
        this.$j("#quoteData").val(JSON.stringify(this.quoteDataToSave));
        quoteSaver.save(this.quoteDataToSave);
    };
    ApplicationFinishPage.prototype.getCard = function () {
        var card = new Card();
        card.setExpDate(this.$j("#expirationDate").text());
        card.setHolderName(this.$j("#cardholderName").text());
        card.setNumber(this.$j("#cardNumber").text());
        card.setType(this.$j("#cardType").text());
        return card;
    };
    ApplicationFinishPage.prototype.decorateQuoteIdWithCurrentDate = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        this.quoteId = DateUtils.getCurrentDate() + "__" + hours + "-" + minutes + "-" + seconds;
    };
    ApplicationFinishPage.prototype.onPersonsDataValid = function () {
        this.decorateQuoteIdWithCurrentDate();
        this.saveApplication();
        this.$j("#quoteDate").text(this.$j("#quoteData").val());
        this.onApplicationSaved();
        this.deletePersonsTempData();
    };
    ApplicationFinishPage.prototype.deletePersonsTempData = function () {
        DB.deletePersons(this.quoteId);
    };
    ApplicationFinishPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    ApplicationFinishPage.prototype.loadQuotePersonsData = function () {
        var _this = this;
        EventBus.addEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        DB.loadPersons(this.quoteId);
    };
    ApplicationFinishPage.prototype.personsDataLoadComplete = function (data) {
        var _this = this;
        EventBus.removeEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        this.onPersonDataLoadComplete(data);
    };
    ApplicationFinishPage.prototype.onPersonDataLoadComplete = function (data) {
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