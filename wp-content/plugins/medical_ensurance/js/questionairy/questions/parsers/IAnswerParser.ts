///<reference path="../answer/Answer.ts"/>
interface IAnswerParser{
    parse(answerData:any, questionViewType:string):Answer;
}
