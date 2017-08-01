///<reference path="MoveNode.ts"/>
class MoveNodeUp extends MoveNode{
    
    constructor(collection:QuestionsCollection){
        super(collection);
    }

    protected getNodeNewIndex(currentIndex:number):number{
        return currentIndex-1;
    }

    protected isIndexAvailable(index):boolean{
        return index >- 1;
    }
}
