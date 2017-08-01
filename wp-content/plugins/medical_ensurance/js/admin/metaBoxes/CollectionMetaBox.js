var CollectionMetaBox = function(){
    var addItemButton;
    var removeItemButton;
    var itemsSelect;
    var itemsDataInput;

    var itemsJsonData;
    var $;
    var itemsCollection;
    var selectedItem;
    var selectedItem;

    var addItemButtonId;
    var removeItemButtonId;
    var selectId;
    var jsonDataInputId;
    var collectionId;
    var type;

    function getAddItemButton(){
        addItemButton = $('#'+addItemButtonId);
    }

    function getRemoveItemButton(){
        removeItemButton = $('#'+removeItemButtonId);
    }
    function getItemsSelect(){
        itemsSelect = $('#'+selectId);
    }
    function addSelectListener(){
        itemsSelect.change(function(){
            var itemId = $(this).val();
            selectedItem = itemsCollection.get(itemId);
        });
    }
    function getItemsDataInput(){
        itemsDataInput = $('#'+jsonDataInputId);
    }

    function getItemsJsonData(){
        itemsJsonData = itemsDataInput.val();
    }

    function parseJsonData(){
        var jsonDecoder = new MapJsonDecoder(itemsJsonData);
        try{
            itemsCollection = jsonDecoder.decode();
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
        var collectionSize = itemsCollection.size();
        if(collectionSize==0){
            clearInput();
            createNewCollection();
            updateInput();
            hideRemoveButton();
        }
    }

    function clearSelect(){
        itemsSelect.find('option').remove();
    }

    function updateSelect(){
        clearSelect();
        var collectionIterator = itemsCollection.getIterator();
        while(collectionIterator.hasNext()){
            var collectionItem = collectionIterator.next();
            addItemToSelect(collectionItem);
        }
    }

    function setSelectedValue(selectedValue){
        itemsSelect.val(selectedValue);
    }

    function createNewCollection(){
        itemsCollection = new Map(collectionId);
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
        removeItemButton.click(function(){
            createRemoveItemDialog();
        });
    }

    function createAddItemDialog(){
        var newItem = prompt("Please enter new "+type+" for company", "0");



        if (newItem != null) {
            onNewItem(newItem);
        }
    }

    function createRemoveItemDialog(){
        var removeConfirmation = confirm("Remove "+selectedItem+" "+type+" ?");
        if (removeConfirmation) {
            onRemoveItem();
        }
    }

    function onRemoveItem(){
        itemsCollection.remove(selectedItem);
        EventBus.dispatchEvent(COLLECTION_ITEM_REMOVED,{type:type, item:selectedItem, total:itemsCollection.size()});

        updateInput();
        updateSelect();
        if(itemsCollection.size()>0){
            selectFirstItem();
        }
        else{
            hideRemoveButton();
        }
    }

    function onNewItem(item){
        var isOnlyNumbers = isOnlyNumbersCheck(item);
        if(!isOnlyNumbers){
            alert('Only numbers require');
            return;
        }
        try{
            itemsCollection.add(item, item);
        }
        catch(error){
            alert(error);
            return;
        }

        EventBus.dispatchEvent(COLLECTION_ITEM_ADDED,{type:type, item:item, total:itemsCollection.size()});

        showRemoveButton();

        updateInput();
        addItemToSelect(item);
        setSelectedValue(item);
        selectedItem = item;
    }

    function isOnlyNumbersCheck(data){
        var reg = /^\d+$/;
        return reg.test(data);
    }

    function updateInput(){
        var collectionJsonEncoder = itemsCollection.getEncoder();
        itemsDataInput.val(collectionJsonEncoder.encode());
    }

    function addItemToSelect(item){
        $('<option value="'+item+'">'+item+'</option>').appendTo(itemsSelect);
    }

    function selectFirstItem(){
        if(itemsCollection.size()>0){
            var keys = itemsCollection.getKeys();

            var firstKey = keys[0];
            selectedItem = itemsCollection.get(firstKey);
        }
        updateSelect();
        setSelectedValue(selectedItem);
    }
    function showRemoveButton(){
        removeItemButton.show();
    }
    function hideRemoveButton(){
        removeItemButton.hide();
    }
    
    function dispatchCollectionChanged(){
        EventBus.dispatchEvent(COLLECTION_CHANGED,{type:type,total:itemsCollection.size()});
    }

    return{
        init:function(_type, _addItemButtonId, _removeItemButtonId, _selectId, _jsonDataInputId, _collectionId){
            $ = jQuery;

            type = _type;
            addItemButtonId = _addItemButtonId;
            removeItemButtonId = _removeItemButtonId;
            selectId = _selectId;
            jsonDataInputId = _jsonDataInputId;
            collectionId = _collectionId;

            getAddItemButton();
            createAddItemButtonListener();

            getRemoveItemButton();
            createRemoveItemButtonListener();

            getItemsDataInput();

            getItemsSelect();
            addSelectListener();

            getItemsJsonData();
            parseJsonData();
            checkCollection();
            updateSelect();
            dispatchCollectionChanged();
            selectFirstItem();
        },
        getValues:function(){
            return itemsCollection.getKeys();
        }
    }
};
