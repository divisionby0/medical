///<reference path="IAnswerParser.ts"/>
///<reference path="../answer/singleSelectionAnswer/SingleSelectionAnswer.ts"/>
///<reference path="AnswerVariationsParser.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="MapParser.ts"/>
///<reference path="../question/view/QuestionViewFactory.ts"/>
class MultipleSelectionAnswerParser extends AnswerParser{
    parse(answerData:any, questionViewType:string):Answer {

        var children:any;
        var questionView:IQuestionView;
        
        if(questionViewType!=""){
            questionView = QuestionViewFactory.getView(questionViewType);
        }
        
        if(answerData.children){
            children = answerData.children.collection.items;
        }
        else{
            children = answerData.collection.collection.items;
        }

        var booleanAnswerParser:BooleanAnswerParser = new BooleanAnswerParser();

        var answer:MultipleSelectionAnswer = new MultipleSelectionAnswer();

        for(var key in children){
            var child:any = children[key];
            var childAnswerVariationText:string = child.text;

            // это всегда boolean
            var childBooleanAnswerData:any = child.answer;

            var childAnswerVariationValue:string = childBooleanAnswerData.value;

            var childAnswerVariation:AnswerVariation = new AnswerVariation(childAnswerVariationText);

            var childBooleanAnswer:Answer = booleanAnswerParser.parse(childBooleanAnswerData, questionViewType);

            var childNegativeVariation:AnswerVariation = childBooleanAnswer.getVariation("0");
            var childPositiveVariation:AnswerVariation = childBooleanAnswer.getVariation("1");

            var addedBooleanQuestion:Question = answer.addVariation(childAnswerVariation);
            addedBooleanQuestion.setView(questionView);
            addedBooleanQuestion.setIndex(child.index);
            
            if(typeof childAnswerVariationValue === "undefined"){
                addedBooleanQuestion.getAnswer().setValue("No");
            }
            else{
                addedBooleanQuestion.getAnswer().setValue(childAnswerVariationValue);
            }
            
            var addedBooleanQuestionNegativeVariation:AnswerVariation = addedBooleanQuestion.getAnswer().getVariation("0");
            var negativeChildrenVariationQuestionsIterator:MapIterator = childNegativeVariation.getIterator();

            while(negativeChildrenVariationQuestionsIterator.hasNext()){
                var negativeChildVariationQuestion:Question = negativeChildrenVariationQuestionsIterator.next();
                negativeChildVariationQuestion.setView(questionView);
                addedBooleanQuestionNegativeVariation.addQuestion(negativeChildVariationQuestion);
            }

            var addedBooleanQuestionPositiveVariation:AnswerVariation = addedBooleanQuestion.getAnswer().getVariation("1");
            var positiveChildrenVariationQuestionsIterator:MapIterator = childPositiveVariation.getIterator();

            while(positiveChildrenVariationQuestionsIterator.hasNext()){
                var positiveChildrenVariationQuestion:Question = positiveChildrenVariationQuestionsIterator.next();
                positiveChildrenVariationQuestion.setView(questionView);
                addedBooleanQuestionPositiveVariation.addQuestion(positiveChildrenVariationQuestion);
            }
        }
        
        return answer;
    }
}
