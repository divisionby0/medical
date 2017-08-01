///<reference path="MoveNode.ts"/>
class MoveNodeDown extends MoveNode{
    constructor(collection:QuestionsCollection){
        super(collection);
    }

    protected getNodeNewIndex(currentIndex:number):number{
        return currentIndex+1;
    }

    protected isIndexAvailable(index):boolean{
        return index < this.parentCollectionIterator.size();
    }
} 
