///<reference path="variation/AnswerVariation.ts"/>
///<reference path="../parsers/ObjectType.ts"/>
///<reference path="../ICompositeNode.ts"/>
///<reference path="../utils/Sorter.ts"/>
///<reference path="RemoveAnswerVariation.ts"/>
///<reference path="../../../collections/Map.ts"/>
class Answer extends SortableCollection{
    
    protected variations:Map<AnswerVariation> = new Map<AnswerVariation>("variations");
    protected type:string = ObjectType.ANSWER;
    
    protected text:string;
    protected value:string;
    
    constructor(text:string){
        super(text);
        this.text = text;
    }

    // override ICompositeNode method
    public getData():any{
        var data:any[] = new Array();
        var variationsIterator:MapIterator = this.variations.getIterator();
        while(variationsIterator.hasNext()){
            var variation:AnswerVariation = variationsIterator.next();
            data.push(variation.getData());
        }
        
        this.sortChildren(data);
        
        return data;
    }

    //TODO remove
    public getVariationsIterator():MapIterator{
        return this.variations.getIterator();
    }
    public getIterator():MapIterator {
        return this.variations.getIterator();
    }

    public getText():string{
        return this.text;
    }

    public addVariation(variation:AnswerVariation):any{
        var collectionSize:number = this.variations.size();
        
        this.variations.add(variation.getId().toString(), variation);

        var newIndex:number = collectionSize;
        variation.setIndex(newIndex);
        
        console.log("Answer addVariation id="+variation.getId());
        this.onCollectionChanged();
        return variation;
    }
    
    removeVariation(id:number):void{
        var removeAnswerVariation:RemoveAnswerVariation = new RemoveAnswerVariation(this.variations);
        var result:boolean = removeAnswerVariation.execute(id);

        if(result){
            this.onCollectionChanged();
        }
    }
    
    public removeQuestion(id:number):void{
        var iterator:MapIterator = this.variations.getIterator();
        while(iterator.hasNext()){
            var variation:AnswerVariation = iterator.next();
            variation.removeQuestion(id);
        }
    }
    
    public getVariation(id:string):any{
        return this.variations.get(id);
    }
    
    public getType():string{
        return this.type;
    }

    public getValue():string {
        return this.value;
    }

    public setValue(value:string) {
        this.value = value;
    }
}
