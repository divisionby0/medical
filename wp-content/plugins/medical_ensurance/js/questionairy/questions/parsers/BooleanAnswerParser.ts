///<reference path="../answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="SingleSelectionAnswerParser.ts"/>
class BooleanAnswerParser extends SingleSelectionAnswerParser{

    protected createAnswer():Answer{
        return new BooleanAnswer();
    }

    parse(answerData:any, questionViewType:string):Answer {
        var answer:Answer = super.parse(answerData, questionViewType);
        
        if(typeof answerData.value === "undefined"){
            answer.setValue("No");
        }
        else{
            answer.setValue(answerData.value);
        }

        return answer;
    }

    protected createVariationsStructure(answer:Answer, variationsStructure:any):void{
        var answerVariations:Map<AnswerVariation> = AnswerVariationsParser.parse(variationsStructure);

        var answerVariationsIterator:MapIterator = answerVariations.getIterator();
        var counter:number = 0;
        while(answerVariationsIterator.hasNext()){
            var answerVariation:AnswerVariation = answerVariationsIterator.next();
            answer.addVariation(answerVariation);

            answerVariation.setIndex(counter);
            
            counter++;
        }
    }
}
