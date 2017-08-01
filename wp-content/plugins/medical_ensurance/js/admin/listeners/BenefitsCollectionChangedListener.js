var BenefitsCollectionChangedListener = function(){
    
    var collectionEmptyHandler;
    var collectionNotEmptyHandler;
    
    function createListener(event, _handler){
        EventBus.addEventListener(COLLECTION_ITEM_ADDED, onCollectionItemChanged);
        EventBus.addEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemChanged);
        EventBus.addEventListener(COLLECTION_CHANGED,onCollectionItemChanged);
    }
    
    function removeListener(){
        EventBus.removeEventListener(COLLECTION_ITEM_ADDED, onCollectionItemChanged);
        EventBus.removeEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemChanged);
        EventBus.removeEventListener(COLLECTION_CHANGED,onCollectionItemChanged);
    }

    function dispatchCollectionEmptyEvent(){
        collectionEmptyHandler.call(this);
    }
    function dispatchCollectionNotEmptyEvent(){
        collectionNotEmptyHandler.call(this);
    }

    function onCollectionItemChanged(eventData){
        var itemType = eventData.type;
        if(itemType == BENEFIT_AMOUNT){
            var collectionSize = eventData.total;
            if(collectionSize == 0){
                dispatchCollectionEmptyEvent();
            }
            else{
                dispatchCollectionNotEmptyEvent();
            }
        }
    }
    
    return{
        init:function(_collectionEmptyHandler, _collectionNotEmptyHandler){
            collectionEmptyHandler = _collectionEmptyHandler;
            collectionNotEmptyHandler = _collectionNotEmptyHandler;
            createListener();
            
        },
        destroy:function(){
            removeListener();
        }
    }
}
