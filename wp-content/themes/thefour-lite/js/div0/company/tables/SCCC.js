var SCCC = function(){

    var dataProvider;
    
    return{
        create:function(data){
            dataProvider = data;
        },
        getCost:function(benefit, age){
            //console.log("SCCC get cost for benefit "+benefit);
            var benefitRow = dataProvider.get(benefit.toString());

            //console.log("benefitRow");
            //console.log(benefitRow);

            if(benefitRow){
                return benefitRow.get(age.toString())/1000;
            }
            else{
                return -1;
            }
        }
    }
}
