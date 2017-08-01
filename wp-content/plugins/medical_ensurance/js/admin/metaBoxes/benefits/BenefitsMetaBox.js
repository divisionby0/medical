var BenefitsMetaBox = function(){
    var addBenefitButton;
    var removeBenefitButton;
    var benefitsSelect;
    var benefitsDataInput;

    var benefitsData;
    var $;
    var benefitsCollection;
    var selectedBenefit;

    function getAddBenefitButton(){
        addBenefitButton = $('#addBenefitButton');
    }

    function getRemoveBenefitButton(){
        removeBenefitButton = $('#removeBenefitButton');
    }
    function getBenefitsSelect(){
        benefitsSelect = $('#benefitsSelect');
    }
    function addSelectListener(){
        benefitsSelect.change(function(){
            var benefitId = $(this).val();
            selectedBenefit = benefitsCollection.get(benefitId);
        });
    }
    function getBenefitsDataInput(){
        benefitsDataInput = $('#benefitsEditorInput');
    }

    function getBenefitsData(){
        benefitsData = benefitsDataInput.val();
    }

    function parseBenefitsData(){
        console.log("parse benefits data "+benefitsData);
        var jsonDecoder = new MapJsonDecoder(benefitsData);
        try{
            benefitsCollection = jsonDecoder.decode();
        }
        catch(error){
            console.error(error);
            clearInput();
            createNewCollection();
            updateInput();
            return;
        }
    }

    function checkCollection(){
        console.log('checkCollection');
        var collectionSize = benefitsCollection.size();
        console.log('size: '+collectionSize);
        if(collectionSize==0){
            clearInput();
            createNewCollection();
            updateInput();
            hideRemoveButton();
        }
    }

    function clearSelect(){
        benefitsSelect.find('option').remove();
    }

    function updateSelect(){
        clearSelect();
        var benefitsCollectionIterator = benefitsCollection.getIterator();
        while(benefitsCollectionIterator.hasNext()){
            var benefit = benefitsCollectionIterator.next();
            addBenefitToSelect(benefit);
        }
    }

    function setBenefitSelectedValue(selectedValue){
        benefitsSelect.val(selectedValue);
    }

    function createNewCollection(){
        benefitsCollection = new Map('benefits');
    }

    function clearInput(){
        benefitsDataInput.val('');
    }

    function createAddBenefitButtonListener(){
        console.log("createAddBenefitButtonListener");
        addBenefitButton.click(function(){
            console.log("addBenefitButton.click");
            createAddBenefitDialog();
        });
    }

    function createRemoveBenefitButtonListener(){
        removeBenefitButton.click(function(){
            createRemoveBenefitDialog();
        });
    }

    function createAddBenefitDialog(){
        console.log('createAddBenefitDialog');
        var benefitAmount = prompt("Please enter new benefit amount for company", "0");

        if (benefitAmount != null) {
            console.log("adding benefit...");
            onNewBenefitAmount(benefitAmount);
        }
    }

    function createRemoveBenefitDialog(){
        var removeConfirmation = confirm("Remove "+selectedBenefit+" benefit amount ?");
        if (removeConfirmation) {
            onRemoveBenefit();
        }
    }

    function onRemoveBenefit(){
        benefitsCollection.remove(selectedBenefit);
        updateInput();
        updateSelect();
        if(benefitsCollection.size()>0){
            selectFirstBenefit();
        }
        else{
            hideRemoveButton();
        }
    }

    function onNewBenefitAmount(benefitAmount){
        var isOnlyNumbers = isOnlyNumbersCheck(benefitAmount);
        if(!isOnlyNumbers){
            alert('Only numbers require');
            return;
        }
        try{
            benefitsCollection.add(benefitAmount, benefitAmount);
        }
        catch(error){
            console.error('Benefits adding error. '+error);
            alert(error);

            return;
        }

        //selectFirstBenefit();
        showRemoveButton();

        updateInput();
        addBenefitToSelect(benefitAmount);
        setBenefitSelectedValue(benefitAmount);
        selectedBenefit = benefitAmount;
    }

    function isOnlyNumbersCheck(data){
        var reg = /^\d+$/;
        return reg.test(data);
    }

    function updateInput(){
        var collectionJsonEncoder = benefitsCollection.getEncoder();
        benefitsDataInput.val(collectionJsonEncoder.encode());
    }

    function addBenefitToSelect(benefitAmount){
        $('<option value="'+benefitAmount+'">'+benefitAmount+'</option>').appendTo(benefitsSelect);
    }

    function selectFirstBenefit(){
        if(benefitsCollection.size()>0){
            var keys = benefitsCollection.getKeys();

            var firstKey = keys[0];
            selectedBenefit = benefitsCollection.get(firstKey);
        }
        updateSelect();
        setBenefitSelectedValue(selectedBenefit);
    }
    function showRemoveButton(){
        removeBenefitButton.show();
    }
    function hideRemoveButton(){
        removeBenefitButton.hide();
    }

    return{
        init:function(){
            $ = jQuery;
            getAddBenefitButton();

            createAddBenefitButtonListener();

            getRemoveBenefitButton();
            createRemoveBenefitButtonListener();

            getBenefitsDataInput();

            getBenefitsSelect();
            addSelectListener();

            getBenefitsData();
            parseBenefitsData();
            checkCollection();
            updateSelect();
            selectFirstBenefit();
        }
    }
};
