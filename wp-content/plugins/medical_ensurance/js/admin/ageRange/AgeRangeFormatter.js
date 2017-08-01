var AgeRangeFormatter = function(){

    return{
        format:function(_ageFrom, _ageTill){

            var ageFrom = parseInt(_ageFrom);
            var ageTill = parseInt(_ageTill);
            var min = parseInt(MIN_AGE);
            var max = parseInt(MAX_AGE);

            if(ageFrom === min && ageTill > min){
                return 'Under '+ageTill;
            }
            else if(ageFrom > min && ageTill === max){
                return ageFrom + ' and over';
            }
            else{

                return ageFrom+" to "+ageTill;
            }
        },
        getRangeFromString:function(ageRangeString){
            
        }
    }
};
