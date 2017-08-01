var AgeRangeValidator = function(){
    return{
        validate:function(ageFrom, ageTill){
            var fromGreaterThenTill = parseInt(ageFrom) > parseInt(ageTill);
            var fromEqualsTill = parseInt(ageFrom) == parseInt(ageTill);

            if(fromGreaterThenTill || fromEqualsTill){
                return false;
            }
            else{
                return true;
            }
        }
    }
};
