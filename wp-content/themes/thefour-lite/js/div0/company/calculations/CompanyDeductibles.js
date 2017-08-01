var CompanyDeductibles = function(){

    var deductibles;
    var costs = new Map('deductiblesCosts');
    
    function createEmptyCosts(){
        var deductiblesKeys = deductibles.getKeys();
        for(var i=0; i < deductiblesKeys.length; i++){
            var deductible = deductiblesKeys[i];
            costs.add(deductible, NaN);
        }
    }

    function increaseCostByDeductible(deductible, cost){
        if(costs.has(deductible)){
            var deductibleCurrentCost = costs.get(deductible);

            if(isNaN(deductibleCurrentCost)){
                deductibleCurrentCost = 0;
            }
            var sum = deductibleCurrentCost + cost;
            costs.update(deductible, sum);
        }
    }
    
    return{
        setCollection:function(collection){
            deductibles = collection;
            createEmptyCosts();
            console.log("");
        },
        getCollection:function(){
            return deductibles;
        },
        getCosts:function(){
            return costs;
        },
        excludeUnavailableCosts:function(){
            var tempCollection = new Map('deductiblesCosts');

            var keys = costs.getKeys();
            for(var i=0; i<keys.length; i++){
                var deductible = keys[i];
                var deductibleCost = costs.get(deductible);
                if(!isNaN(deductibleCost) && deductibleCost > 0){
                    tempCollection.add(deductible, deductibleCost);
                }
            }
            costs = tempCollection;
        },
        updateCosts:function(costs){
            if(costs){
                var costDeductibles = costs.getKeys();
                for(var i = 0; i < costDeductibles.length; i++){
                    var deductible = costDeductibles[i];
                    var deductibleCost = costs.get(deductible);

                    increaseCostByDeductible(deductible, deductibleCost);
                }
            }
        }
    }
}