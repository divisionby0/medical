var FamilyRateDetector = (function(){
    
    return{
        detect:function(familyRateMaxAge, persons){

            var ages = persons.getAges();

            ages.sort();

            //console.log("FamilyRateDetector.detect familyRateMaxAge=",familyRateMaxAge,"  ages=",ages," companyFamilyRateMinNumPersons=",companyFamilyRateMinNumPersons);

            if(ages.length >= companyFamilyRateMinNumPersons){



                var oldest = ages[ages.length-1];

                //console.log("oldest "+oldest);

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
