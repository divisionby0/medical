///<reference path="../../../questions/collection/QuestionsCollection.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
class FormatCollection{
    private collection:any;
    
    constructor(collection:any){
        this.collection = collection;
    }
    
    format():Question[]{
        var items:Question[] = new Array();
        var iterator:MapIterator = this.collection.getIterator();
        while(iterator.hasNext()){
            var item:any = iterator.next();
            items.push(item);
        }
        return items;
    }
}
