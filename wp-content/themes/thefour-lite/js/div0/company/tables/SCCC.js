var SCCC = function(){
    var dataProvider;
    return{
        create:function(data){
            dataProvider = data;
        },
        getCost:function(benefit, age){
            var benefitRow = dataProvider.get(benefit.toString());
            if(benefitRow){
                return benefitRow.get(age.toString())/1000;
            }
            else{
                return -1;
            }
        }
    }
}
