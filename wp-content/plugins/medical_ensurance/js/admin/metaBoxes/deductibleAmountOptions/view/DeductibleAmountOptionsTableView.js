// TODO управление диалогом не должно быть тут но нет времени переписать.
var DeductibleAmountOptionsTableView = function(){
    var table;
    var $ = jQuery.noConflict();
    var dataProvider;
    var rowElementsCollection = new Map('rows');
    var idToRemove;

    return{
        init:function(){
            getTableElement();
        },
        setData:function(data){
            dataProvider = data;
            update();
            createRemoveRowListener();
        },
        onItemAdded:function(option){
            var rowElement = createRowElement(option);
            addRowElement(rowElement);
            addRowElementToCollection(option.getId(), rowElement);
            createRemoveRowListener();
        },
        onItemRemoved:function(option){
            var optionId = option.getId();
            var rowElement = rowElementsCollection.get(optionId);
            rowElementsCollection.remove(optionId);
            removeRowElement(rowElement);
        }
    }

    function showRemoveConfirmationDialog() {
        var dialogContent = buildRemoveConfirmationDialogContent();
        var dynamicDialog = $(dialogContent);

        dynamicDialog.dialog({ title: "Remove deductible amount option confirmation", modal: true, width:400, buttons: [
            { text: "Yes", click: function () {
                //EventBus.dispatchEvent(DEDUCTIBLE_AMOUNT_OPTION_REQUEST, idToRemove);
                dispatchRemoveOptionRequest();
                $(this).dialog("close");
            } },
            { text: "No", click: function () {
                $(this).dialog("close");
            } }
        ]});
    }
    
    function dispatchRemoveOptionRequest(){
        EventBus.dispatchEvent(REMOVE_DEDUCTIBLE_AMOUNT_OPTION_REQUEST, idToRemove);
    }

    function buildRemoveConfirmationDialogContent(){
        var option = dataProvider.get(idToRemove);

        var ageFrom = option.get(AGE_FROM);
        var ageTill = option.get(AGE_TILL);
        var surchargeOrDiscount = option.get(SURCHARGE_OR_DISCOUNT);
        var aggregatePolicyLimit = option.get(AGGREGATE_POLICY_LIMIT);
        var deductible = option.get(DEDUCTIBLE);

        return '<div>Really want to delete DAO with data:<br/>age from:  '+ageFrom+'<br/>age till:  '+ageTill+'<br/>Surcharge or discount: '+surchargeOrDiscount+'<br/>Aggregate policy limit:  '+aggregatePolicyLimit+'<br/>deductible:  '+deductible+'</div>';
    }

    function createRemoveRowListener() {
        removeRemoveRowListener();
        $('.removeRowButtonTableItemRenderer[collectiontype='+DEDUCTIBLE_AMOUNT_OPTION+']').on('click', function(){
            idToRemove = $(this).attr('id');
            showRemoveConfirmationDialog();
        });
    }

    function removeRemoveRowListener() {
        $('.removeRowButtonTableItemRenderer[collectiontype='+DEDUCTIBLE_AMOUNT_OPTION+']').off('click');
    }
    
    function getTableElement() {
        table = $('#deductibleAmountOptionsTable');
    }

    function update(){
        var collectionIterator = dataProvider.getIterator();
        while(collectionIterator.hasNext()){
            var rowData = collectionIterator.next();
            var rowElement = createRowElement(rowData);
            addRowElement(rowElement);
            addRowElementToCollection(rowData.getId(), rowElement);
        }
    }

    function addRowElement(rowElement){
        rowElement.appendTo(table);
    }
    function removeRowElement(rowElement){
        rowElement.remove();
    }
    function addRowElementToCollection(rowId, rowElement){
        rowElementsCollection.add(rowId, rowElement);
    }

    function createRowElement(data){
        var id = data.getId();
        var ageFrom = data.get(AGE_FROM);
        var ageTill = data.get(AGE_TILL);

        var surchargeOrDiscount = data.get(SURCHARGE_OR_DISCOUNT);

        if(surchargeOrDiscount == 0){
            surchargeOrDiscount = 'Use Rate Table';
        }
        else{
            surchargeOrDiscount = surchargeOrDiscount+" %"
        }

        var aggregatePolicyLimit = data.get(AGGREGATE_POLICY_LIMIT);

        if(aggregatePolicyLimit==-1){
            aggregatePolicyLimit = 'any';
        }
        else{
            aggregatePolicyLimit = aggregatePolicyLimit+" $";
        }

        var deductible = data.get(DEDUCTIBLE);
        deductible = deductible+" $";

        var formattedAgeRange = new AgeRangeFormatter().format(ageFrom, ageTill);

        return $('<tr id="'+id+'"><td class="fullwidth centered"><input data-type="'+DEDUCTIBLE_AMOUNT_OPTION+'" collectiontype= "'+DEDUCTIBLE_AMOUNT_OPTION+'" class="removeRowButtonTableItemRenderer" type="button" id="'+id+'" value="Remove"></td><td class="fullwidth centered">'+deductible+'</td><td class="fullwidth centered">'+surchargeOrDiscount+'</td><td class="fullwidth centered">'+aggregatePolicyLimit+'</td><td class="fullwidth centered">'+formattedAgeRange+'</td></tr>');
    }
}
