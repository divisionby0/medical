///<reference path="../question/Question.ts"/>
///<reference path="../../../collections/Map.ts"/>
///<reference path="../ICompositeNode.ts"/>
class RemoveCollectionItem{
    protected collection:Map<ICompositeNode>;

    constructor(collection:Map<ICompositeNode>){
        this.collection = collection;
    }

    public execute(id:number):boolean{
        var idExists:boolean = this.collection.has(id.toString());

        if(idExists){
            var questionToRemove:ICompositeNode = this.collection.get(id.toString());
            var questionIndex:number = questionToRemove.getIndex();
            this.updateIndexes(questionIndex);

            this.collection.remove(id.toString());
        }
        else{
            this.traverseChildren(id);
        }
        return idExists;
    }

    protected traverseChildren(id:number):void{
        
    }

    private updateIndexes(indexToRemove:number):void{
        var iterator:MapIterator = this.collection.getIterator();
        while(iterator.hasNext()){
            var question:ICompositeNode = iterator.next();
            var questionIndex:number = question.getIndex();
            if(questionIndex > indexToRemove){
                question.setIndex(questionIndex - 1);
            }
        }
    }
}
