///<reference path="../question/Question.ts"/>
///<reference path="RemoveCollectionItem.ts"/>
///<reference path="../../../collections/Map.ts"/>
///<reference path="../ICompositeNode.ts"/>
class RemoveQuestion extends RemoveCollectionItem{
    
    constructor(collection:Map<ICompositeNode>){
        super(collection);
    }

    protected traverseChildren(id:number):void{
        var questionsIterator:MapIterator = this.collection.getIterator();
        while(questionsIterator.hasNext()){
            var question:Question = questionsIterator.next();
            question.removeQuestion(id);
        }
    }
}
