var TableController = function(){
    var $;
    var dataProviderJsonContainerId;
    var dataProviderJsonContainer;
    var dataProviderJson;
    var dataProvider;
    var tableContainerId;
    var tableContainer;
    var clearTableButton;
    var tableId = "tableId";
    var context;
    var tableRowMaxLength = 100;

    function getDataProviderJson(){
        dataProviderJsonContainer = $('#'+dataProviderJsonContainerId);
        dataProviderJson = dataProviderJsonContainer.val();
    }

    function createTableRendererListener(){
        var tableRendererListener = new TableRendererListener();
        tableRendererListener.init(tableContainer, context);
    }

    function onTableValueChanged(rowId, columnKey, newValue){
        var dataProviderRow = dataProvider.get(rowId);
        dataProviderRow.update(columnKey, Math.round(parseFloat(newValue)*1000));
        dataProviderJson = MapUtils.getMapJson(dataProvider);
        updateDataProviderJsonContainer(dataProviderJson);
    }

    function updateDataProviderJsonContainer(data){
        dataProviderJsonContainer.val(data);
    }

    function clear(){
        MapUtils.setAllValuesToZero(dataProvider);
        dataProviderJson = MapUtils.getMapJson(dataProvider);
        updateDataProviderJsonContainer(dataProviderJson);
        updateTable();
        createTableRendererListener();
    }

    function updateTable(){
        tableContainer.html('');
        var tableHTML = TableFactory.createTable(context, tableId, dataProvider);
        tableContainer.html(tableHTML);
    }

    function createEmptyMap(){
        dataProvider = CreateEmptyTableDataProvider.create(context);
    }

    function updateTableContainerHTML(html){
        tableContainer.html(html);
    }
    function createTableHTML(context, tableId, dataProvider){
        return TableFactory.createTable(context, tableId, dataProvider);
    }

    function onCollectionItemAdded(eventData){

        var itemType = eventData.type;

        console.log("onCollectionItemAdded itemType="+itemType);

        if(itemType==BENEFIT_AMOUNT){
            var benefitAmount = eventData.item;
            var newRow = new Map(benefitAmount);

            if(context == SCCC_TABLE){
                fillMapWithZeroValues(newRow, 0, tableRowMaxLength);
            }
            else if(context == STANDARD_RATES_TABLE){
                //fillMapWithZeroValues(newRow, 60, tableRowMaxLength);
                fillMapWithZeroValues(newRow, 0, tableRowMaxLength);
            }
            dataProvider.add(benefitAmount, newRow);
            onDataProviderChanged();
        }
    }

    function onCollectionItemRemoved(eventData){
        var itemType = eventData.type;
        if(itemType==BENEFIT_AMOUNT){
            var benefitAmount = eventData.item;
            dataProvider.remove(benefitAmount);
            onDataProviderChanged();
        }
    }

    function onDataProviderChanged(){
        dataProviderJson = MapUtils.getMapJson(dataProvider);
        updateDataProviderJsonContainer(dataProviderJson);

        var tableHTML = createTableHTML(context, tableId, dataProvider);
        updateTableContainerHTML(tableHTML);
        createTableRendererListener();
    }

    function onNewTableRowAdded(){
        EventBus.dispatchEvent(NEW_TABLE_ROW_ADDED);
    }

    function fillMapWithZeroValues(map, startIndex, rowMaxLength){
        console.log("fillMapWithZeroValues");
        for(var i=startIndex; i<rowMaxLength; i++){
            map.add(i, 0);
        }
    }

    function addCollectionListeners(){
        EventBus.addEventListener(COLLECTION_ITEM_ADDED, onCollectionItemAdded);
        EventBus.addEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemRemoved);
    }

    return{
        init:function(_context, _tableId, _dpJsonContainerId, _tableContainerId){
            $ = jQuery;
            context = _context;
            tableId = _tableId;
            dataProviderJsonContainerId = _dpJsonContainerId;
            tableContainerId = _tableContainerId;
            tableContainer =  $('#'+tableContainerId);

            getDataProviderJson();
            addCollectionListeners();

            if(dataProviderJson){
                dataProvider = MapUtils.createMapFromJson(dataProviderJson);
            }
            else{
                createEmptyMap();
                dataProviderJson = MapUtils.getMapJson(dataProvider);
                updateDataProviderJsonContainer(dataProviderJson);
            }

            var tableHTML = createTableHTML(context, tableId, dataProvider);

            updateTableContainerHTML(tableHTML);
            createTableRendererListener();
        },
        valueChanged:function(rowId, columnKey, newValue){
            onTableValueChanged(rowId, columnKey, newValue);
        },
        clear:function(){
            clear();
        }
    }
};
