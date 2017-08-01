var CompaniesByUserDataPage = function(){
    var parsedFormData;
    var selectedBenefit;
    var companiesTable;
    var companies;
    var persons;
    var selectedCompany;
    
    function onBuyOnlineButtonClickedHandler(data){
        
        var companyData = {companyName:data.name, companyId:data.id, medicalDeclarationRequired:data.medicalDeclarationRequired, benefit:selectedBenefit};
        selectedCompany = companies.get(data.id);

        if(selectedCompany){
            var companyDeductiblesCosts = selectedCompany.getDeductiblesCosts();
            companyData.deductiblesCosts = companyDeductiblesCosts.getEncoder().encode();
        }
        else{
            console.error("selected company not defined");
        }

        saveSelectedCompany(companyData);
        navigateToPlanSelectionPage();
    }

    function saveSelectedCompany(companyData){
        var convertedCompanyData = JSON.stringify(companyData);
        Cookie.setSelectedCompanyData(convertedCompanyData);
    }

    function navigateToPlanSelectionPage(){
        NavigatorUtil.navigateTo("plan-selection");
    }

    return{
        create:function(){

            EventBus.addEventListener(BUY_ONLINE_BUTTON_CLICKED, onBuyOnlineButtonClickedHandler);
            PageMarkupResponsability.remove();

            companiesTable = new CompaniesTable();
            companies = companiesTable.getData();

            var formDataGetter = new GetFormData();
            var formData = formDataGetter.init();

            var formDataParser = new FormDataParser();
            parsedFormData = formDataParser.parse(formData);

            selectedBenefit = parsedFormData.benefit;

            var createPersons = new CreatePersons();
            persons = createPersons.create(parsedFormData);

            var companiesCostsCalculator = new CompaniesCostsCalculator();
            companiesCostsCalculator.execute(persons, companies);

            var removeEmptyCosts = new RemoveEmptyCosts();
            removeEmptyCosts.execute(companies);

            var companiesSort = new SortCompaniesByZeroDeductibleCost();
            var sortedCompanies = companiesSort.sort(companies);

            var tableDataProviderCreator = new CreateTableDataProvider();
            var tableDataProvider = tableDataProviderCreator.execute(sortedCompanies);
            
            companiesTable.setData(tableDataProvider);

            var resultTableEmail = new ResultTableEmail();
            resultTableEmail.init();
        }
    }
}
