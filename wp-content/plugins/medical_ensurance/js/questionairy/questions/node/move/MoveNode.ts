///<reference path="../../collection/QuestionsCollection.ts"/>
class MoveNode{
    protected collection:QuestionsCollection;
    protected parentCollectionIterator:MapIterator;
    
    constructor(collection:QuestionsCollection){
        this.collection = collection;
    }
    
    move(data:any):void{
        var node:any = data.node;
        var nodeIndex:number = node.index;

        var currentNodePayload:ICompositeNode = node.object;
        var parent:ICompositeNode = data.parentNodePayload;

        if(!parent){
            console.error("Parent is undefined !");

            // root
            parent = this.collection;
        }

        this.parentCollectionIterator = parent.getIterator();

        var nodeNewIndex:number = this.getNodeNewIndex(nodeIndex);
        var indexIsAvailable:boolean = this.isIndexAvailable(nodeNewIndex);

        if(indexIsAvailable){
            var nodeToSwitch:ICompositeNode;

            while(this.parentCollectionIterator.hasNext()){
                var parentCollectionNode:ICompositeNode = this.parentCollectionIterator.next();

                if(parentCollectionNode.getIndex() == nodeNewIndex){
                    nodeToSwitch = parentCollectionNode;
                }
            }
            var nodeToSwitchIndex:number = nodeToSwitch.getIndex();

            nodeToSwitch.setIndex(nodeIndex);
            currentNodePayload.setIndex(nodeToSwitchIndex);
        }
    }

    protected getNodeNewIndex(currentIndex:number):number{
        return currentIndex-1;
    }
    
    protected isIndexAvailable(index):boolean{
        return false;
    }
}
