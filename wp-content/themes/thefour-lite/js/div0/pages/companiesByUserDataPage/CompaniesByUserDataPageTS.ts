///<reference path="../BasePage.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="../PageMarkupResposabilityTS.ts"/>
declare var CompaniesTable;
declare var GetFormData;
declare var FormDataParser;
declare var CompaniesCostsCalculator;
declare var RemoveEmptyCosts;
declare var SortCompaniesByZeroDeductibleCost;
declare var CreateTableDataProvider;
declare var ResultTableEmail;
class CompaniesByUserDataPageTS extends BasePage{

    private parsedFormData:any;
    private selectedBenefit:any;
    private companiesTable:any;
    private companies:any;
    private selectedCompany:any;
    private period:string;

    constructor(){
        super();
        this.period = Cookie.getPeriod();
    }
    
    create():void{
        EventBus.addEventListener("BUY_ONLINE_BUTTON_CLICKED", (data)=>this.onBuyOnlineButtonClickedHandler(data));

        var pageMarlupResponsability:PageMarkupResposabilityTS = new PageMarkupResposabilityTS();
        pageMarlupResponsability.removeResponsabilityMarkup();

        this.companiesTable = new CompaniesTable();
        this.companies = this.companiesTable.getData();

        var formDataGetter = new GetFormData();
        var formData = formDataGetter.init();

        var formDataParser = new FormDataParser();
        this.parsedFormData = formDataParser.parse(formData);

        try{
            this.selectedBenefit = this.parsedFormData.benefit;
        }
        catch(error){
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

    }

    private onBuyOnlineButtonClickedHandler(data){

        var companyData = {companyName:data.name, companyId:data.id, medicalDeclarationRequired:data.medicalDeclarationRequired, benefit:this.selectedBenefit, deductiblesCosts:null};
        this.selectedCompany = this.companies.get(data.id);

        if(this.selectedCompany){
            var companyDeductiblesCosts = this.selectedCompany.getDeductiblesCosts();
            companyData.deductiblesCosts = companyDeductiblesCosts.getEncoder().encode();
        }
        else{
            console.error("selected company not defined");
        }

        this.saveSelectedCompany(companyData);
        this.navigateToPlanSelectionPage();
    }

    private saveSelectedCompany(companyData){
        var convertedCompanyData = JSON.stringify(companyData);
        Cookie.setSelectedCompanyData(convertedCompanyData);
    }

    private navigateToPlanSelectionPage(){
        NavigatorUtil.navigateTo("plan-selection");
    }
}