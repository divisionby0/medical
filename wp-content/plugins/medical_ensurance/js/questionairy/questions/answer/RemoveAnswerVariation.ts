///<reference path="variation/AnswerVariation.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="../collection/RemoveCollectionItem.ts"/>
///<reference path="../../../collections/Map.ts"/>
class RemoveAnswerVariation extends RemoveCollectionItem{
    
    constructor(collection:Map<ICompositeNode>){
        super(collection);
    }

    protected traverseChildren(id:number):void{
        var iterator:MapIterator = this.collection.getIterator();
        while(iterator.hasNext()){
            var variation:AnswerVariation = iterator.next();
            variation.removeAnswer(id);
        }
    }
}
