var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../BasePage.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="../PageMarkupResposabilityTS.ts"/>
var CompaniesByUserDataPageTS = (function (_super) {
    __extends(CompaniesByUserDataPageTS, _super);
    function CompaniesByUserDataPageTS() {
        _super.call(this);
        this.prevPage = "benefits-by-user-data-and-zero-deductible";
        this.period = Cookie.getPeriod();
    }
    CompaniesByUserDataPageTS.prototype.create = function () {
        var _this = this;
        EventBus.addEventListener("BUY_ONLINE_BUTTON_CLICKED", function (data) { return _this.onBuyOnlineButtonClickedHandler(data); });
        var pageMarlupResponsability = new PageMarkupResposabilityTS();
        pageMarlupResponsability.removeResponsabilityMarkup();
        this.companiesTable = new CompaniesTable();
        this.companies = this.companiesTable.getData();
        var formDataGetter = new GetFormData();
        var formData = formDataGetter.init();
        var formDataParser = new FormDataParser();
        this.parsedFormData = formDataParser.parse(formData);
        try {
            this.selectedBenefit = this.parsedFormData.benefit;
        }
        catch (error) {
            return;
        }
        //this.selectedBenefit = this.parsedFormData.benefit;
        this.persons = this.getPersons();
        var companiesCostsCalculator = new CompaniesCostsCalculator();
        companiesCostsCalculator.execute(this.persons, this.companies, this.selectedBenefit, this.period);
        var removeEmptyCosts = new RemoveEmptyCosts();
        removeEmptyCosts.execute(this.companies);
        var companiesSort = new SortCompaniesByZeroDeductibleCost();
        var sortedCompanies = companiesSort.sort(this.companies);
        var tableDataProviderCreator = new CreateTableDataProvider();
        var tableDataProvider = tableDataProviderCreator.execute(sortedCompanies);
        this.companiesTable.setData(tableDataProvider);
        var resultTableEmail = new ResultTableEmail();
        resultTableEmail.init();
        this.prevButton = this.$j('#prevButton');
        this.prevButton.on("click", function () { return _this.prevButtonClickHandler(); });
    };
    CompaniesByUserDataPageTS.prototype.prevButtonClickHandler = function () {
        this.navigateToPrevPage();
    };
    CompaniesByUserDataPageTS.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    CompaniesByUserDataPageTS.prototype.onBuyOnlineButtonClickedHandler = function (data) {
        var companyData = { companyName: data.name, companyId: data.id, medicalDeclarationRequired: data.medicalDeclarationRequired, benefit: this.selectedBenefit, deductiblesCosts: null };
        this.selectedCompany = this.companies.get(data.id);
        if (this.selectedCompany) {
            var companyDeductiblesCosts = this.selectedCompany.getDeductiblesCosts();
            companyData.deductiblesCosts = companyDeductiblesCosts.getEncoder().encode();
        }
        else {
            console.error("selected company not defined");
        }
        this.saveSelectedCompany(companyData);
        this.navigateToPlanSelectionPage();
    };
    CompaniesByUserDataPageTS.prototype.saveSelectedCompany = function (companyData) {
        var convertedCompanyData = JSON.stringify(companyData);
        Cookie.setSelectedCompanyData(convertedCompanyData);
    };
    CompaniesByUserDataPageTS.prototype.navigateToPlanSelectionPage = function () {
        NavigatorUtil.navigateTo("plan-selection");
    };
    return CompaniesByUserDataPageTS;
}(BasePage));
//# sourceMappingURL=CompaniesByUserDataPageTS.js.map