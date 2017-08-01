var FamilyRateDetector = (function(){
    return{
        detect:function(familyRateMaxAge, persons){
            var ages = persons.getAges();
            ages.sort();
            if(ages.length >= companyFamilyRateMinNumPersons){
                var oldest = ages[ages.length-1];
                if(oldest <= familyRateMaxAge){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
    }
})();
