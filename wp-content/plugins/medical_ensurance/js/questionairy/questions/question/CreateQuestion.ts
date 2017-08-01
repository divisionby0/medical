///<reference path="Question.ts"/>
///<reference path="../answer/AnswerFactory.ts"/>
class CreateQuestion{

    create(data:any):Question{
        var text:string = data.text;
        var type:string = data.type;
        var showTextAtResult:boolean = data.showTextAtResult;

        var question:Question = new Question(text);
        question.setTextShowAtResult(showTextAtResult);

        var answer:Answer = AnswerFactory.create(type);
        question.createAnswer(answer);
        
        if(type == ObjectType.TEXT_INPUT_ANSWER || type == ObjectType.DATE_SELECTION_ANSWER){
            this.updateQuestion(data, question, (answer as TextInputAnswer));
        }
        return question;
    }

    private updateQuestion(data:any, question:Question, answer:TextInputAnswer):void{
        answer.setValue("");
        var placeholderText:string = data.placeholderText;
        question.setPlaceholder(placeholderText);
    }
}
