var DeductibleAmountOptionsController = function(){

    var deductiblesCollection;
    var aggregatePolicyLimitsCollection;
    var view;
    var model;
    var tableModel;
    var tableView;

    var dataProvider;
    
    return{
        init:function(_deductiblesCollection, _aggregatePolicyLimitsCollection){

            createTableView();
            createTableModel();

            createListeners();
            
            deductiblesCollection = _deductiblesCollection;
            aggregatePolicyLimitsCollection = _aggregatePolicyLimitsCollection;
            createView();
            createModel();


        },
        updateDeductibles:function(_deductiblesCollection){
            deductiblesCollection = _deductiblesCollection;
            model.onDeductiblesChanged(deductiblesCollection);
        },
        updateAggregatePolicyLimits:function(_aggregatePolicyLimitsCollection){
            aggregatePolicyLimitsCollection = _aggregatePolicyLimitsCollection;
            model.onAggregatePolicyLimitsChanged(aggregatePolicyLimitsCollection);
        }
    }

    function createModel(){
        model = new DeductibleAmountOptionsModel();
        model.init(view);
    }
    function createView(){
        view = new DeductibleAmountOptionsView();
        view.init(deductiblesCollection, aggregatePolicyLimitsCollection);
    }

    function createTableView() {
        tableView = new DeductibleAmountOptionsTableView();
        tableView.init();
    }

    function createTableModel() {
        tableModel = new DeductibleAmountOptionsTableModel();
        tableModel.init(tableView);
    }

    function onDataHandler(eventData) {
        dataProvider = parseJsonData(eventData);
        
        if(!dataProvider){
            createNewCollection();
        }
        model.setData(dataProvider);
        tableModel.setData(dataProvider);
    }

    function parseJsonData(data){
        var jsonDecoder = new MapJsonDecoder(data);
        var parsedData;
        try{
            parsedData = jsonDecoder.decode();
        }
        catch(error){
            logError('Deductible amount options json parse error. Data was: '+ data+'  New collection created.');
            return;
        }
        return parsedData;
    }

    function parseDeductibleAmountOptionToMap(deductibleAmountOption){
        var map = new Map(deductibleAmountOption.getId());
        map.add(AGE_FROM, deductibleAmountOption.getAgeFrom());
        map.add(AGE_TILL, deductibleAmountOption.getAgeTill());
        map.add(AGGREGATE_POLICY_LIMIT, deductibleAmountOption.getAggregatePolicyLimit());
        map.add(SURCHARGE_OR_DISCOUNT, deductibleAmountOption.getSurchargeOrDiscount());
        map.add(DEDUCTIBLE, deductibleAmountOption.getDeductible());

        return map;
    }

    function logError(errorText){
        console.error(errorText);
    }

    function createNewDataProvider(){
        createNewCollection();
    }
    
    function createNewCollection(){
        dataProvider = new Map('deductibleAmountOptions');
    }

    function createListeners(){
        EventBus.addEventListener(NEW_DEDUCTIBLE_AMOUNT_OPTION_REQUEST, onNewOptionRequestHandler);
        EventBus.addEventListener(NEW_DEDUCTIBLE_AMOUNT_OPTION_CREATION, onNewOptionCreationHandler);
        EventBus.addEventListener(ON_DEDUCTIBLE_AMOUNT_OPTIONS_DATA, onDataHandler);
        EventBus.addEventListener(REMOVE_DEDUCTIBLE_AMOUNT_OPTION_REQUEST, onRemoveDeductibleAmountOptionRequestHandler);
    }

    function onRemoveDeductibleAmountOptionRequestHandler(eventData){
        var removedOption = model.removeOption(eventData);
        tableModel.onOptionRemoved(removedOption);
    }

    function onNewOptionRequestHandler(){
        var deductiblesSize = deductiblesCollection.length;
        var aggregatePolicyLimitsSize = aggregatePolicyLimitsCollection.length;
        model.onNewOptionRequest(deductiblesSize, aggregatePolicyLimitsSize);
    }

    function onNewOptionCreationHandler(eventData) {
        var optionAdded = model.onOptionAdded(eventData);

        if(optionAdded){
            var newOption = parseDeductibleAmountOptionToMap(eventData);
            tableModel.onOptionAdded(newOption);
        }
        else{
            console.log("option didn't add");
        }
    }
}
