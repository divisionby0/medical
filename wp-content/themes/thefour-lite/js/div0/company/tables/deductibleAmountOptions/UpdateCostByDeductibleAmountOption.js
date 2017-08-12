var UpdateCostByDeductibleAmountOption = function(){

    var table;

    function updateCompanyCostsByBenefitAndAge(collection, baseCost){

        var keys = collection.getKeys();

        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            var procent = collection.get(key);
            var updatedCost = baseCost + baseCost/100*procent;
            collection.update(key, updatedCost);
        }

        return collection;
    }


    return{
        setTable:function(_table){
            table = _table;
        },
        update:function(benefit, age, baseCost){
            var result = new Map('costs');
            var deductibles = table.getDeductibles();

            var companyCostsByBenefitAndAge = new Map('companyCostsByBenefitAndAge');
            
            for(var i=0;i<deductibles.length; i++) {
                var deductible = deductibles[i];

                //console.log("deductible "+deductible+"  age = "+age);

                var optionsList = table.getSurchargeOrDiscountProcent(deductible, benefit, age);
                //console.log("Options: ");
                //console.log(optionsList);

                var listIterator = optionsList.getIterator();

                while (listIterator.hasNext()) {
                    var option = listIterator.next();

                    var optionDeductible = option.deductible;
                    var optionProcent = option.procent;
                    var optionBenefit = option.benefit;

                    if (optionBenefit == benefit || optionBenefit == 'any') {
                        //console.log("For deductible " + deductible + "  procent is:" + optionProcent);
                        try{
                            companyCostsByBenefitAndAge.add(optionDeductible, optionProcent);
                        }
                        catch(error){
                        }
                    }
                }
            }



            companyCostsByBenefitAndAge = updateCompanyCostsByBenefitAndAge(companyCostsByBenefitAndAge, baseCost);
            return companyCostsByBenefitAndAge;
        }
    }
}
