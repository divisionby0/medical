var CreateDeductibleAmountOptionDialog = function(){
    var element;
    var $ = jQuery.noConflict();
    
    var deductiblesSelect;
    var aggregatePolicyLimitSelect;

    var surchargeOrDiscountInput;
    var okButton;
    var cancelButton;

    var ageFromSelect;
    var ageTillSelect;

    return{
        init:function(deductiblesCollection, aggregatePolicyLimitsCollection){
            getOkButton();
            getCancelButton();

            addButtonsListener();

            getAgeFromSelect();
            getAgeTillSelect();

            getSurchargeOrDiscountInput();
            addSurchargeOrDiscountInputListener();

            getDeductiblesSelect();
            updateDeductiblesSelect(deductiblesCollection);

            getAggregatePolicyLimitsSelect();
            updateAggregatePolicyLimitsSelect(aggregatePolicyLimitsCollection);

            createDialog();
            hideDialog();
        },
        show:function(){
            showDialog();
        },
        hide:function(){
            hideDialog();
        },
        deductiblesChanged:function(deductiblesCollection){
            clearDeductiblesSelect();
            updateDeductiblesSelect(deductiblesCollection);
        },
        aggregatePolicyChanged:function(aggregatePolicyLimitsCollection){
            clearAggregatePolicyLimitsSelect();
            updateAggregatePolicyLimitsSelect(aggregatePolicyLimitsCollection);
        }
    }

    function createDialog() {
        element = $('#'+NEW_DEDUCTIBLE_AMOUNT_OPTION_DIALOG_CONTENT).dialog({modal:true, width:400});
    }

    function getAgeTillSelect() {
        ageTillSelect = $('#deductibleAmountOptionAgeTillSelect');
    }

    function getAgeFromSelect() {
        ageFromSelect = $('#deductibleAmountOptionAgeFromSelect');
    }

    function getOkButton() {
        okButton = $('#addDeductibleAmountOptionConfirmButton');
    }
    function getCancelButton() {
        cancelButton = $('#cancelDeductibleAmountOptionConfirmationButton');
    }
    function addButtonsListener() {
        okButton.click(function(){
            onOkButtonClick();
        });
        cancelButton.click(function(){
            hideDialog();
        });
    }

    function onOkButtonClick(){
        var optionId = buildNewOptionId();

        var ageFrom = ageFromSelect.val();
        var ageTill = ageTillSelect.val();

        var dataValid = new AgeRangeValidator().validate(ageFrom, ageTill);

        if(!dataValid){
            alert('AgesSelection incorrect.');
            return;
        }

        var surchOrDiscount = surchargeOrDiscountInput.val();
        var apl = aggregatePolicyLimitSelect.val();
        var deductible = deductiblesSelect.val();

        //var newOptionData = {id:optionId, ageFrom:ageFrom, ageTill:ageFrom,surchargeOrDiscount:surchOrDiscount, apl:apl,deductible:deductible};
        var newOption = new DeductibleAmountOption();
        newOption.construct(optionId, ageFrom, ageTill, surchOrDiscount, apl, deductible);
        dispatchOnNewOptionCreation(newOption);
        hideDialog();
    }

    function dispatchOnNewOptionCreation(newOptionData) {
        EventBus.dispatchEvent(NEW_DEDUCTIBLE_AMOUNT_OPTION_CREATION, newOptionData);
    }
    
    
    function buildNewOptionId(){
        return 'ageFrom:'+ageFromSelect.val()+";ageTill:"+ageTillSelect.val()+";surchOrDisc:"+surchargeOrDiscountInput.val()+";apl:"+aggregatePolicyLimitSelect.val()+";deductible:"+deductiblesSelect.val();
    }

    function getSurchargeOrDiscountInput(){
        surchargeOrDiscountInput = $('#surchargeOrDiscountInput');
    }

    function addSurchargeOrDiscountInputListener(){
        surchargeOrDiscountInput.on('keypress', function(event, renderer){
            return TextInputUtils.isOnlyNumbersWithDot(event);
        });
        surchargeOrDiscountInput.on('keyup', function(event, renderer){
            var newValue = parseFloat($(this).val());
            if(newValue < -100){
                newValue = -100;
                $(this).val(newValue);
            }
            else if(newValue > 100){
                newValue = 100;
                $(this).val(newValue);
            }
        });
    }

    function getDeductiblesSelect(){
        deductiblesSelect = $('#deductibleAmountOptionSelect');
    }
    function updateDeductiblesSelect(deductiblesCollection){
        for(var i=0; i<deductiblesCollection.length; i++){
            var deductible = deductiblesCollection[i];
            $('<option value="'+deductible+'">'+deductible+'</option>').appendTo(deductiblesSelect);
        }
    }
    function clearDeductiblesSelect(){
        deductiblesSelect.find('option').remove();
    }

    function getAggregatePolicyLimitsSelect(){
        aggregatePolicyLimitSelect = $('#aggregatePolicyLimitSelect');
    }

    function updateAggregatePolicyLimitsSelect(aggregatePolicyLimitsCollection){

        $('<option value="any">any</option>').appendTo(aggregatePolicyLimitSelect);

        for(var i=0; i<aggregatePolicyLimitsCollection.length; i++){
            var aggregatePolicyLimit = aggregatePolicyLimitsCollection[i];
            $('<option value="'+aggregatePolicyLimit+'">'+aggregatePolicyLimit+'</option>').appendTo(aggregatePolicyLimitSelect);
        }
    }
    function clearAggregatePolicyLimitsSelect(){
        aggregatePolicyLimitSelect.find('option').remove();
    }
    
    function hideDialog(){
        element.dialog("close");
    }
    function showDialog(){
        element.dialog("open");
    }
}