var DeductibleAmountOptionsModel = function(){
    var view;
    var options;
    var dataProvider;

    return{
        init:function(_view){
            view = _view;
            view.getData();
        },
        onNewOptionRequest:function(deductiblesSize, aggregatePolicyLimitsSize){
            if(deductiblesSize == 0 || aggregatePolicyLimitsSize == 0){
                view.onEmptyDeductiblesOrAggregatePolicyLimits();
            }
            else{
                view.showNewOptionDataInput();
            }
        },
        onDeductiblesChanged:function(deductiblesCollection){
            view.updateDeductibles(deductiblesCollection);
        },
        onAggregatePolicyLimitsChanged:function(aggregatePolicyLimitsCollection){
            view.updateAggregatePolicyLimits(aggregatePolicyLimitsCollection);
        },
        onOptionAdded:function(optionData){
            return onNewOption(optionData);
        },
        removeOption:function(optionId){
            var option = removeOption(optionId);
            return option;
        },
        setData:function(collection){
            dataProvider = collection;
            updateViewData();
        }
    }

    function removeOption(optionId) {
        var option = dataProvider.get(optionId);
        dataProvider.remove(optionId);
        updateViewData();
        
        return option;
    }

    function onNewOption(optionData){
        var optionId = optionData.getId();
        var option = createOption(optionId, optionData);

        var optionExists = dataProvider.has(optionId);
        if(!optionExists){
            dataProvider.add(optionId, option);
            updateViewData();
            return true;
        }
        else{
            alert("Deductible amount option already exists.");
            return false;
        }
    }

    function createOption(id, optionData){
        var option = new Map(id);
        option.add(AGE_FROM, optionData.getAgeFrom());
        option.add(AGE_TILL, optionData.getAgeTill());
        option.add(SURCHARGE_OR_DISCOUNT, optionData.getSurchargeOrDiscount());
        option.add(AGGREGATE_POLICY_LIMIT, optionData.getAggregatePolicyLimit());
        option.add(DEDUCTIBLE, optionData.getDeductible());
        return option;
    }
    
    function updateViewData(){
        var dataProviderJson = buildDataProviderJson();
        view.setData(dataProviderJson);
    }

    function createNewCollection(){
        dataProvider = new Map('deductibleAmountOptions');
    }

    function buildDataProviderJson(){
        var collectionJsonEncoder = dataProvider.getEncoder();
        return collectionJsonEncoder.encode();
    }
};