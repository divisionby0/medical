var CompaniesCostsCalculator = function(){

    return{
        execute:function(persons, companies, selectedBenefit, period){
            var companiesIterator = companies.getIterator();
            while(companiesIterator.hasNext()){
                var company = companiesIterator.next();
                company.setSelectedBenefit(selectedBenefit);
                company.setPeriod(period);
                company.calculateCosts(persons);
            }
        }
    }
}