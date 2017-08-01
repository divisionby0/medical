// TODO Хлам! Полнейшее отсутствие ООП и MVC. НО работает. Желательно нормально переписать.
// TODO В сети добавление лагает. Во время добавления опции выскакивает ошибка дубликации. Причем, дубликации точно не было. Это связано с ошибками в events, которые я недавно редактировал.
var RatesMetaBox = function(){
    var $;
    var addItemButton;
    var itemsDataInput;

    var itemsJsonData;
    var dataProvider;

    var addItemButtonId;
    var jsonDataInputId;
    var collectionId;
    var type;

    var newRateDialog;
    var deductibles;
    var tableView;

    var collectionChangedListener;

    function createCollectionListener(){
        collectionChangedListener = new BenefitsCollectionChangedListener();
        collectionChangedListener.init(onBenefitsCollectionEmpty, onBenefitsCollectionNotEmpty);
    }

    function onBenefitsCollectionEmpty(){
        console.log("RatesMetabox onBenefitsCollectionEmpty");
    }
    function onBenefitsCollectionNotEmpty(){
        console.log("RatesMetabox onBenefitsCollectionNotEmpty");
    }

    function getAddItemButton(){
        addItemButton = $('#'+addItemButtonId);
    }

    function getItemsDataInput(){
        itemsDataInput = $('#'+jsonDataInputId);
    }

    function getItemsJsonData(){
        itemsJsonData = itemsDataInput.val();
    }

    function parseJsonData(){
        var jsonDecoder = new MapJsonDecoder(itemsJsonData);

        console.log("parsing rates "+itemsJsonData);
        try{
            dataProvider = jsonDecoder.decode();
        }
        catch(error){
            onJsonParseError(error);
            return;
        }
    }

    function onJsonParseError(error){
        console.error(error);
        clearInput();
        createNewCollection();
        updateInput();
    }

    function checkCollection(){

        var collectionSizeValid = isCollectionSizeValid();

        if(!collectionSizeValid){
            clearInput();
            createNewCollection();
            updateInput();
        }
    }

    function isCollectionSizeValid(){
        var collectionSize = dataProvider.size();
        if(collectionSize==0){
            return false;
        }
        else{
            return true;
        }
    }

    function createNewCollection(){
        dataProvider = new Map(collectionId);
    }

    function clearInput(){
        itemsDataInput.val('');
    }

    function createAddItemButtonListener(){
        addItemButton.click(function(){
            createAddItemDialog();
        });
    }

    function createRemoveItemButtonListener(){
        EventBus.addEventListener(REMOVE_RATE_REQUEST, onRemoveRateRequest);
    }

    function onNewRate(rateData){
        
        var rateId = 'ageFrom:'+rateData.ageFrom+";ageTill:"+rateData.ageTill+";sccOption:"+rateData.sccOption+";mdr:"+rateData.mdr+";premiumTable:"+rateData.premiumTable+";deductible:"+rateData.deductible;
        rateData.id = rateId;

        var dataValid = new AgeRangeValidator().validate(rateData.ageFrom, rateData.ageTill);

        if(!dataValid){
            alert('Rate validation error. AgesSelection incorrect.');
            return;
        }

        var newRate = createRate(rateId, rateData);
        var rateAdded = addRateToCollection(newRate);

        if(rateAdded){
            updateInput();
            dispatchRateAdded(rateData);
        }
        else{
            console.error("Rate not added");
        }
    }

    function createRate(rateId, rateData){
        var newRate = new Map(rateId);
        newRate.add(AGE_FROM, rateData.ageFrom);
        newRate.add(AGE_TILL, rateData.ageTill);
        newRate.add(STABLE_CHRONIC_CONDITION_OPTION, rateData.sccOption);
        newRate.add(MEDICAL_DECLARATION_REQUIRED, rateData.mdr);
        newRate.add(PREMIUM_TABLE, rateData.premiumTable);
        newRate.add(DEDUCTIBLE, rateData.deductible);
        return newRate;
    }
    function addRateToCollection(rate){
        var rateId = rate.getId();

        try{
            dataProvider.add(rateId, rate);
            return true;
        }
        catch(error){
            alert(error);
            return false;
        }
    }

    function dispatchRateAdded(rateData){
       EventBus.dispatchEvent(ON_RATE_ADDED, rateData);

    }
    function dispatchRateRemoved(rateId){
        EventBus.dispatchEvent(ON_RATE_REMOVED, rateId);
    }

    function addNewRateDialogListener(){
        $('#'+NEW_RATE_DIALOG_OK_BUTTON).on('click',function(){
            var ageFrom = $('#'+RATE_AGE_FROM_SELECT_ID).val();
            var ageTill = $('#'+RATE_AGE_TILL_SELECT_ID).val();
            var sccOption = $('#'+SCCO_SELECT_ID).val();
            var medicalDeclarationRequired = $('#'+MEDICAL_DECLARATION_REQUIRED_SELECT_ID).val();
            var premiumTable = $('#'+PREMIUM_TABLE_SELECT_ID).val();
            var normalDeductible = $('#'+RATE_NORMAL_DEDUCTIBLE_AMOUNT_SELECT_ID).val();

            onNewRate({ageFrom:ageFrom, ageTill:ageTill, sccOption:sccOption, mdr:medicalDeclarationRequired, premiumTable:premiumTable, deductible:normalDeductible});
            closeNewRateDialog();
        });

        $('#'+NEW_RATE_DIALOG_CANCEL_BUTTON).on('click', function(){
            closeNewRateDialog();
        });
    }

    function removeNewRateDialogListener(){
        $('#'+NEW_RATE_DIALOG_OK_BUTTON).off('click');
        $('#'+NEW_RATE_DIALOG_CANCEL_BUTTON).off('click');
    }

    function closeNewRateDialog(){
        removeNewRateDialogListener();
        $('#'+NEW_RATE_DIALOG_CONTENT).dialog("close");
    }

    function createAddItemDialog(){
        newRateDialog = $('#'+NEW_RATE_DIALOG_CONTENT).dialog({modal:true, width:400});
        addNewRateDialogListener();
    }

    function onRemoveRateRequest(eventData){
        var rateId = eventData;
        removeItem(rateId);
    }

    function removeItem(rateId){
        dataProvider.remove(rateId);
        updateInput();
        dispatchRateRemoved(rateId);
    }

    function updateInput(){
        var collectionJsonEncoder = dataProvider.getEncoder();
        itemsDataInput.val(collectionJsonEncoder.encode());
    }

    function updateNormalDeductibleAmountSelect(){
        for(var i=0;i< deductibles.length;i++){
            $('<option value="'+deductibles[i]+'">'+deductibles[i]+'</option>').appendTo('#'+RATE_NORMAL_DEDUCTIBLE_AMOUNT_SELECT_ID);
        }
    }

    function addDeductibleCollectionChangedListener(){
        EventBus.addEventListener(COLLECTION_ITEM_ADDED, onCollectionItemAdded);
        EventBus.addEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemRemoved);
    }

    function onCollectionItemAdded(eventData){
        var itemType = eventData.type;
        if(itemType == DEDUCTIBLE){
            var deductible = eventData.item;
            onDeductibleAdded(deductible);
        }
    }

    function onCollectionItemRemoved(eventData){
        var itemType = eventData.type;
        if(itemType == DEDUCTIBLE){
            var deductible = eventData.item;
            onDeductibleRemoved(deductible);
        }
    }

    function onDeductibleAdded(deductible){
        $('<option value="'+deductible+'">'+deductible+'</option>').appendTo('#'+RATE_NORMAL_DEDUCTIBLE_AMOUNT_SELECT_ID);
    }

    function onDeductibleRemoved(deductible){
        $('#'+RATE_NORMAL_DEDUCTIBLE_AMOUNT_SELECT_ID+" option[value="+deductible+"]").remove();
    }

    function createTableView(){
        tableView = new RatesTableView();
        tableView.init(dataProvider);
    }

    return{
        init:function(_type, _addItemButtonId, _removeItemButtonId, _selectId, _jsonDataInputId, _collectionId, _deductibles){
            $ = jQuery;

            type = _type;
            addItemButtonId = _addItemButtonId;
            jsonDataInputId = _jsonDataInputId;
            collectionId = _collectionId;
            deductibles = _deductibles;

            createCollectionListener();

            getAddItemButton();
            getItemsDataInput();
            getItemsJsonData();
            parseJsonData();
            checkCollection();

            updateNormalDeductibleAmountSelect();
            addDeductibleCollectionChangedListener();

            createTableView();
            createAddItemButtonListener();
            createRemoveItemButtonListener();
        }
    }
};
