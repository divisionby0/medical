///<reference path="../answer/Answer.ts"/>
///<reference path="../answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../answer/singleSelectionAnswer/SingleSelectionAnswer.ts"/>
///<reference path="AnswerVariationsParser.ts"/>
///<reference path="MapParser.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="../answer/AnswerFactory.ts"/>
///<reference path="ObjectType.ts"/>
///<reference path="IAnswerParser.ts"/>
///<reference path="../question/view/IQuestionView.ts"/>
class AnswerParser implements IAnswerParser{

    protected questionViewType:string;
    
    parse(answerData:any, questionViewType:string):Answer {
        this.questionViewType = questionViewType;
        
        return;
    }

    protected createVariationsStructure(answer:Answer, variationsStructure:any):void{
        var answerVariations:Map<AnswerVariation> = AnswerVariationsParser.parse(variationsStructure);

        var answerVariationsIterator:MapIterator = answerVariations.getIterator();
        while(answerVariationsIterator.hasNext()){
            var answerVariation:AnswerVariation = answerVariationsIterator.next();
            var variationIndex:number = answerVariation.getIndex();
            answer.addVariation(answerVariation);

            answerVariation.setIndex(variationIndex);
        }
    }

    protected createVariations(answer:Answer, variationsData:any):void{
        for (var key in variationsData) {

            var value:any = variationsData[key];
            if(value){
                var answerVariationByKey:AnswerVariation = answer.getVariation(key);
                var variationSubQuestionCollection:Map<any> = this.getSubQuestionCollection(value.collection);
                var variationHasSubQuestions:boolean = variationSubQuestionCollection.size()>0;

                if(variationHasSubQuestions){
                    this.createVariationChildren(variationSubQuestionCollection, answerVariationByKey);
                }
            }
        }
    }

    protected getSubQuestionCollection(data:any):Map<any>{
        return MapParser.parse(data);
    }

    protected createVariationChildren(variationSubQuestionCollection:Map<any>, variation:AnswerVariation):void{
        if(variation){
            var subQuestionsIterator:MapIterator = variationSubQuestionCollection.getIterator();
            while(subQuestionsIterator.hasNext()){
                var questionData:any = subQuestionsIterator.next();

                var questionIndex:number = questionData.index;

                var question:Question = QuestionParser.parse(questionData, this.questionViewType);
                variation.addQuestion(question);
                question.setIndex(questionIndex);
            }
        }
    }
}
