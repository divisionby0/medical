///<reference path="../collection/QuestionsCollection.ts"/>
///<reference path="../../app/views/element/treeView/TreeViewEventType.ts"/>
///<reference path="../collection/CollectionEventType.ts"/>
///<reference path="move/MoveNode.ts"/>
///<reference path="move/MoveNodeUp.ts"/>
///<reference path="move/MoveNodeDown.ts"/>
class CollectionChangeOrderListener{
    
    private collection:QuestionsCollection;

    constructor(collection:QuestionsCollection){
        this.collection = collection;
        this.createListeners();
    }

    public updateCollection(collection:QuestionsCollection):void{
        this.collection = collection;
    }
    
    private createListeners():void {
        EventBus.addEventListener(TreeViewEventType.NODE_MOVE_UP_REQUEST, (data)=>this.onMoveUpNodeRequest(data));
        EventBus.addEventListener(TreeViewEventType.NODE_MOVE_DOWN_REQUEST, (data)=>this.onMoveDownNodeRequest(data));
    }

    private onMoveUpNodeRequest(data:any) {
        var moveNodeUp:MoveNodeUp = new MoveNodeUp(this.collection);
        moveNodeUp.move(data);
        this.onCollectionChanged();
    }

    private onMoveDownNodeRequest(data:any) {
        var moveNodeDown:MoveNodeDown = new MoveNodeDown(this.collection);
        moveNodeDown.move(data);
        this.onCollectionChanged();
    }

    private onCollectionChanged():void{
        EventBus.dispatchEvent(CollectionEventType.COLLECTION_CHANGED,null);
    }
}
