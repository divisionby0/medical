///<reference path="../answer/dateSelectionAnswer/DateSelectionAnswer.ts"/>
///<reference path="../answer/Answer.ts"/>
///<reference path="TextInputAnswerParser.ts"/>
class DateSelectionAnswerParser extends TextInputAnswerParser{


    protected parseSubQuestions(collection:any):Question[]{
        return [];
    }

    protected getDefaultValue():string{
        return "";
    }

    protected createAnswer():Answer{
        return new DateSelectionAnswer();
    }
}
