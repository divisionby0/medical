var DeductibleAmountOptions = function(){
    var dataProvider;

    function isAgeInsideRange(age, ageFrom, ageTill){
        if(parseInt(age) >= parseInt(ageFrom) && parseInt(age) <= parseInt(ageTill)){
            return true;
        }
        return false;
    }


    return{
        create:function(data){
            dataProvider = data;
        },
        getDeductibles:function(){
            var deductibles = new Array();
            var dataProviderIterator = dataProvider.getIterator();
            while(dataProviderIterator.hasNext()){
                var option = dataProviderIterator.next();
                deductibles.push(option.get('deductible'));
            }
            return deductibles;
        },
        getSurchargeOrDiscountProcent:function(deductible, benefit, age){
            var dataProviderIterator = dataProvider.getIterator();

            var procentsByDeductible = new List('procentsByDeductible');

            while(dataProviderIterator.hasNext()){
                var option = dataProviderIterator.next();
                
                var optionDeductible = option.get('deductible');
                var optionBenefit = option.get('aggregatePolicyLimit');
                var optionAgeFrom = option.get('ageFrom');
                var optionAgeTill= option.get('ageTill');

                var ageInsideOptionAgeRange = isAgeInsideRange(age, optionAgeFrom, optionAgeTill);
                //console.log("selected age "+age+" inside option age range "+ageInsideOptionAgeRange);

                if(ageInsideOptionAgeRange){
                    if(optionDeductible == deductible){
                        if(benefit == optionBenefit || optionBenefit=='any'){
                            var optionSurchargeOrDiscount = option.get('surchargeOrDiscount');
                            procentsByDeductible.add({deductible:optionDeductible, procent:optionSurchargeOrDiscount, benefit:optionBenefit});
                        }
                    }
                }
            }
            
            return procentsByDeductible;
        }
    }
}
