var CreateTableDataProvider = function(){
    return{
        execute:function(companies){
            var tableDataProvider = new List('tableDataProvider');
            var companiesIterator = companies.getIterator();
            
            while(companiesIterator.hasNext()){
                var company = companiesIterator.next();
                var companyDeductiblesCosts = company.getDeductiblesCosts();
                
                var companyCostsExists = companyDeductiblesCosts!=null;

                if(companyCostsExists){
                    var companyTotalCosts = companyDeductiblesCosts.size();
                    if(companyTotalCosts!=0){
                        tableDataProvider.add(company);
                    }
                }
            }

            return tableDataProvider;
        }
    }
}
