///<reference path="IAnswerParser.ts"/>
///<reference path="AnswerVariationsParser.ts"/>
///<reference path="MapParser.ts"/>
///<reference path="QuestionParser.ts"/>
class SingleSelectionAnswerParser extends AnswerParser{
    
    parse(answerData:any, questionViewType:string):Answer {
        this.questionViewType = questionViewType;
        var answer:Answer = this.createAnswer();
        
        answer.setValue(answerData.value);

        var variationsStructure:any = answerData.variations;
        var variationsData:any = answerData.variations.items;
        this.createVariationsStructure(answer, variationsStructure);
        this.createVariations(answer, variationsData);

        var value:string = answer.getValue();

        this.updateSelection(value, answer);

        return answer;
    }
    
    protected createAnswer():Answer{
        return new SingleSelectionAnswer();
    }

    private updateSelection(value:string, answer:Answer):void{
        if(typeof value === "undefined"){
            var variationsIterator:MapIterator = answer.getIterator();
            if(variationsIterator.hasNext()){
                var firstItem:AnswerVariation = variationsIterator.next();
                var firstValue:string = firstItem.getText();
                answer.setValue(firstValue);
            }
        }
    }
}
