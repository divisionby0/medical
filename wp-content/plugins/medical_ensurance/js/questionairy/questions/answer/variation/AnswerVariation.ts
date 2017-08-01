///<reference path="../../collection/QuestionsCollection.ts"/>
///<reference path="../../sort/SortChildren.ts"/>
class AnswerVariation extends QuestionsCollection{
    
    private id:number;
    private type:string = ObjectType.ANSWER_VARIATION;
    private removable:boolean = true;
    private showTextAtResult:boolean;
    
    constructor(text:string){
        super(text);
        this.showTextAtResult = true;
        this.id = Math.round(Math.random()*100000);
    }

    public setTextShowAtResult(value:boolean):void{
        this.showTextAtResult = value;
    }
    public getTextShowAtResult():boolean{
        return this.showTextAtResult;
    }

    public setRemovable(removable:boolean):void{
        this.removable = removable;
    }

    public getId():number{
        return this.id;
    }

    // override
    public setText(text:string):void{
        this.text = text;
        this.onCollectionChanged();
    }
    public getText():string{
        return this.text;
    }
    public getType():string{
        return this.type;
    }
    
    // override
    public getData():any{
        var data:any = {id:this.id, index:this.index, text:this.text, type:this.type, nodes:[], object:this, showTextAtResult:this.showTextAtResult};
        var iterator:MapIterator = this.collection.getIterator();
        while(iterator.hasNext()){
            var question:Question = iterator.next();
            data.nodes.push(question.getData());
        }

        this.sortChildren(data.nodes);

        return data;
    }
}
