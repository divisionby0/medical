var RatesTableView = function(){
    var dataProvider;
    var table;
    var $;
    var rowsCollection = new Map('rows');
    var idToRemove;

    function addListeners(){
        addItemsCollectionChangedListeners();
        addRemoveRowButtonListener();
    }

    function addItemsCollectionChangedListeners(){
        EventBus.addEventListener(ON_RATE_ADDED, onRateAddedHandler);
        EventBus.addEventListener(ON_RATE_REMOVED, onRateRemovedHandler);
    }
    function removeItemsCollectionChangedListeners(){
        EventBus.removeEventListener(ON_RATE_ADDED, onRateAddedHandler);
        EventBus.removeEventListener(ON_RATE_REMOVED, onRateRemovedHandler);
    }

    function onRateAddedHandler(eventData){
        addRate(eventData);
    }
    function onRateRemovedHandler(eventData){
        var rateId = eventData;
        removeRate(rateId);
    }

    function addRate(rateData){
        var id = rateData.id;
        var rowElement = createRowElement(rateData);
        addRowElementToTable(rowElement);
        addRowToCollection(id, rowElement);
        addRemoveRowButtonListener();
    }

    function addRowElementToTable(rowElement){
        rowElement.appendTo(table);
    }
    function addRowToCollection(id, rowElement){
        rowsCollection.add(id, rowElement);
    }
    function removeRowFromCollection(id){
        rowsCollection.remove(id);
    }

    function removeRate(id){
        var rowToRemove = rowsCollection.get(id);
        removeElement(rowToRemove);
        removeRowFromCollection(id);
    }

    function addRemoveRowButtonListener(){
        removeRemoveButtonListener();

        $('.removeRowButtonTableItemRenderer[collectiontype='+RATE+']').on('click', function(){
            idToRemove = $(this).attr('id');
            showRemoveRateConfirmationDialog();
        });
    }

    function removeRemoveButtonListener(){
        $('.removeRowButtonTableItemRenderer[collectiontype='+RATE+']').off('click');
    }

    function buildRemoveRateConfirmationDialogContent(){
        console.log("buildRemoveRateConfirmationDialogContent");
        console.log("idToRemove: "+idToRemove);
        var rate = dataProvider.get(idToRemove);

        var ageFrom = rate.get(AGE_FROM);
        var ageTill = rate.get(AGE_TILL);
        var mdr = rate.get(MEDICAL_DECLARATION_REQUIRED);
        var premiumTable = rate.get(PREMIUM_TABLE);
        var deductible = rate.get(DEDUCTIBLE);

        if(mdr == 0){
            mdr = 'No';
        }
        else{
            mdr = 'Yes';
        }

        return '<div>Really want to delete rate with data:<br/>age from:  '+ageFrom+'<br/>age till:  '+ageTill+'<br/>Medical declaration required: '+mdr+'<br/>premium table:  '+premiumTable+'<br/>deductible:  '+deductible+'</div>';
    }

    function showRemoveRateConfirmationDialog(){
        var dialogContent = buildRemoveRateConfirmationDialogContent();
        var dynamicDialog = $(dialogContent);

        dynamicDialog.dialog({ title: "Remove rate confirmation", modal: true, buttons: [
            { text: "Yes", click: function () {
                EventBus.dispatchEvent(REMOVE_RATE_REQUEST, idToRemove);
                $(this).dialog("close");
            } },
            { text: "No", click: function () {
                $(this).dialog("close");
            } }
        ]});
    }

    function removeElement(element){
        element.remove();
    }

    function createRowElement(rateData){
        var id = rateData.id;
        var ageFrom = rateData.ageFrom;
        var ageTill = rateData.ageTill;
        var sccOption = rateData.sccOption;
        var mdr = rateData.mdr;
        
        var premiumTable = rateData.premiumTable;
        var deductible = rateData.deductible;

        var formattedAgeRange = new AgeRangeFormatter().format(ageFrom, ageTill);

        if(mdr == 0){
            mdr = "No";
        }
        else{
            mdr = "Yes";
        }

        if(premiumTable == SCCC_MAP_ID){
            premiumTable = 'STABLE CHRONIC CONDITION';
        }
        else{
            premiumTable = 'STANDARD RATES';
        }

        if(sccOption == 1){
            sccOption = 'Yes';
        }
        else if(sccOption == 0){
            sccOption = 'No';
        }
        else if(sccOption == -1){
            sccOption = 'Not available';
        }

        return $('<tr id="'+id+'"><td class="fullwidth centered"><input data-type="rate" collectiontype="'+RATE+'" class="removeRowButtonTableItemRenderer" type="button" id="'+id+'" value="Remove"></td><td class="fullwidth centered">'+formattedAgeRange+'</td><td class="fullwidth centered">'+sccOption+'</td><td class="fullwidth centered">'+mdr+'</td><td class="fullwidth centered">'+premiumTable+'</td><td class="fullwidth centered">'+deductible+'</td></tr>');
    }

    function getTable(){
        table = $('#'+RATES_TABLE_ID);
    }

    function updateTable(){
        var keys = dataProvider.getKeys();

        for(var i=0; i<keys.length; i++){
            var rateMap = dataProvider.get(keys[i]);
            var rateData = {id:rateMap.getId(), ageFrom:rateMap.get(AGE_FROM), ageTill:rateMap.get(AGE_TILL), sccOption:rateMap.get(STABLE_CHRONIC_CONDITION_OPTION), mdr:rateMap.get(MEDICAL_DECLARATION_REQUIRED), premiumTable:rateMap.get(PREMIUM_TABLE), deductible:rateMap.get(DEDUCTIBLE)};
            addRate(rateData);
        }
    }
    
    function hideTable(){
        table.hide();
    }
    function showTable(){
        table.show();
    }

    return{
        init:function(_dataProvider){
            $ = jQuery.noConflict();
            dataProvider = _dataProvider;
            getTable();
            updateTable();
            addListeners();
        },
        hide:function(){
            hideTable();
        },
        show:function(){
            showTable();
        }
    }
};