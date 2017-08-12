var BenefitsKeysSorter = function(){

    function compareFunction(a,b){
        return a - b;
    }
    
    return{
        sort:function(keys){
            var i;

            var keysInt = new Array();

            for(i=0; i<keys.length; i++){
                keysInt.push(parseInt(keys[i]));
            }

            keysInt.sort(compareFunction);
            
            return keysInt;
        }
    }
}
