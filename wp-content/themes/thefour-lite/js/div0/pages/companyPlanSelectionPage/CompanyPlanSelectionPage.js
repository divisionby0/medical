///<reference path="../views/SelectionForm.ts"/>
///<reference path="CompanyPlanSelectionForm.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/collections/json/MapJsonDecoder.ts"/>
///<reference path="../../utils/NavigatorUtil.ts"/>
var CompanyPlanSelectionPage = (function () {
    function CompanyPlanSelectionPage() {
        this.prevPage = "companies-by-user-data";
        this.nextPage = "/application-creation";
        this.$j = jQuery.noConflict();
    }
    CompanyPlanSelectionPage.prototype.create = function () {
        var _this = this;
        var companyData = this.getCompany();
        var mapDecoder = new MapJsonDecoder(companyData.deductiblesCosts);
        this.companyCosts = mapDecoder.decode();
        this.createCostSelectionForm();
        this.prevButton = this.$j('#prevButton');
        this.prevButton.on("click", function () { return _this.prevButtonClickHandler(); });
        EventBus.addEventListener("COMPANY_PLAN_SELECTED", function (data) { return _this.companyPlanSelectedHandler(data); });
    };
    CompanyPlanSelectionPage.prototype.navigateToNextPage = function () {
        NavigatorUtil.navigateTo(this.nextPage);
    };
    CompanyPlanSelectionPage.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    CompanyPlanSelectionPage.prototype.prevButtonClickHandler = function () {
        this.navigateToPrevPage();
    };
    CompanyPlanSelectionPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    CompanyPlanSelectionPage.prototype.saveSelectedPlan = function (deductible, cost) {
        Cookie.setCompanyPlan(JSON.stringify({ deductible: deductible, cost: cost }));
    };
    CompanyPlanSelectionPage.prototype.createCostSelectionForm = function () {
        var savedPlanData = Cookie.getCompanyPlan();
        var parsedData = StringUtils.parseURI(savedPlanData);
        var savedPlan = parsedData;
        var savedDeductible = -1;
        if (savedPlan) {
            savedDeductible = savedPlan.deductible;
        }
        var costSelectionForm = new CompanyPlanSelectionForm(savedDeductible, "selectedPlanInput", "planSelectionForm", "planSelectionTable");
    };
    CompanyPlanSelectionPage.prototype.companyPlanSelectedHandler = function (data) {
        var deductible = data.deductible;
        var cost = this.companyCosts.get(deductible);
        this.saveSelectedPlan(deductible, cost);
        this.navigateToNextPage();
    };
    return CompanyPlanSelectionPage;
}());
//# sourceMappingURL=CompanyPlanSelectionPage.js.map