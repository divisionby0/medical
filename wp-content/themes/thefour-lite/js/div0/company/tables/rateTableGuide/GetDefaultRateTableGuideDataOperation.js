var GetDefaultRateTableGuideDataOperation = function(){
    
    var strategy;
    
    return{
        setStrategy:function(_strategy){
            strategy = _strategy;
        },
        execute:function(dataProvider, age, useSccc){
            return strategy.getDeductibleAndTable(dataProvider, age, useSccc);
        }
    }
}
