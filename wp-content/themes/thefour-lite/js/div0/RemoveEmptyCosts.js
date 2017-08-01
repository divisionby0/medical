var RemoveEmptyCosts = function(){
    return{
        execute:function(companies){
            var companiesIterator = companies.getIterator();
            while(companiesIterator.hasNext()){
                var company = companiesIterator.next();
                var companyId = company.getId();
                var companyCosts = company.getDeductiblesCosts();
                if(companyCosts && companyCosts.size() == 0){
                    companyCosts = null;
                }
            }
        }
    }
}
