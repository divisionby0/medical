///<reference path="AnswerParser.ts"/>
///<reference path="../answer/Answer.ts"/>
///<reference path="../answer/textAnswer/TextInputAnswer.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="../question/Question.ts"/>
class TextInputAnswerParser extends AnswerParser{

    protected answer:Answer;

    parse(answerData:any, questionViewType:string):Answer {
        this.questionViewType = questionViewType;

        this.answer = this.createAnswer();
        var answerText:string = answerData.value;

        if(typeof answerText === "undefined"){
            this.answer.setValue(this.getDefaultValue());
        }
        else{
            this.answer.setValue(answerText);
        }
        
        var subQuestions:Question[] = this.parseSubQuestions(answerData.children.collection);

        for(var i:number = 0; i<subQuestions.length; i++){
            var subQuestion:Question = subQuestions[i];
            if(subQuestion){
                (this.answer as TextInputAnswer).addQuestion(subQuestion);
            }
        }

        return this.answer;
    }

    protected getDefaultValue():string{
        return "empty";
    } 
    
    
    protected parseSubQuestions(collection:any):Question[]{
        var subQuestions:Question[] = new Array();

        var totalSubQuestions:number = collection.keys.length;

        for(var i:number=0; i<totalSubQuestions; i++){
            var key:string = collection.keys[i];
            var subQuestionData:any = collection.items[key];

            if(subQuestionData){
                var subQuestion:Question = QuestionParser.parse(subQuestionData, this.questionViewType);

                if(subQuestion){
                    var index:number = subQuestionData.index;
                    (this.answer as TextInputAnswer).addQuestion(subQuestion);
                    subQuestion.setIndex(index);
                }
            }
        }
        
        return subQuestions;
    }
    
    protected createAnswer():Answer{
        return new TextInputAnswer();
    }
}
