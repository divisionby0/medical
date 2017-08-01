///<reference path="../question/Question.ts"/>
///<reference path="CollectionEventDispatcher.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="../utils/Sorter.ts"/>
///<reference path="../sort/SortChildren.ts"/>
///<reference path="SortableCollection.ts"/>
///<reference path="RemoveQuestion.ts"/>
///<reference path="../../../collections/Map.ts"/>
///<reference path="../answer/booleanAnswer/BooleanAnswer.ts"/>
class QuestionsCollection extends SortableCollection{
    protected collection:Map<Question> = new Map<Question>("questions");
    protected text:string;
    
    constructor(text:string){
        super(text);
        this.text = text;
    }

    public getType():string {
        return undefined;
    }

    public addQuestion(question:Question):void{
        var collectionSize:number = this.collection.size();

        this.collection.add(question.getId().toString(), question);

        var newIndex:number = collectionSize;
        question.setIndex(newIndex);
        
        this.onCollectionChanged();
    }

    public removeQuestion(id:number):void{
        var removeQuestion:RemoveQuestion = new RemoveQuestion(this.collection);
        var result:boolean = removeQuestion.execute(id);

        if(result){
            this.onCollectionChanged();
        }
    }
    
    public clear():void{
        this.collection.clear();
    }

    public removeAnswer(id:number):void{
        var questionsIterator:MapIterator = this.collection.getIterator();
        while(questionsIterator.hasNext()){
            var question:Question = questionsIterator.next();
            question.removeAnswer(id);
        }
    }
    
    getQuestion(text:string):Question{
        return this.collection.get(text);
    }

    getText():string{
        return this.text;
    }
    
    size():number{
        return this.collection.size();
    }
    hasChildren():boolean{
        return this.collection.size()>0;
    }
    
    getIterator():MapIterator{
        return this.collection.getIterator();
    }
    
    getEncoder():MapJsonEncoder{
        return this.collection.getEncoder();
    }

    // override ICompositeNode method
    getData():any{
        var data:any[] = new Array();
        var iterator:MapIterator = this.collection.getIterator();

        while(iterator.hasNext()){
            var question:Question = iterator.next();
            data.push(question.getData());
        }
        
        this.sortChildren(data);

        return data;
    }
}
