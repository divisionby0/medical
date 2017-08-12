var RemoveEmptyCosts = function(){
    
    return{
        execute:function(companies){
            var companiesIterator = companies.getIterator();
            while(companiesIterator.hasNext()){
                var company = companiesIterator.next();
                var companyId = company.getId();
                var companyCosts = company.getDeductiblesCosts();

                //console.log("Company "+company.getName());
               // console.log("costs: ",companyCosts);

                if(companyCosts && companyCosts.size() == 0){
                    //console.debug("Company "+company.getName()+" excluding");
                    companyCosts = null;
                }
            }
        }
    }
}
