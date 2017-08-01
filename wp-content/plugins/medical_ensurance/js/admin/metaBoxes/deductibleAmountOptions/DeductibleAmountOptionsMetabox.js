var DeductibleAmountOptionsMetabox = function(){
    var controller;
    
    return{
        init:function(deductibleCollection, benefitsCollection){
            createController(deductibleCollection, benefitsCollection);
        },
        updateDeductiblesCollection:function(deductiblesCollection){
            controller.updateDeductibles(deductiblesCollection);
        },
        updateAggregatePolicyLimitsCollection:function(aggregatePolicyLimitsCollection){
            controller.updateAggregatePolicyLimits(aggregatePolicyLimitsCollection);
        }
    }

    function createController(deductibleCollection, aggregatePolicyLimitsCollection){
        controller = new DeductibleAmountOptionsController();
        controller.init(deductibleCollection, aggregatePolicyLimitsCollection);
    }
};
