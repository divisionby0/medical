
var DeductibleAmountOptionsView = function(){
    var addNewOptionButton;
    var newOptionDialog;
    var deductiblesCollection;
    var aggregatePolicyLimitsCollection;
    var dataInput;
    var $ = jQuery.noConflict();

    return{
        init:function(_deductiblesCollection, _aggregatePolicyLimitsCollection){
            getDataInput();
            
            deductiblesCollection = _deductiblesCollection;
            aggregatePolicyLimitsCollection = _aggregatePolicyLimitsCollection;

            createAddNewOptionDataInputDialog();
            createAddNewOptionButton();
        },
        updateDeductibles:function(deductiblesCollection){
            newOptionDialog.deductiblesChanged(deductiblesCollection);
        },
        updateAggregatePolicyLimits:function(aggregatePolicyLimitsCollection){
            newOptionDialog.aggregatePolicyChanged(aggregatePolicyLimitsCollection);
        },
        onEmptyDeductiblesOrAggregatePolicyLimits:function(){
            showError('Benefits or AggregatePolicyLimits empty.');
        },
        showNewOptionDataInput:function(){
            newOptionDialog.show();
        },
        getData:function(){
            sendData();
        },
        setData:function(data){
            dataInput.val(data);
        }
    }

    function showError(errorText) {
        alert(errorText);
    }

    function sendData() {
        EventBus.dispatchEvent(ON_DEDUCTIBLE_AMOUNT_OPTIONS_DATA, dataInput.val());
    }
    
    function getDataInput() {
        dataInput = $('#deductibleAmountOptionsTableEditor');
    }
    
    function createAddNewOptionButton(){
        addNewOptionButton = new AddNewDeductibleAmountOptionButton();
        addNewOptionButton.init();
    }

    function createAddNewOptionDataInputDialog(){
        newOptionDialog = new CreateDeductibleAmountOptionDialog();
        newOptionDialog.init(deductiblesCollection, aggregatePolicyLimitsCollection);
    }
}
