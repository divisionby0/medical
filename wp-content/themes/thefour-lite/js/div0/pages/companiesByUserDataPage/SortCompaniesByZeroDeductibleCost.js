var SortCompaniesByZeroDeductibleCost = function(){

    function zeroDeductibleCompareAscendingFunction(companyObject1, companyObject2){
        return companyObject1.zeroDeductible - companyObject2.zeroDeductible;
        //return companyObject2.zeroDeductible - companyObject1.zeroDeductible;
    }
    function zeroDeductibleCompareDescendingFunction(companyObject1, companyObject2){
        return companyObject2.zeroDeductible - companyObject1.zeroDeductible;
    }

    function sortAscending(arr){
        arr.sort(zeroDeductibleCompareAscendingFunction);
    }
    function sortDescending(arr){
        arr.sort(zeroDeductibleCompareDescendingFunction);
    }

    return{
        sort:function(companies){
            var arr = new Array();

            var sortedCompanies = new List('companies');

            var companiesIterator = companies.getIterator();
            while(companiesIterator.hasNext()){
                var company = companiesIterator.next();
                var companyDeductiblesCosts = company.getDeductiblesCosts();

                if(companyDeductiblesCosts){
                    var companyTotalCosts = companyDeductiblesCosts.size();

                    if(companyTotalCosts!=0){
                        var companyZeroDeductible = companyDeductiblesCosts.get('0');
                        arr.push({zeroDeductible:parseFloat(companyZeroDeductible).toFixed(2), companyId:company.getId()});
                    }
                }
            }

            sortAscending(arr);
            //sortDescending(arr);

            for(var i=0; i<arr.length; i++){
                var companyObject = arr[i];
                var companyId = companyObject.companyId;
                var company = companies.get(companyId);
                sortedCompanies.add(company);
            }
            
            return sortedCompanies;
        }
    }
}
