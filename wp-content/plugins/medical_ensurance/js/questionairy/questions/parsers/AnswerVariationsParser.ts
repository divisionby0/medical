///<reference path="../answer/variation/AnswerVariation.ts"/>
///<reference path="MapParser.ts"/>
///<reference path="../../../collections/Map.ts"/>
class AnswerVariationsParser{
    public static parse(variationsData:any):Map<AnswerVariation>{
        
        var variations:Map<AnswerVariation> = new Map<AnswerVariation>('variations');
        var answerVariations:Map<any> = MapParser.parse(variationsData);

        var answerVariationsIterator:MapIterator = answerVariations.getIterator();
        while(answerVariationsIterator.hasNext()){
            var answerVariationData:any = answerVariationsIterator.next();
            var answerVariation:AnswerVariation = new AnswerVariation(answerVariationData.text);
            
            var index:number = answerVariationData.index;
            answerVariation.setTextShowAtResult(answerVariationData.showTextAtResult);

            variations.add(answerVariation.getText(), answerVariation);
            answerVariation.setIndex(index);
        }
        
        return variations;
    }
}
