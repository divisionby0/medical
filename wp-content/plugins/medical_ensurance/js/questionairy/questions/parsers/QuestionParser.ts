///<reference path="../question/Question.ts"/>
///<reference path="AnswerParser.ts"/>
///<reference path="AnswerParserFactory.ts"/>
///<reference path="../question/view/QuestionViewFactory.ts"/>
class QuestionParser{
    public static parse(questionData:any, questionViewType:string):Question{
        var questionText:string = questionData.text;
        var showTextAtResult:boolean = questionData.showTextAtResult;

        var newQuestion:Question = new Question(questionText);
        
        newQuestion.setTextShowAtResult(showTextAtResult);
        newQuestion.setView(QuestionViewFactory.getView(questionViewType));
        var type:string = questionData.answer.type;
        
        var answerParser:IAnswerParser = AnswerParserFactory.create(type);
        
        var answer:Answer = answerParser.parse(questionData.answer, questionViewType);
        newQuestion.createAnswer(answer);
        
        if(typeof answer.getValue() === "undefined"){
            answer.setValue("No");
        }

        if(type == ObjectType.TEXT_INPUT_ANSWER || type == ObjectType.DATE_SELECTION_ANSWER ){
            var placeholder:string = questionData.placeholder;
            if(placeholder){
                newQuestion.setPlaceholder(placeholder);
            }
        }

        return newQuestion;
    }
}
