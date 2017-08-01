///<reference path="CollectionEventType.ts"/>
///<reference path="../../../events/EventBus.ts"/>
class CollectionEventDispatcher{
    
    constructor(text:string){
    }
    protected onCollectionChanged():void{
        EventBus.dispatchEvent(CollectionEventType.COLLECTION_CHANGED,null);
    }
}
