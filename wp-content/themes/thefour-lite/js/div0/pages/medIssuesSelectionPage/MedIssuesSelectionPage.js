var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../BasePage.ts"/>
///<reference path="../QuoteId.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/db/DB.ts"/>
///<reference path="SaveApplication.ts"/>
var MedIssuesSelectionPage = (function (_super) {
    __extends(MedIssuesSelectionPage, _super);
    function MedIssuesSelectionPage() {
        _super.call(this);
        this.prevPage = "person-details";
        this.nextPage = "finish-application";
        console.log("MedIssuesSelectionPage");
    }
    MedIssuesSelectionPage.prototype.create = function () {
        /*
        this.persons = this.getPersons();
        this.companyData = this.getCompany();
        this.createQuoteId();
        this.loadQuotePersonsData();
        console.log("QuoteId: id=",this.quoteId.getId(),"tempValue:",this.quoteId.getTempValue());
        */
        this.finishButton = this.$j("#finishButton");
        this.prevButton = this.$j("#prevButton");
        this.payNowButton = this.$j(".wspsc_add_cart_submit");
        this.cartCheckoutButton = this.$j(".wspsc_add_cart_submit");
        console.log("pay now button: ", this.payNowButton);
        this.createButtonsListener();
        this.createRadioGroupListener();
        this.updateApplicationType("NORMAL");
        //this.decorateApplicationIdWithCurrentDate();
        //this.saveApplicationId();
        this.updateApplicationIdContainer();
    };
    MedIssuesSelectionPage.prototype.loadQuotePersonsData = function () {
        var _this = this;
        EventBus.addEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        DB.loadPersons(this.quoteId.getTempValue());
    };
    MedIssuesSelectionPage.prototype.personsDataLoadComplete = function (data) {
        var _this = this;
        EventBus.removeEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        this.onPersonDataLoadComplete(data);
    };
    MedIssuesSelectionPage.prototype.onPersonDataLoadComplete = function (data) {
        var dataIsValid = this.validatePersonsLoadedData(data);
        if (dataIsValid) {
            this.personsData = data;
            this.onPersonsDataValid();
        }
        else {
            console.error("persons loaded data not valid. data: " + data);
        }
    };
    MedIssuesSelectionPage.prototype.onPersonsDataValid = function () {
        console.log("persons data is valid. Data is: ", this.personsData);
        //this.$j("#quoteDate").text(this.$j("#quoteData").val());
        this.createPayNowButtonListener();
        this.createCartCheckoutButtonListener();
        //this.saveApplication();
        //this.onApplicationSaved();
        //this.deletePersonsTempData();
    };
    MedIssuesSelectionPage.prototype.saveApplication = function () {
        new SaveApplication(this.companyData, this.quoteId, this.personsData, this.persons);
    };
    MedIssuesSelectionPage.prototype.createRadioGroupListener = function () {
        var _this = this;
        this.$j('input[type=radio][name=medIssuesRadioGroup]').change(function (event) { return _this.onRadioGroupChanged(event); });
    };
    MedIssuesSelectionPage.prototype.onRadioGroupChanged = function (event) {
        this.selectedOption = parseInt(this.$j(event.target).val());
        this.onOptionChanged();
    };
    MedIssuesSelectionPage.prototype.onOptionChanged = function () {
        if (this.selectedOption == 0) {
            this.finishButton.hide();
            this.$j("#paypalButtonContainer").show();
            this.updateApplicationType("NORMAL");
        }
        else {
            this.finishButton.show();
            this.$j("#paypalButtonContainer").hide();
            this.finishButton.text("Finish");
            this.updateApplicationType("MEDICAL_ISSUES");
        }
    };
    MedIssuesSelectionPage.prototype.createButtonsListener = function () {
        var _this = this;
        this.finishButton.click(function () { return _this.onFinishButtonClick(); });
        this.prevButton.click(function () { return _this.onPrevButtonClick(); });
    };
    MedIssuesSelectionPage.prototype.onFinishButtonClick = function () {
        if (this.selectedOption == 1) {
            this.navigateToNextPage();
        }
    };
    MedIssuesSelectionPage.prototype.onPrevButtonClick = function () {
        this.navigateToPrevPage();
    };
    MedIssuesSelectionPage.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    MedIssuesSelectionPage.prototype.navigateToNextPage = function () {
        NavigatorUtil.navigateTo(this.nextPage);
    };
    MedIssuesSelectionPage.prototype.updateApplicationIdContainer = function () {
        this.$j("#applicationIdContainer").text(Cookie.getQuoteId());
    };
    MedIssuesSelectionPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    MedIssuesSelectionPage.prototype.updateApplicationType = function (type) {
        console.log("updateApplicationType " + type);
        Cookie.setApplicationType(type);
    };
    /*
    private createQuoteId():void{
        this.quoteId = new QuoteId();
    }
    */
    MedIssuesSelectionPage.prototype.validatePersonsLoadedData = function (data) {
        var decodedData = unescape(data);
        try {
            var dataJson = JSON.parse(decodedData);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    MedIssuesSelectionPage.prototype.createPayNowButtonListener = function () {
        var _this = this;
        this.payNowButton.click(function (event) { return _this.onPayNowButtonClicked(event); });
    };
    MedIssuesSelectionPage.prototype.onPayNowButtonClicked = function (event) {
        console.log("PAY NOW OR cart checkout BUTTON CLICKED");
        this.saveApplication();
        //return false;
        //event.stopPropagation();
        //return ReadForm(this, true);
    };
    MedIssuesSelectionPage.prototype.createCartCheckoutButtonListener = function () {
        console.log("createCartCheckoutButtonListener");
        this.cartCheckoutButton
            .unbind('click') // takes care of jQuery-bound click events
            .attr('onclick', '') // clears `onclick` attributes in the HTML
            .each(function () {
            this.onclick = null;
        });
        //this.cartCheckoutButton.click((event:any)=>this.onPayNowButtonClicked(event));
    };
    return MedIssuesSelectionPage;
}(BasePage));
//# sourceMappingURL=MedIssuesSelectionPage.js.map