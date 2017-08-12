//TODO вообще непонятно почему называется Over 
var AgeOverDefaultStrategy = function(){

    function isAgeInsideRange(rateTableGuideItem, age){


        var ageFrom = parseInt(rateTableGuideItem.get('ageFrom'));
        var ageTill = parseInt(rateTableGuideItem.get('ageTill'));

        var ageInsideAgeRange = false;

        if(age >= ageFrom && age <= ageTill){
            ageInsideAgeRange = true;
        }
        if(ageInsideAgeRange){
            return true;
        }
        else{
            return false;
        }
    }

    return{
        getDeductibleAndTable:function(dataProvider, age, useSccc){
            var defaultDeductible = -1;
            var defaultTable = 'notAvailble';

            var dataIterator = dataProvider.getIterator();
            while(dataIterator.hasNext()){

                var rateTableGuideItem = dataIterator.next();

                var ageInsideRange = isAgeInsideRange(rateTableGuideItem, age);

                if(ageInsideRange){
                    defaultDeductible = rateTableGuideItem.get('deductible');
                    defaultTable = rateTableGuideItem.get('premiumTable');

                    var itemSccc =  rateTableGuideItem.get('scco');

                    if(itemSccc == useSccc || itemSccc == -1){
                        return {deductible: defaultDeductible, table: defaultTable};
                        break;
                    }
                }
            }
        },
        getMedicalDeclarationRequired:function(dataProvider, age, useSccc){
            var dataIterator = dataProvider.getIterator();
            while(dataIterator.hasNext()){

                var rateTableGuideItem = dataIterator.next();

                var ageInsideRange = isAgeInsideRange(rateTableGuideItem, age);

                if(ageInsideRange){
                     var itemSccc =  rateTableGuideItem.get('scco');

                     if(itemSccc == useSccc || itemSccc == -1){
                         var medicalDeclarationRequired = rateTableGuideItem.get("mdr");
                         return medicalDeclarationRequired == 1;
                     }
                }
            }
        }
    }
}