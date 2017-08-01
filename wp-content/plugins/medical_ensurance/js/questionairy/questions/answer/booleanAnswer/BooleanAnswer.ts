///<reference path="../Answer.ts"/>
///<reference path="../variation/AnswerVariation.ts"/>
///<reference path="../../parsers/ObjectType.ts"/>
class BooleanAnswer extends Answer{
    protected type:string = ObjectType.BOOLEAN_ANSWER;
    constructor(){
        super("");

        this.createVariations();
        this.setValue("No");
    }
    
    private createVariations():void{
        var negativeAnswerVariation:AnswerVariation = new AnswerVariation("No");
        var positiveAnswerVariation:AnswerVariation = new AnswerVariation("Yes");

        negativeAnswerVariation.setRemovable(false);
        positiveAnswerVariation.setRemovable(false);

        negativeAnswerVariation.setIndex(0);
        positiveAnswerVariation.setIndex(1);

        this.variations.add("0", negativeAnswerVariation);
        this.variations.add("1", positiveAnswerVariation);
    }
    
    public getNegativeVariation():AnswerVariation{
        return this.variations.get("0");
    }
    public getPositiveVariation():AnswerVariation{
        return this.variations.get("1");
    }

    public addVariation(variation:AnswerVariation):void{
        //console.error("Cannot modify variations for boolean answer.");
    }

    public removeVariation(id:number):void{
        var variationsIterator:MapIterator = this.variations.getIterator();
        while(variationsIterator.hasNext()){
            var variation:AnswerVariation = variationsIterator.next();
            variation.removeAnswer(id);
            variation.removeQuestion(id);
        }
    }
}
